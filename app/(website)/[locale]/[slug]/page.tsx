import { client } from '../../../lib/sanity';
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import ContactForm from "../../../components/ContactForm";
import { Metadata } from 'next';
import FaqSection from "../../../components/FaqSection";

export const dynamic = 'force-dynamic';

// --- TYPY ---
interface ContactSection {
  _type: 'contactSection';
  title?: string;
  description?: string;
  layout?: 'standard' | 'withMap';
}

interface HeroSection {
  _type: 'heroSection';
  text?: string;
  imageUrl?: string;
}

interface FaqSectionType {
  _type: 'faqSection';
  questions?: { question: string; answer: string }[];
}

type Section = HeroSection | FaqSectionType | ContactSection;

interface PageData {
  _type: 'singlePage' | 'systemPage';
  title: string;
  content?: PortableTextBlock[];
  sections?: Section[];
  seoTitle?: string;
  seoDescription?: string;
  seoImageUrl?: string;
  language: string;
}

// --- 1. SEO METADÁTA ---
export async function generateMetadata(props: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await props.params;

  const query = `{
    "page": *[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug && language == $locale][0] {
      title,
      seoTitle,
      seoDescription,
      "seoImageUrl": seoImage.asset->url
    },
    "settings": *[_type == "settings"][0] {
      siteTitle,
      titleFormat,
      defaultSeoDescription,
      "defaultOgImageUrl": defaultOgImage.asset->url
    }
  }`;

  const { page, settings } = await client.fetch(query, { slug, locale });

  if (!page) return {};

  const pageTitle = page.seoTitle || page.title;
  const finalTitle = settings?.titleFormat 
    ? settings.titleFormat.replace('%title%', pageTitle) 
    : `${pageTitle} | ${settings?.siteTitle || 'Web'}`;

  return {
    title: finalTitle,
    description: page.seoDescription || settings?.defaultSeoDescription,
    openGraph: {
      title: finalTitle,
      description: page.seoDescription || settings?.defaultSeoDescription,
      images: (page.seoImageUrl || settings?.defaultOgImageUrl) 
        ? [{ url: page.seoImageUrl || settings.defaultOgImageUrl }] 
        : [],
    },
  };
}

// --- 2. HLAVNÁ KOMPONENTA STRÁNKY ---
export default async function DynamicPage(props: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await props.params;

  const query = `*[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug && language == $locale][0] {
    _type,
    title,
    content,
    language,
    sections[] {
      _type,
      text,
      "imageUrl": image.asset->url,
      questions[] { question, answer },
      title,
      description,
      layout 
    },
  }`;

  const data: PageData | null = await client.fetch(query, { slug, locale });

  if (!data) notFound();

  // ŠABLÓNA 1: TEXTOVÁ (GDPR, atď.)
  if (data._type === 'systemPage') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-10">{data.title}</h1>
          <PortableText value={data.content || []} />
        </div>
      </div>
    );
  }

  // ŠABLÓNA 2: FLEXIBILNÁ (Landing Pages)
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col gap-24 py-12">
        {data.sections?.map((section, index) => {
          
          // --- HERO SEKČIA ---
          if (section._type === 'heroSection') {
            return (
              <section key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-2xl text-slate-700 leading-relaxed italic border-l-4 border-blue-500 pl-8">
                  {section.text}
                </div>
                {section.imageUrl && (
                  <img 
                    src={section.imageUrl} 
                    className="rounded-3xl shadow-xl object-cover aspect-square" 
                    alt={data.title} 
                  />
                )}
              </section>
            );
          }

          // --- FAQ SEKČIA ---
          if (section._type === 'faqSection') {
            return <FaqSection key={index} questions={section.questions} />;
          }

          // --- KONTAKTNÁ SEKČIA ---
          if (section._type === 'contactSection') {
            const isWithMap = section.layout === 'withMap';
            
            // Jednoduchá lokalizácia statického textu
            const defaultContactTitle = locale === 'sk' ? 'Napíšte nám' : 'Contact us';

            return (
              <section key={index} className={`w-full ${isWithMap ? 'max-w-7xl' : 'max-w-3xl'} mx-auto`}>
                <div className={`grid gap-12 items-stretch ${isWithMap ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  
                  {isWithMap && (
                    <div className="min-h-[400px] bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=..." // Sem vlož skutočný embed link
                        className="w-full h-full border-0 grayscale contrast-125"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}

                  <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="mb-10 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        {section.title || defaultContactTitle}
                      </h2>
                      {section.description && <p className="text-slate-600">{section.description}</p>}
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}