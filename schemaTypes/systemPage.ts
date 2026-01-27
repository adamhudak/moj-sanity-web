export default {
  name: 'systemPage',
  type: 'document',
  title: 'Podstránky',
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      title: 'Názov stránky (napr. GDPR)' 
    },
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
      name: 'content',
      type: 'array',
      title: 'Obsah stránky',
      of: [{ type: 'block' }] 
    }
  ]
}