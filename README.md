# 🚀 Môj Web Projekt (Next.js + Sanity)

Tento projekt je moderná webová aplikácia postavená na Next.js s integrovaným bezhlavým CMS (Sanity) pre jednoduchú správu obsahu.

## 🛠 Použité technológie

### Frontend
- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** – Moderný styling s využitím nových CSS-native funkcií.
- **TypeScript** – Pre bezpečný a čitateľný kód.
- **Lucide React** – Sada elegantných ikon.

### Content Management (CMS)
- **Sanity.io** – Flexibilné rozhranie pre správu článkov, kurzov a SEO.
- **GROQ** – Dopytovací jazyk na získavanie dát zo Sanity.

### Nainštalované balíčky (Kľúčové dependency)
- `@portabletext/react` – Na vykresľovanie bohatého textu zo Sanity.
- `@tailwindcss/typography` – Plugin pre automatický styling článkov (trieda `prose`).
- `yet-another-react-lightbox` – Interaktívna galéria obrázkov.
- `next-sanity` – Oficiálny toolkit pre prepojenie Next.js a Sanity.

## ✨ Funkcie projektu
- ✅ **Dynamický Blog/Kurzy** – Automatické generovanie stránok z CMS.
- ✅ **Hierarchické kategórie a tagy** – Prepracovaná organizácia obsahu.
- ✅ **Kompletné SEO** – Dynamické Meta titulky, popisy a podpora pre SEO/Social zdieľacie obrázky.
- ✅ **Stavy príspevkov** – Vizuálne odlíšenie: *Aktuálne*, *Pripravujeme* a *Skončilo*.
- ✅ **Responzívny dizajn** – Optimalizované pre mobily aj desktopy.

## 🚀 Spustenie projektu

1. Nainštaluj závislosti:
   ```bash
   npm install