import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder, ListItemBuilder } from 'sanity/structure' 
import { schemaTypes } from './schemaTypes'
import { documentInternationalization } from '@sanity/document-internationalization'; 

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
            // UPRAVENÁ ČASŤ PRE NASTAVENIA
            S.listItem()
              .title('Nastavenia firmy')
              .id('settings')
              .child(
                // Namiesto jedného dokumentu otvoríme zoznam, 
                // aby sme mohli prepínať medzi SK a EN verziou nastavení
                S.documentList()
                  .title('Nastavenia podľa jazyka')
                  .schemaType('settings')
                  .filter('_type == "settings" && !defined(base)')
                  .initialValueTemplates([])
              ),

            S.divider(),
            
            ...S.documentTypeListItems().filter(
              (listItem: ListItemBuilder) => 
                !['settings'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    
    documentInternationalization({
      supportedLanguages: [
        {id: 'sk', title: 'Slovenčina'},
        {id: 'en', title: 'Angličtina'}
      ],
      // PRIDALI SME 'settings' DO schemaTypes
      schemaTypes: ['singlePage', 'systemPage', 'settings'], 
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})