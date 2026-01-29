import Footer from "../../components/FooterBlok"; 
import Navigation from "../../components/Navigation"; 
import { client } from "../../lib/sanity"; 
import { groq } from "next-sanity";

// app/(website)/[locale]/layout.tsx

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const settings = await client.fetch(
    groq`*[_type == "settings" && language == $locale][0]{
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
    { locale }, // TOTO MUSÍ BYŤ DRUHÝ ARGUMENT (odstráň tie prázdne {})
    { next: { revalidate: 0 } }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation menuItems={settings?.menuItems || []} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}