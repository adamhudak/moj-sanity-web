export default {
  name: 'systemPage',
  type: 'document',
  title: 'Podstránky',
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      title: 'Názov stránky (napr. GDPR)' 
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL adresa',
      options: {
        source: 'title', 
        maxLength: 96,
      },
    },
   {
      name: 'content',
      type: 'array',
      title: 'Obsah stránky',
      of: [{ type: 'block' }] 
    },

    // --- SEO SEKCIA ---
    {
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Nadpis',
      description: 'Zobrazuje sa v záložke prehliadača a vo vyhľadávačoch (ideálne do 60 znakov).',
    },
    {
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Popis',
      description: 'Krátky popis stránky pre Google (ideálne 150-160 znakov).',
    },
    {
      name: 'seoImage',
      type: 'image',
      title: 'SEO Obrázok',
      description: 'Obrázok, ktorý sa zobrazí pri zdieľaní na sociálnych sieťach.',
    }
  ]
}