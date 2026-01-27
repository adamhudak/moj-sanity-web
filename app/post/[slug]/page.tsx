import { client } from '../../lib/sanity';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import GallerySection from "../../components/GallerySection";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // V query si vytiahneme obe URL adresy
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    "seoTitle": seo.metaTitle,
    "seoDesc": seo.metaDescription,
    "seoImage": seo.shareImage.asset->url,
    "mainImage": mainImage.asset->url
  }`, { slug });

  if (!post) return { title: 'Príspevok nenájdený' };

  // Logika prioritizácie
  const finalSeoImage = post.seoImage || post.mainImage;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.description || 'Detail príspevku',
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.description,
      images: finalSeoImage ? [{ url: finalSeoImage }] : [],
    },
  };
}

// --- HLAVNÁ STRÁNKA DETAILU ---
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    price,
    rating,
    isFeatured,
    publishedAt,
    duration,
    status,
    tags,
    content,
    externalLink,
    authorEmail,
    seo,
    "categoryName": category->title,
    "imageUrl": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "fileUrl": fileUpload.asset->url
  }`, { slug });

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-slate-800">Obsah sa nenašiel</h1>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigácia a Status */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            ← Späť do ponuky
          </Link>
          
          {/* Zobrazenie stavu (Aktuálne / Pripravujeme / Skončilo) */}
            {post.status && (
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                post.status === 'aktuálne' 
                  ? 'border-green-200 text-green-600 bg-green-50' 
                  : post.status === 'pripravujeme'
                  ? 'border-blue-200 text-blue-600 bg-blue-50'
                  : 'border-slate-200 text-slate-400 bg-slate-50' // Pre stav "skončilo"
              }`}>
                {post.status}
              </span>
            )}
        </div>

        <article className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
          
          {/* HLAVNÝ OBRÁZOK */}
          <div className="relative w-full h-[200px]">
            {post.imageUrl ? (
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Bez obrázka</div>
            )}
            
            {post.isFeatured && (
              <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                ★ Novinka
              </div>
            )}
          </div>

          <div className="p-6 md:p-10">
            {/* META INFO */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl w-fit">
                    {post.categoryName || 'Všeobecné'}
                  </span>
                  {post.rating && (
                    <span className="text-yellow-500 font-bold text-sm flex items-center">
                       ★★★★★ {post.rating}
                    </span>
                  )}
                </div>
                {post.duration && (
                  <span className="text-slate-500 text-xs font-medium">
                    📅 Termín: {new Date(post.duration).toLocaleDateString('sk-SK')}
                  </span>
                )}
              </div>
              <div className="text-3xl font-black text-slate-900">{post.price} €</div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-slate-500 italic border-l-4 border-blue-600 pl-6 mb-10 leading-relaxed">
              {post.description}
            </p>

            <div className="prose prose-slate max-w-none text-slate-700 mb-10">
              {post.content ? (
                <PortableText value={post.content} />
              ) : (
                <p className="text-slate-400">Podrobný popis pripravujeme...</p>
              )}
            </div>

            {/* INTERAKTÍVNA GALÉRIA S LIGHTBOXOM */}
            {post.gallery && post.gallery.length > 0 && (
              <GallerySection images={post.gallery} />
            )}

            {/* ODKAZY A SÚBORY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-slate-100 mb-8">
              {post.fileUrl && (
                <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    ↓
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Materiály</div>
                    <div className="text-xs text-slate-500">Stiahnuť PDF/Súbor</div>
                  </div>
                </a>
              )}

              {post.externalLink && (
                <a href={post.externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    ↗
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Externý link</div>
                    <div className="text-xs text-slate-500">Viac informácií</div>
                  </div>
                </a>
              )}
            </div>

            {/* TAGY A KONTAKT */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <div className="flex gap-2">
                {post.tags?.map((tag: string) => (
                  <span key={tag} className="text-[11px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-md uppercase tracking-wide">
                    #{tag}
                  </span>
                ))}
              </div>
              {post.authorEmail && (
                  <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {post.authorEmail[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-600">
                      Lektor: <a href={`mailto:${post.authorEmail}`} className="font-bold hover:text-blue-600">{post.authorEmail}</a>
                    </span>
                  </div>
                )}
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-blue-100">
              Prihlásiť sa na {post.categoryName || 'kurz'}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}