import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'systemPage',
  type: 'document',
  title: 'Podstránky',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Obsah' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // 1. POLE PRE JAZYK
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // --- OBSAH ---
    defineField({ 
      name: 'title', 
      type: 'string', 
      title: 'Názov stránky (napr. GDPR)',
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
      name: 'content',
      type: 'array',
      title: 'Obsah stránky',
      group: 'content',
      of: [{ type: 'block' }] 
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Nadpis',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Popis',
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      type: 'image',
      title: 'SEO Obrázok',
      group: 'seo',
    })
  ],
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