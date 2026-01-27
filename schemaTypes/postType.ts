import { Rule } from 'sanity';
export const postType = {
  name: 'post',
  title: 'Kurzy',
  type: 'document',
  fieldsets: [
    {
      name: 'seoSection',
      title: 'SEO & Marketingové nastavenia',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    // --- IDENTIFIKÁCIA A TEXTY ---
    { name: 'title', type: 'string', title: 'Nadpis' },
    { 
      name: 'slug', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 } 
    },
    { name: 'description', type: 'text', title: 'Stručný výťah (Perex)', rows: 3 },
    
    // --- ČÍSLA A HODNOTENIA ---
    { name: 'price', type: 'number', title: 'Cena' },
    {
      name: 'rating',
      type: 'number',
      title: 'Hodnotenie',
      
    },
    { name: 'isFeatured', type: 'boolean', title: 'Je to novinka', initialValue: false },

    // --- ČASOVÉ ÚDAJE ---
    { name: 'publishedAt', type: 'datetime', title: 'Dátum zverejnenia' },
    { name: 'duration', type: 'date', title: 'Termín konania (Iba dátum)' },

    // --- MÉDIÁ (OBRÁZKY A SÚBORY) ---
    { 
      name: 'mainImage', 
      type: 'image', 
      title: 'Hlavný obrázok', 
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternatívny text' }]
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Galéria obrázkov',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    { name: 'fileUpload', type: 'file', title: 'Príloha (PDF/ZIP)' },

    // --- VZŤAHY ---
    { 
      name: 'category', 
      type: 'reference', 
      to: [{ type: 'category' }] 
    },

    {
      name: 'author',
      title: 'Autor príspevku',
      type: 'reference',
      to: [{ type: 'author' }], 
     // validation: (rule: Rule) => rule.required(), // Voliteľné: autor bude povinný
      
    },

    // --- BOHATÝ OBSAH (Rich Text) ---
    {
      name: 'content',
      type: 'array',
      title: 'Obsah článku',
      of: [
        { type: 'block' }, 
        { type: 'image' },
        { 
          type: 'object',
          name: 'embedVideo',
          title: 'Video URL',
          fields: [{ name: 'url', type: 'url', title: 'YouTube/Vimeo Link' }]
        }
      ]
    },

    

    // --- ORGANIZÁCIA (Tagy a Listy) ---
    {
      name: 'tags',
      type: 'array',
      title: 'Tagy',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'status',
      type: 'string',
      title: 'Stav príspevku',
      options: {
        list: [
          { title: 'Aktuálne (Prihlasovanie spustené)', value: 'aktuálne' },
          { title: 'Pripravujeme (Čoskoro v ponuke)', value: 'pripravujeme' },
          { title: 'Skončilo (Archív)', value: 'skončilo' },
        ]
      },
      initialValue: 'pripravujeme'
    },

    // --- KONTAKT A EXTERNÉ ZDROJE ---
    { name: 'externalLink', type: 'url', title: 'Externá stránka' },
    { name: 'authorEmail', type: 'email', title: 'Email na lektora' },

    // --- POKROČILÉ (SEO & METADATA) ---
    {
      name: 'seo',
      type: 'object',
      title: 'SEO Nastavenia',
      fieldset: 'seoSection', // 2. Priraď to k fieldsetu
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Titulok' },
        { name: 'metaDescription', type: 'text', title: 'Meta Popis', rows: 2 },
        { 
          name: 'shareImage', 
          type: 'image', 
          title: 'SEO Obrázok (OpenGraph)',
          description: 'Ak nevyplníte, použije sa hlavný obrázok článku.',
          options: { hotspot: true }
        },
      ]
    }
  ],
}