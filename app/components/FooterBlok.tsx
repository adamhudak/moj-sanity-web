
// components/Footer.tsx
import { getSettings } from '../lib/queries'

export default async function Footer() {
  
  const settings = await getSettings()

  // Ak ešte nemáš v Sanity nič vyplnené, vráti sa prázdny footer, aby web nespadol
  if (!settings) return <footer className="p-8 text-center text-slate-400">Nastavte údaje v Sanity Studiu...</footer>

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-6 px-6">
      <div className="map-container w-full overflow-hidden rounded-xl">
        <div className="w-full h-full mb-10"
            dangerouslySetInnerHTML={{ __html: settings.contactDetails?.mapEmbed || "" }} 
          />
          
        </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Identita */}
        <div>
          {settings.logoDark && (
            <img src={settings.logoDark} alt={settings.siteTitle} className="h-8 mb-4" />
          )}
          <h3 className="font-bold text-slate-900">{settings.siteTitle}</h3>
        </div>

        {/* Kontakt */}
        <div className="text-sm text-slate-600">
          <h4 className="font-bold text-slate-900 mb-3">Kontakt </h4>
          <p className="whitespace-pre-line">{settings.contactDetails?.address}</p>
          <p className="mt-2">{settings.contactDetails?.phone}</p>
          <p>{settings.contactDetails?.email}</p>
        </div>
        

        {/* Firma */}
        <div className="text-sm text-slate-600">
          <h4 className="font-bold text-slate-900 mb-3">Firma</h4>
          <p>IČO: {settings.billingDetails?.ic}</p>
          <p>DIČ: {settings.billingDetails?.dic}</p>
          <p>DIČ: {settings.billingDetails?.vat}</p>
        </div>

        {/* Sociálne siete */}
        <div className="text-sm">
          <h4 className="font-bold text-slate-900 mb-3">Sledujte nás</h4>
          <div className="flex gap-3">
             {settings.socialLinks?.fb && <a target="_blank" href={settings.socialLinks.fb} className="text-blue-600">FB</a>}
             {settings.socialLinks?.ig && <a target="_blank" href={settings.socialLinks.ig} className="text-pink-600">IG</a>}
          </div>
        </div>

      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-100 text-center text-slate-400 text-xs">
        © {new Date().getFullYear()} {settings.siteTitle}
      </div>
    </footer>
  )
}