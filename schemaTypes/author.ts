export const authorType = {
  name: 'author',
  title: 'Autori',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Meno autora' },
    { 
      name: 'image', 
      type: 'image', 
      title: 'Foto', 
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternatívny text' }]
    },
    { name: 'bio', type: 'text', title: 'Krátky životopis', rows: 3 },

    // --- KONTAKTNÉ ÚDAJE ---
    { name: 'phone', type: 'string', title: 'Telefónne číslo' },
    { name: 'email', type: 'email', title: 'Email' },

    // --- SOCIÁLNE SIETE ---
    {
      name: 'socials',
      type: 'array',
      title: 'Sociálne siete',
      description: 'Pridajte odkazy na profily (FB, IG, LinkedIn...)',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            { 
              name: 'platform', 
              type: 'string', 
              title: 'Platforma',
              options: {
                list: ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)', 'Web']
              }
            },
            { name: 'url', type: 'url', title: 'URL adresa profilu' }
          ],
          // Toto pekné zobrazenie v adminovi zabezpečí, že uvidíš napr. "Instagram: https://..."
          preview: {
            select: { title: 'platform', subtitle: 'url' }
          }
        }
      ]
    },
  ],
}