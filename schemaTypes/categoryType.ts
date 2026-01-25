export const categoryType = {
  name: 'category',
  title: 'Kategórie',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Názov kategórie' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
  ],
}