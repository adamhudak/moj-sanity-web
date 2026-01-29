export default {
  name: 'singlePage',
  type: 'document',
  title: 'Stránky',
  // 1. Definujeme skupiny pre lepšiu prehľadnosť
  groups: [
    { name: 'content', title: 'Obsah stránky' },
    { name: 'seo', title: 'SEO nastavenia' },
  ],
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      title: 'Nadpis stránky',
      group: 'content' // Priradíme do skupiny Obsah
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL adresa',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content'
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Sekcie stránky',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'heroSection',
          title: 'Úvodná sekcia (Obrázok + Text)',
          fields: [
            { name: 'image', type: 'image', title: 'Obrázok' },
            { name: 'text', type: 'text', title: 'Text' }
          ]
        },
        {
          type: 'object',
          name: 'faqSection',
          title: 'Akordeón (FAQ)',
          fields: [
            {
              name: 'questions',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'question', type: 'string', title: 'Otázka' },
                  { name: 'answer', type: 'text', title: 'Odpoveď' }
                ]
              }]
            }
          ]
        },
        {
          type: 'object',
          name: 'contactSection',
          title: 'Kontaktný formulár',
          fields: [

             {
              name: 'layout',
              title: 'Typ rozloženia (Šablóna)',
              type: 'string',
              initialValue: 'standard',
              options: {
                list: [
                  { title: 'L1: Formulár na stred', value: 'standard' },
                  { title: 'L2: Mapa vľavo + Formulár vpravo', value: 'withMap' },
                ],
                layout: 'radio', 
              },
              
            },
            { 
              name: 'title', 
              type: 'string', 
              title: 'Nadpis sekcie', 
              initialValue: 'Napíšte nám' 
            },
            { 
              name: 'description', 
              type: 'text', 
              title: 'Krátky text nad formulárom' 
            },
           

          ],
        },
      ]
    },

    
    // --- SEO POLIA ---
    {
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Nadpis (Meta Title)',
      description: 'Zobrazuje sa v záložke prehliadača (ideálne do 60 znakov).',
      group: 'seo' // Priradíme do skupiny SEO
    },
    {
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Popis (Meta Description)',
      description: 'Krátky popis pre Google (ideálne 150-160 znakov).',
      group: 'seo'
    },
    {
      name: 'seoImage',
      type: 'image',
      title: 'SEO Obrázok',
      description: 'Obrázok, ktorý sa zobrazí pri zdieľaní na Facebooku/Instagrame.',
      group: 'seo'
    }
  ]
}