import Footer from "../components/FooterBlok"; 
import Navigation from "../components/Navigation"; 
import { client } from "../lib/sanity"; 

import { groq } from "next-sanity";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Stiahneme menu položky priamo tu na serveri
  const settings = await client.fetch(
    groq`*[_type == "settings"][0]{
    ...,
    menuItems[]{ label, "slug": link->slug.current },
    footerMenuItems[]{ label, "slug": link->slug.current },
    "logoDark": logos.logoDark.asset->url // Vytiahne URL adresu loga
  }`,
  {},
    { next: { revalidate: 0 } } // Refresh každú minútu
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dáta pošleme do Navigation ako prop */}
      <Navigation menuItems={settings?.menuItems || []} />
      
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer settings={settings} />
    </div>
  );
}