import { client } from '../lib/sanity';

export const revalidate = 10;

interface HeroSection {
  _type: 'heroSection';
  text?: string;
  imageUrl?: string;
}

interface FaqSection {
  _type: 'faqSection';
  questions?: {
    question: string;
    answer: string;
  }[];
}

type Section = HeroSection | FaqSection;

interface AboutData {
  title: string;
  sections: Section[];
}

async function getAboutData(): Promise<AboutData | null> {
  const query = `*[_type == "aboutPage"][0]{
    title,
    sections[]{
      _type,
      text,
      "imageUrl": image.asset->url,
      questions[]{
        question,
        answer
      }
    }
  }`;
  
  return await client.fetch(query);
}

export default async function AboutPage() {
  const data = await getAboutData();

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-500 animate-pulse font-medium">Stránka sa pripravuje...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header podla tvojho designu */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {data.title}
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
        </header>

        <div className="space-y-20">
          {data.sections?.map((section, index) => {
            
            // HERO SEKČIA
            if (section._type === 'heroSection') {
              return (
                <section key={index} className="flex flex-col md:flex-row gap-12 items-center bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex-1 text-lg text-slate-600 leading-relaxed italic">
                    {section.text}
                  </div>
                  {section.imageUrl && (
                    <div className="w-full md:w-1/2 relative">
                      <img 
                        src={section.imageUrl} 
                        className="rounded-3xl shadow-2xl object-cover aspect-video md:aspect-square w-full" 
                        alt="O nás" 
                      />
                      <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-blue-50 rounded-full -z-10" />
                    </div>
                  )}
                </section>
              );
            }

            // FAQ SEKČIA
            if (section._type === 'faqSection') {
              return (
                <section key={index} className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Často kladené otázky</h2>
                    <div className="h-px bg-slate-200 flex-grow" />
                  </div>
                  
                  <div className="grid gap-4">
                    {section.questions?.map((item, i) => (
                      <div 
                        key={i} 
                        className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                      >
                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors flex items-start gap-3">
                          <span className="text-blue-500 font-black">?</span>
                          {item.question}
                        </h3>
                        <p className="mt-4 text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-50 group-hover:border-blue-100 transition-colors">
                          {item.answer}
                        </p>
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