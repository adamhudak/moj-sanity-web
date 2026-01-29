import Footer from "../../components/FooterBlok"; 
import Navigation from "../../components/Navigation"; 
import { client } from "../../lib/sanity"; 
import { groq } from "next-sanity";

export default async function WebsiteLayout({
  children,
  params, // Pridávame params sem
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Definujeme typ pre locale
}) {
  // Získame aktuálny jazyk (sk alebo en)
  const { locale } = await params;

  // Stiahneme settings a menu filtrované podľa jazyka
  // POZNÁMKA: Predpokladám, že menuItems v Sanity odkazujú na preložené podstránky
  const settings = await client.fetch(
    groq`*[_type == "settings"][0]{
      ...,
      "menuItems": menuItems[]{ 
        label, 
        "slug": link->slug.current 
      },
      "footerMenuItems": footerMenuItems[]{ 
        label, 
        "slug": link->slug.current 
      },
      "logoDark": logos.logoDark.asset->url
    }`,
    {},
    { next: { revalidate: 0 } }
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation potrebuje vedieť locale, aby správne fungovali linky a prepínač */}
      <Navigation menuItems={settings?.menuItems || []} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer settings={settings} />
    </div>
  );
}