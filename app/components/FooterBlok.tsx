"use client";

import Link from 'next/link';

interface FooterProps {
  settings: any; // Pre lepšiu bezpečnosť môžeš neskôr definovať presný interface
}

export default function Footer({ settings }: FooterProps) {
  // Ak settings ešte neprišli, zobrazíme fallback
  if (!settings) {
    return (
      <footer className="p-8 text-center text-slate-400">
        Načítavam údaje...
      </footer>
    );
  }

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-6 px-6">
      
      {/* Google Mapa - zobrazí sa len ak je vyplnený embed kód */}
      {settings.contactDetails?.mapEmbed && (
        <div className="max-w-7xl mx-auto map-container w-full overflow-hidden rounded-xl mb-10 shadow-sm">
          <div 
            className="w-full h-[350px] [&>iframe]:w-full [&>iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: settings.contactDetails.mapEmbed }} 
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        
        {/* 1. Identita */}
        <div className="flex flex-col gap-3">
          {settings.logoDark ? (
            <img src={settings.logoDark} alt={settings.siteTitle} className="h-8 w-fit object-contain" />
          ) : (
            <span className="font-bold text-xl tracking-tighter">{settings.siteTitle}</span>
          )}
          <p className="text-xs text-slate-500 leading-relaxed">
            Vaša spoľahlivá voľba pre kvalitné služby.
          </p>
        </div>

        {/* 2. Footer Menu (Rýchle odkazy) */}
        <div>
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Navigácia</h4>
          <ul className="flex flex-col gap-2">
            {settings.footerMenuItems?.map((item: any, index: number) => (
              <li key={index}>
                <Link 
                  href={`/${item.slug || ''}`} 
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Kontakt */}
        <div className="text-sm text-slate-600">
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Kontakt</h4>
          <address className="not-italic space-y-2">
            <p className="whitespace-pre-line">{settings.contactDetails?.address}</p>
            <p className="font-medium text-slate-900">{settings.contactDetails?.phone}</p>
            <p className="text-blue-600 underline underline-offset-4">{settings.contactDetails?.email}</p>
          </address>
        </div>

        {/* 4. Firemné údaje */}
        <div className="text-sm text-slate-600">
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Fakturačné údaje</h4>
          <div className="space-y-1">
            <p><span className="text-slate-400">IČO:</span> {settings.billingDetails?.ic}</p>
            <p><span className="text-slate-400">DIČ:</span> {settings.billingDetails?.dic}</p>
            {settings.billingDetails?.vat && (
              <p><span className="text-slate-400">IČ DPH:</span> {settings.billingDetails.vat}</p>
            )}
          </div>
        </div>

        {/* 5. Sociálne siete */}
        <div className="text-sm">
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Sledujte nás</h4>
          <div className="flex flex-col gap-3">
             {settings.socialLinks?.fb && (
               <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href={settings.socialLinks.fb} 
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all"
               >
                 Facebook
               </a>
             )}
             {settings.socialLinks?.ig && (
               <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href={settings.socialLinks.ig} 
                className="flex items-center gap-2 text-slate-600 hover:text-pink-600 transition-all"
               >
                 Instagram
               </a>
             )}
          </div>
        </div>

      </div>
      
      {/* Copyright riadok */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] uppercase tracking-widest">
        <span>© {new Date().getFullYear()} {settings.siteTitle}</span>
        <span>Vytvorené s láskou a Sanity CMS</span>
      </div>
    </footer>
  );
}