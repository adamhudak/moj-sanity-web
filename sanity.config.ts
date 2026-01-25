import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Môj Sanity Web',

  projectId: '86nvcwr6', // Tvoje ID zo screenshotu
  dataset: 'production',

  basePath: '/studio', // Tu bude dostupná administrácia

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})