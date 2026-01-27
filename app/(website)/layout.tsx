import Footer from "../components/FooterBlok"; 
import Navigation from "../components/Navigation"; 

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}