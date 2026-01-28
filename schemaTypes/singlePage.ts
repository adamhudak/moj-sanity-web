export default {
  name: 'singlePage',
  type: 'document',
  title: 'Stránky',
  fields: [
    { name: 'title', type: 'string', title: 'Nadpis stránky' },
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
      name: 'sections',
      type: 'array',
      title: 'Sekcie stránky',
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
              name: 'title', 
              type: 'string', 
              title: 'Nadpis sekcie', 
              initialValue: 'Napíšte nám' 
            },
            { 
              name: 'description', 
              type: 'text', 
              title: 'Krátky text nad formulárom' 
            }
          ],
          
        },
      ]
    }
  ]
}