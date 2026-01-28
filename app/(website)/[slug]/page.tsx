import { client } from '../../lib/sanity';
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import ContactForm from "../../components/ContactForm";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// --- TYPY ---
interface ContactSection {
  _type: 'contactSection';
  title?: string;
  description?: string;
}

interface HeroSection {
  _type: 'heroSection';
  text?: string;
  imageUrl?: string;
}

interface FaqSection {
  _type: 'faqSection';
  questions?: { question: string; answer: string }[];
}

type Section = HeroSection | FaqSection | ContactSection;

interface PageData {
  _type: 'singlePage' | 'systemPage';
  title: string;
  content?: PortableTextBlock[];
  sections?: Section[];
  seoTitle?: string;
  seoDescription?: string;
  seoImageUrl?: string;
}

// --- 1. INTELIGENTNÁ SEO FUNKCIA ---
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;

  // Ťaháme dáta stránky aj globálne nastavenia naraz v jednej query
  const query = `{
    "page": *[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug][0] {
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

  const { page, settings } = await client.fetch(query, { slug });

  if (!page) return {};

  // Logika pre titulok: Ak máš v nastaveniach "%title% | Brand", nahradí to %title%
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

// --- 2. HLAVNÁ STRÁNKA ---
export default async function DynamicPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const query = `*[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug][0] {
    _type,
    title,
    content,
    seoTitle,
    seoDescription,
    "seoImageUrl": seoImage.asset->url,
    sections[] {
      _type,
      text,
      "imageUrl": image.asset->url,
      questions[] { question, answer },
      title,
      description
    }
  }`;

  const data: PageData | null = await client.fetch(query, { slug });

  if (!data) notFound();

  // ŠABLÓNA 1: TEXTOVÁ (GDPR, atď.)
  if (data._type === 'systemPage') {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <article className="prose prose-lg prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-10">{data.title}</h1>
          <PortableText value={data.content || []} />
        </article>
      </main>
    );
  }

  // ŠABLÓNA 2: FLEXIBILNÁ
  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl text-slate-600 mb-10 text-center">{data.title}</h1>
        
        <div className="flex flex-col gap-24">
          {data.sections?.map((section, index) => {
            
            if (section._type === 'heroSection') {
              return (
                <section key={index} className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-2xl text-slate-700 leading-relaxed italic border-l-4 border-blue-500 pl-8">
                    {section.text}
                  </div>
                  {section.imageUrl && (
                    <img src={section.imageUrl} className="rounded-3xl shadow-xl" alt={data.title} />
                  )}
                </section>
              );
            }

            if (section._type === 'faqSection') {
              return (
                <section key={index} className="max-w-3xl mx-auto w-full">
                  <h2 className="text-3xl font-bold mb-8 text-center">Časté otázky</h2>
                  <div className="space-y-4">
                    {section.questions?.map((q, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <h3 className="font-bold text-lg text-blue-600 mb-2">? {q.question}</h3>
                        <p className="text-slate-600">{q.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            if (section._type === 'contactSection') {
              return (
                <section key={index} className="max-w-3xl mx-auto w-full bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-600 mb-4">{section.title || 'Napíšte nám'}</h2>
                    {section.description && <p className="text-slate-600">{section.description}</p>}
                  </div>
                  <ContactForm />
                </section>
              );
            }

            return null;
          })}
        </div>
      </div>
    </main>
  );
}