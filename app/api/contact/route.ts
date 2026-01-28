import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.warn("Sanity premenné chýbajú! Skontroluj .env súbor.");
}

const writeClient = createClient({
  projectId: projectId || 'placeholder', 
  dataset: dataset || 'production',
  token: token || '',
  useCdn: false,
  apiVersion: '2024-01-01',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Serializácia podľa zadania: formType + zvyšok do JSON stringu
    const { formType = 'contact', ...restOfData } = body;

    const result = await writeClient.create({
      _type: 'contactForm',
      formType: formType,
      formData: JSON.stringify(restOfData, null, 2), // Serializované dáta
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error: any) {
    console.error("Chyba pri zápise do Sanity:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}