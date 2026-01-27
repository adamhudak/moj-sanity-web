export const settingsType = {
  name: 'settings',
  title: 'Nastavenia webu',
  type: 'document',
  // 1. DEFINUJEME SKUPINY (TABY)
  groups: [
    { name: 'identity', title: 'Identita' },
    { name: 'contact', title: 'Kontaktné údaje' },
    { name: 'billing', title: 'Fakturácia' },
    { name: 'social', title: 'Sociálne siete' },
  ],
  fields: [
    // --- IDENTITY SEKCIU ---
    {
      name: 'siteTitle',
      type: 'string',
      title: 'Názov webu (Site Title)',
      group: 'identity', // Priradenie k tabu
    },
    {
      name: 'logos',
      type: 'object',
      title: 'Logá',
      group: 'identity', // Priradenie k tabu
      fields: [
        { name: 'logoWhite', type: 'image', title: 'Logo (Biele/Svetlé)' },
        { name: 'logoDark', type: 'image', title: 'Logo (Tmavé)' },
      ]
    },

    // --- KONTAKTNÉ ÚDAJE ---
    {
      name: 'contactDetails',
      type: 'object',
      title: 'Kontaktné údaje',
      group: 'contact', // Priradenie k tabu
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Telefón' },
        { name: 'address', type: 'text', title: 'Adresa', rows: 3 },
        { name: 'mapEmbed', type: 'text', title: 'Google Maps Embed kód' },
      ]
    },

    // --- FAKTURAČNÉ ÚDAJE ---
    {
      name: 'billingDetails',
      type: 'object',
      title: 'Fakturačné údaje (Firma)',
      group: 'billing', // Priradenie k tabu
      fields: [
        { name: 'ic', type: 'string', title: 'IČO' },
        { name: 'dic', type: 'string', title: 'DIČ' },
        { name: 'vat', type: 'string', title: 'IČ DPH' },
      ]
    },

    // --- SOCIÁLNE SIETE ---
    {
      name: 'socialLinks',
      type: 'object',
      title: 'Sociálne siete',
      group: 'social', // Priradenie k tabu
      fields: [
        { name: 'fb', type: 'url', title: 'Facebook URL' },
        { name: 'ig', type: 'url', title: 'Instagram URL' },
        { name: 'li', type: 'url', title: 'LinkedIn URL' },
        { name: 'yt', type: 'url', title: 'YouTube URL' },
      ]
    },
  ]
}