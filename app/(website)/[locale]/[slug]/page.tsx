import { client } from '../../../lib/sanity';
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import ContactForm from "../../../components/ContactForm";
import { Metadata } from 'next';
import FaqSection from "../../../components/FaqSection";

export const dynamic = 'force-dynamic';

// --- TYPY (nechávam tvoje, sú super) ---
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

// --- 1. SEO METADÁTA (OPRAVENÉ PRE MULTI-LANG) ---
export async function generateMetadata(props: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await props.params;

  const query = `{
    "page": *[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug && language == $locale][0] {
      title,
      seoTitle,
      seoDescription,
      "seoImageUrl": seoImage.asset->url
    },
    // Pridaný filter && language == $locale, aby aj SEO názov webu bol v správnom jazyku
    "settings": *[_type == "settings" && language == $locale][0] {
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

// --- 2. HLAVNÁ KOMPONENTA ---
export default async function DynamicPage(props: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await props.params;

  // Query s posilneným načítaním globálnych nastavení pre mapu
  const query = `{
    "page": *[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug && language == $locale][0] {
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
    },
    "translations": *[_type == "translation.metadata" && references(*[slug.current == $slug]._id)][0].translations[]{
      "slug": value->slug.current,
      "locale": value->language
    },
    "settings": *[_type == "settings" && language == $locale][0] {
      contactDetails { mapEmbed }
    }
  }`;

  const { page, settings } = await client.fetch(query, { slug, locale });

  if (!page) notFound();

  // ŠABLÓNA 1: SYSTÉMOVÁ (GDPR, podmienky...)
  if (page._type === 'systemPage') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-10">{page.title}</h1>
          <PortableText value={page.content || []} />
        </div>
      </div>
    );
  }

  // ŠABLÓNA 2: LANDING PAGE
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col gap-24 py-12">
        {page.sections?.map((section: any, index: number) => (
          <div key={index}>
            {/* HERO SECTION */}
            {section._type === 'heroSection' && (
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-2xl text-slate-700 leading-relaxed italic border-l-4 border-blue-500 pl-8">
                  {section.text}
                </div>
                {section.imageUrl && (
                  <img src={section.imageUrl} className="rounded-3xl shadow-xl object-cover aspect-square" alt={page.title} />
                )}
              </section>
            )}

            {/* FAQ SECTION */}
            {section._type === 'faqSection' && <FaqSection questions={section.questions} />}

            {/* CONTACT SECTION */}
            {section._type === 'contactSection' && (
              <section className={`w-full ${section.layout === 'withMap' ? 'max-w-7xl' : 'max-w-3xl'} mx-auto`}>
                <div className={`grid gap-12 items-stretch ${section.layout === 'withMap' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {section.layout === 'withMap' && settings?.contactDetails?.mapEmbed && (
                    <div className="min-h-[400px] bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200">
                      <div 
                        className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" 
                        dangerouslySetInnerHTML={{ __html: settings.contactDetails.mapEmbed }} 
                      />
                    </div>
                  )}
                  <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">
                        {section.title || (locale === 'sk' ? 'Napíšte nám' : 'Contact us')}
                      </h2>
                      {section.description && <p className="text-slate-600">{section.description}</p>}
                    </div>
                    <ContactForm />
                  </div>
                </div>
              </section>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}