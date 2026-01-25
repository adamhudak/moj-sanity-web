import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '86nvcwr6', // Tvoje ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Pri vývoji daj false, aby si videl zmeny hneď po stlačení Publish
})