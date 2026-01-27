import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// Importujeme konkrétne typy pre štruktúru
import type { StructureBuilder, ListItemBuilder } from 'sanity/structure' 
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Môj Sanity Web',
  projectId: '86nvcwr6', 
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool({

      structure: (S: StructureBuilder) =>
        S.list()
          .title('Obsah webu')
          .items([
            S.listItem()
              .title('Nastavenia firmy')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
                  .title('Všeobecné nastavenia')
              ),

            S.divider(),
            
            ...S.documentTypeListItems().filter(
              (listItem: ListItemBuilder) => 
                // Pridali sme 'singlePage' do poľa zakázaných ID
                !['settings'].includes(listItem.getId() || '')
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})