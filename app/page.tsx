import Link from 'next/link';
import { client } from './lib/sanity';
export const revalidate = 10; // Stránka sa skontroluje každých 10 sekúnd

interface Post {
  title: string;
  price: number;
  slug: string;
  categoryName: string;
  imageUrl: string;
}

export default async function Home() {
  const posts: Post[] = await client.fetch(`*[_type == "post"]{
    title,
    price,
    "slug": slug.current,
    "categoryName": category->title,
    "imageUrl": mainImage.asset->url
  }`);

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header sekcia */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Prémiová Ponuka
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Objavte naše najnovšie príspevky a produkty spravované priamo cez Sanity CMS.
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-6 rounded-full" />
        </header>

        {/* Mriežka s kartami */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/post/${post.slug}`} 
              key={post.slug || post.title} 
              className="group flex"
            >
              <article className="flex flex-col w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Obal obrázka */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">Bez obrázka</div>
                  )}
                  {/* Badge s kategóriou na obrázku */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                      {post.categoryName || 'Všeobecné'}
                    </span>
                  </div>
                </div>

                {/* Obsah pod obrázkom */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-xs uppercase font-medium tracking-tight">Cena</span>
                      <span className="text-2xl font-black text-slate-900">{post.price} <small className="text-sm font-semibold">€</small></span>
                    </div>
                    
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}