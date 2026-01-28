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
    const { name, email, message } = body;

    const result = await writeClient.create({
      _type: 'contactForm',
      name,         // uloží do poľa 'name'
      email,        // uloží do poľa 'email'
      message,      // uloží do poľa 'message'
      // Ručne pridáme dátum aj sem, aby sme mali istotu
      submittedAt: new Date().toISOString(), 
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}