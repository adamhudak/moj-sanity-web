import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const settingsType = defineType({
  name: 'settings',
  title: 'Nastavenia webu',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'identity', title: 'Identita' },
    { name: 'navigation', title: 'Menu' },
    { name: 'contact', title: 'Kontaktné údaje' },
    { name: 'billing', title: 'Fakturácia' },
    { name: 'social', title: 'Sociálne siete' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // 1. POLE PRE JAZYK (Povinné pre správne fungovanie prekladov)
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // --- IDENTITY SEKCIU ---
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Názov webu (Site Title)',
      group: 'identity',
    }),
    defineField({
      name: 'logos',
      type: 'object',
      title: 'Logá',
      group: 'identity',
      fields: [
        { name: 'logoWhite', type: 'image', title: 'Logo (Biele/Svetlé)' },
        { name: 'logoDark', type: 'image', title: 'Logo (Tmavé)' },
      ]
    }),

    // --- NAVIGATION (HEADER) ---
    defineField({
      name: 'menuItems',
      title: 'Menu v hlavičke (Header)',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          title: 'Položka menu',
          fields: [
            { name: 'label', title: 'Názov v menu', type: 'string' },
            { 
              name: 'link', 
              title: 'Cesta (Slug)', 
              type: 'reference', 
              to: [{ type: 'singlePage' }, { type: 'systemPage' }],
              options: {
                filter: ({ document }) => {
                  const lang = (document as any).language;
                  return {
                    filter: 'language == $lang',
                    params: { lang }
                  }
                }
              }
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'link.slug.current'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Bez názvu',
                subtitle: subtitle ? `/${subtitle}` : 'Odkaz nenastavený'
              }
            }
          }
        }
      ]
    }),

    // --- NAVIGATION (FOOTER) ---
    defineField({
      name: 'footerMenuItems',
      title: 'Menu v pätičke (Footer)',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Názov', type: 'string' },
            { 
              name: 'link', 
              type: 'reference', 
              to: [{ type: 'singlePage' }, { type: 'systemPage' }],
              options: {
                filter: ({ document }) => {
                  const lang = (document as any).language;
                  return {
                    filter: 'language == $lang',
                    params: { lang }
                  }
                }
              }
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'link.slug.current' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `/${subtitle}` : 'Odkaz nenastavený' }
            }
          }
        }
      ]
    }),

    // --- SKUPINA: SEO ---
    defineField({
      name: 'titleFormat',
      title: 'Formát titulku',
      type: 'string',
      description: 'Napr. %title% | Brand',
      group: 'seo',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Predvolený SEO popis',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Predvolený OG obrázok',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'baseUrl',
      title: 'Canonical Base URL',
      type: 'url',
      placeholder: 'https://www.tvojweb.sk',
      group: 'seo',
    }),

    // --- KONTAKTNÉ ÚDAJE ---
    defineField({
      name: 'contactDetails',
      type: 'object',
      title: 'Kontaktné údaje',
      group: 'contact',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Telefón' },
        { name: 'address', type: 'text', title: 'Adresa', rows: 3 },
        { name: 'mapEmbed', type: 'text', title: 'Google Maps Embed kód' },
      ]
    }),

    // --- FAKTURAČNÉ ÚDAJE ---
    defineField({
      name: 'billingDetails',
      type: 'object',
      title: 'Fakturačné údaje (Firma)',
      group: 'billing',
      fields: [
        { name: 'ic', type: 'string', title: 'IČO' },
        { name: 'dic', type: 'string', title: 'DIČ' },
        { name: 'vat', type: 'string', title: 'IČ DPH' },
      ]
    }),

    // --- SOCIÁLNE SIETE ---
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Sociálne siete',
      group: 'social',
      fields: [
        { name: 'fb', type: 'url', title: 'Facebook URL' },
        { name: 'ig', type: 'url', title: 'Instagram URL' },
        { name: 'li', type: 'url', title: 'LinkedIn URL' },
        { name: 'yt', type: 'url', title: 'YouTube URL' },
      ]
    }),
  ]
});