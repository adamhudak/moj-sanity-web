import { client } from '../../lib/sanity';
import Link from 'next/link';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    price,
    "categoryName": category->title,
    "imageUrl": image.asset->url
  }`, { slug });

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800">Obsah sa nenašiel</h1>
        <Link href="/" className="text-blue-600 hover:underline mt-4 block">Späť na domov</Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigácia späť */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Späť do ponuky
        </Link>

        <article className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {/* Veľký Hero Obrázok */}
          {post.imageUrl && (
            <div className="relative w-full h-[200px]">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Kategória a Cena Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl">
                {post.categoryName || 'Všeobecné'}
              </span>
              <div className="flex items-center bg-slate-50 px-5 py-2 rounded-2xl border border-slate-100">
                <span className="text-slate-500 text-sm mr-2">Cena za kurz:</span>
                <span className="text-2xl font-black text-slate-900">{post.price} €</span>
              </div>
            </div>

            {/* Nadpis */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Popis / Obsah */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-blue-600 pl-6 mb-8">
                {post.description}
              </p>
              
              {/* Tu môžeš neskôr pridať PortableText pre bohatý obsah */}
              <div className="text-slate-700 space-y-4">
                <p>
                  Tento kurz vám poskytne všetky potrebné vedomosti a praktické zručnosti v oblasti {post.categoryName?.toLowerCase()}. 
                  Pripravte sa na intenzívny zážitok, ktorý posunie vaše hranice.
                </p>
              </div>
            </div>

            {/* Call to Action tlačidlo */}
            <button className="w-full mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
              Mám záujem o tento kurz
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}