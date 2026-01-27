import { groq } from "next-sanity";
import { client } from "./sanity"; // tvoj sanity client

export async function getSettings() {
  return client.fetch(
    groq`*[_type == "settings"][0]{
      siteTitle,
      "logoWhite": logos.logoWhite.asset->url,
      "logoDark": logos.logoDark.asset->url,
      contactDetails,
      billingDetails,
      socialLinks
    }`,
    {},
    { next: { revalidate: 0 } } // Dáta sa obnovia raz za hodinu
  );
}