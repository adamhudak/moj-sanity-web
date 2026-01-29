import { defineField, defineType } from 'sanity';

export const contactFormType = defineType({
  name: 'contactForm',
  title: 'Prijaté správy',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Meno',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Správa',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Odoslané dňa',
      type: 'datetime',
      // Automaticky nastaví aktuálny dátum a čas
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'submittedAt',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Neznámy odosielateľ',
        subtitle: subtitle ? new Date(subtitle).toLocaleString('sk-SK') : 'Bez dátumu',
      };
    },
  },
});