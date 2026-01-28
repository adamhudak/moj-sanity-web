import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2026-01-01',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Zapíšeme dáta do Sanity CPT
    const result = await writeClient.create({
      _type: 'contactForm',
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Chyba pri zápise' }, { status: 500 });
  }
}