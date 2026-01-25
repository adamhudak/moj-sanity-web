export const postType = {
  name: 'post',
  title: 'Príspevky',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Nadpis' },
    { 
      name: 'slug', 
      type: 'slug', 
      title: 'URL Adresa (Slug)',
      options: { source: 'title', maxLength: 96 } 
    },
    { 
      name: 'category', 
      type: 'reference', 
      title: 'Kategória', 
      to: [{ type: 'category' }] // Toto vytvorí reláciu
    },
    { name: 'description', type: 'text', title: 'Popis' },
    { name: 'price', type: 'number', title: 'Cena' },
    { name: 'image', type: 'image', title: 'Obrázok', options: { hotspot: true } },
  ],
}