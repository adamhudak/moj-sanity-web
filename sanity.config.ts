import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure' 
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
            // 1. NASTAVENIA (SK aj EN pokope)
            S.listItem()
              .title('Nastavenia firmy')
              .id('settings')
              .child(
                S.documentList()
                  .title('Nastavenia podľa jazyka')
                  .schemaType('settings')
                  .filter('_type == "settings"')
              ),

            S.divider(),

            // 2. SLOVENSKÁ SEKCIJA
            S.listItem()
              .title('🇸🇰 Slovenský web')
              .child(
                S.list()
                  .title('Slovenský obsah')
                  .items([
                    S.listItem()
                      .title('Hlavné stránky (Bloky)')
                      .child(
                        S.documentList()
                          .title('SK Stránky')
                          .filter('_type == "singlePage" && language == "sk"')
                      ),
                    S.listItem()
                      .title('Právne informácie (GDPR/VOP)')
                      .child(
                        S.documentList()
                          .title('SK Systémové stránky')
                          .filter('_type == "systemPage" && language == "sk"')
                      ),
                  ])
              ),

            // 3. ANGLICKÁ SEKCIJA
            S.listItem()
              .title('🇬🇧 English Web')
              .child(
                S.list()
                  .title('English Content')
                  .items([
                    S.listItem()
                      .title('Main Pages (Blocks)')
                      .child(
                        S.documentList()
                          .title('EN Pages')
                          .filter('_type == "singlePage" && language == "en"')
                      ),
                    S.listItem()
                      .title('Legal Info (GDPR/VOP)')
                      .child(
                        S.documentList()
                          .title('EN System Pages')
                          .filter('_type == "systemPage" && language == "en"')
                      ),
                  ])
              ),

            // Ostatné typy (ak nejaké pribudnú a nie sú v zozname vyššie)
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings', 'singlePage', 'systemPage'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    
    documentInternationalization({
      supportedLanguages: [
        {id: 'sk', title: 'Slovenčina'},
        {id: 'en', title: 'Angličtina'}
      ],
      schemaTypes: ['singlePage', 'systemPage', 'settings'], 
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})