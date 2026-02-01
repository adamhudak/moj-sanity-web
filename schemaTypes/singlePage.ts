import { DocumentsIcon, ComposeIcon, HelpCircleIcon, EnvelopeIcon, ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'singlePage',
  type: 'document',
  title: 'Stránky',
  icon: DocumentsIcon,
  groups: [
    { name: 'content', title: 'Obsah stránky' },
    { name: 'seo', title: 'SEO nastavenia' },
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({ 
      name: 'title', 
      type: 'string', 
      title: 'Nadpis stránky',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL adresa',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sekcie stránky',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'heroSection',
          title: 'Úvodná sekcia (Obrázok + Text)',
          icon: ComposeIcon, // Pridaná ikona
          fields: [
            { name: 'image', type: 'image', title: 'Obrázok', options: { hotspot: true } },
            { name: 'text', type: 'text', title: 'Text' }
          ],
          preview: {
            select: { title: 'text', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Hero Sekcia', subtitle: 'Hero', media }
            }
          }
        },
        {
          type: 'object',
          name: 'faqSection',
          title: 'Akordeón (FAQ)',
          icon: HelpCircleIcon,
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              title: 'Nadpis sekcie', 
              initialValue: 'Časté otázky' 
            },
            {
              name: 'questions',
              type: 'array',
              title: 'Otázky a odpovede',
              of: [{
                type: 'object',
                fields: [
                  { name: 'question', type: 'string', title: 'Otázka' },
                  { name: 'answer', type: 'text', title: 'Odpoveď' }
                ]
              }]
            }
          ],
          preview: {
            select: { 
              title: 'title', 
              questions: 'questions' 
            },
            prepare({ title, questions }) {
              return { 
                title: title || 'FAQ Sekcia', 
                subtitle: `${questions?.length || 0} (počet otázok)` 
              }
            }
          }
        },
        // --- NOVÁ SEKCE: CAROUSEL ---
        {
          type: 'object',
          name: 'carouselSection',
          title: 'Carousel (Slider)',
          icon: ImagesIcon,
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              title: 'Nadpis sekcie', 
              description: 'Napr. Naše referencie alebo Naše služby' 
            },
            {
              name: 'items',
              type: 'array',
              title: 'Položky slideru',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'image', type: 'image', title: 'Obrázok', options: { hotspot: true } },
                    { name: 'title', type: 'string', title: 'Nadpis karty' },
                    { name: 'description', type: 'text', title: 'Krátky popis' },
                  ],
                  preview: {
                    select: { title: 'title', media: 'image' },
                    prepare({ title, media }) {
                      return { title: title || 'Bez názvu', media }
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare({ title, items }) {
              return { 
                title: title || 'Carousel', 
                subtitle: `Slider s ${items?.length || 0} položkami`,
                media: ImagesIcon 
              }
            }
          }
        },
        {
          type: 'object',
          name: 'contactSection',
          title: 'Kontaktný formulár',
          icon: EnvelopeIcon, // Pridaná ikona
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
            { name: 'title', type: 'string', title: 'Nadpis sekcie', initialValue: 'Napíšte nám' },
            { name: 'description', type: 'text', title: 'Krátky text nad formulárom' },
          ],
          preview: {
            select: { title: 'title', layout: 'layout' },
            prepare({ title, layout }) {
              return { title: title || 'Kontakt', subtitle: `Layout: ${layout}` }
            }
          }
        },
      ]
    }),
    
    // --- SEO POLIA ---
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Nadpis (Meta Title)',
      group: 'seo'
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Popis (Meta Description)',
      group: 'seo'
    }),
    defineField({
      name: 'seoImage',
      type: 'image',
      title: 'SEO Obrázok',
      group: 'seo'
    })
  ],
  // Vylepšený náhľad v zozname stránok
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      language: 'language'
    },
    prepare({ title, slug, language }) {
      return {
        title: title || 'Bez názvu',
        subtitle: `${language?.toUpperCase() || '--'} | /${slug || ''}`
      }
    }
  }
})