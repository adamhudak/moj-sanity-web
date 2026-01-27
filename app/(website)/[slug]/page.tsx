import { client } from '../../lib/sanity';
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
export const dynamic = 'force-dynamic';

// --- TYPY PRE TVOJE BLOKY (Flexible Content) ---
interface HeroSection {
  _type: 'heroSection';
  text?: string;
  imageUrl?: string;
}

interface FaqSection {
  _type: 'faqSection';
  questions?: { question: string; answer: string }[];
}

// Sem neskôr len pripíšeš: | GallerySection | ContactSection
type Section = HeroSection | FaqSection;

interface PageData {
  _type: 'singlePage' | 'systemPage';
  title: string;
  content?: PortableTextBlock[]; // Pre textovú šablónu
  sections?: Section[];         // Pre flexibilnú šablónu
}

export default async function DynamicPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  // Query, ktorá vytiahne dáta pre oba druhy šablón
  const query = `*[(_type == "singlePage" || _type == "systemPage") && slug.current == $slug][0] {
    _type,
    title,
    content,
    sections[] {
      _type,
      text,
      "imageUrl": image.asset->url,
      questions[] { question, answer }
    }
  }`;

  const data: PageData | null = await client.fetch(query, { slug });

  if (!data) notFound();

  // --- ŠABLÓNA 1: TEXTOVÁ (VOP, GDPR) ---
  if (data._type === 'systemPage') {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20">
        <article className="prose prose-lg prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-10">{data.title}</h1>
          <PortableText value={data.content as PortableTextBlock[] || []} />
        </article>
      </main>
    );
  }

  // --- ŠABLÓNA 2: FLEXIBILNÁ (Flexible Content / Builder) ---
  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black mb-20 text-center">{data.title}</h1>
        
        <div className="flex flex-col gap-24">
          {data.sections?.map((section, index) => {
            
            // BLOK: Hero
            if (section._type === 'heroSection') {
              return (
                <section key={index} className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-2xl text-slate-700 leading-relaxed italic border-l-4 border-blue-500 pl-8">
                    {section.text}
                  </div>
                  {section.imageUrl && (
                    <img src={section.imageUrl} className="rounded-3xl shadow-xl" alt="" />
                  )}
                </section>
              );
            }

            // BLOK: FAQ (Akordeón)
            if (section._type === 'faqSection') {
              return (
                <section key={index} className="max-w-3xl mx-auto w-full">
                  <h2 className="text-3xl font-bold mb-8">Časté otázky</h2>
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

            return null;
          })}
        </div>
      </div>
    </main>
  );
}