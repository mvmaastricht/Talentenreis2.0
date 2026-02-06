# Deployment Handleiding - Mijn Talentenreis

Deze handleiding helpt je om de Talentenreis-app veilig te deployen op een hosting provider.

## Veiligheid en API Keys

**BELANGRIJK:** De API-sleutel mag NOOIT in de code staan of naar GitHub worden gepusht!

### Lokale Ontwikkeling

1. Vul je OpenRouter API-sleutel in:

   ```env
   OPENROUTER_API_KEY=sk-or-v1-jouw-sleutel-hier
   ```

2. Start de development server:

   ```bash
   npm install
   npm run dev
   ```

## Deployment Opties

### Optie 1: Vercel (Aanbevolen - Gratis en Eenvoudig)

Vercel is ideaal voor React/Vite apps en heeft ingebouwde ondersteuning voor environment variables.

**Stappen:**

1. Maak een Vercel account op <https://vercel.com>
2. Importeer je GitHub repository
3. Voeg environment variable toe:
   - Ga naar Project Settings → Environment Variables
   - Voeg toe: `OPENROUTER_API_KEY` met je sleutel
   - Selecteer: Production, Preview, Development
4. Deploy - Vercel bouwt en deploy automatisch

**Voordelen:**

- Gratis voor kleine projecten
- Automatische HTTPS
- Veilige environment variables
- Automatische deploys bij elke Git push
- Preview URLs voor elke branch

### Optie 2: Netlify

Vergelijkbaar met Vercel, ook gratis en veilig.

**Stappen:**

1. Maak een Netlify account op <https://netlify.com>
2. Importeer je GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables:
   - Ga naar Site settings → Environment variables
   - Voeg toe: `OPENROUTER_API_KEY`
5. Deploy

### Optie 3: Traditionele Hosting (cPanel/Plesk)

Voor een school-hosting provider met cPanel of Plesk:

**Stappen:**

1. Build de app lokaal:

   ```bash
   npm run build
   ```

   Dit maakt een `dist` folder met statische bestanden.

2. Upload naar server:
   - Upload de inhoud van de `dist` folder naar `public_html` (of `www`)

3. Environment variables instellen:

   **Probleem:** Statische hosting kan geen server-side environment variables gebruiken!

   **Oplossing A - Backend toevoegen:**

   - Maak een kleine Node.js backend die de API-aanroepen doet
   - De frontend praat met jouw backend, niet direct met OpenRouter
   - De API-sleutel blijft veilig op de server

   **Oplossing B - Serverless Functions:**

   - Gebruik Vercel of Netlify Functions (gratis)
   - Deploy alleen de AI-functies als serverless endpoints
   - De statische site blijft op school-hosting

## Aanbeveling voor Scholen

### Beste optie: Vercel met GitHub

1. Lerares maakt een GitHub account (als ze die nog niet heeft)
2. Fork of push de code naar haar eigen repository
3. Maak een OpenRouter account op naam van de school
4. Deploy via Vercel (gratis, veilig, automatisch)
5. Koppel een custom domein (bijv. `talentenreis.school.nl`)

**Waarom Vercel?**

- Geen server-onderhoud nodig
- Automatische backups via Git
- Veilige API-key opslag
- Gratis SSL certificaat
- Makkelijk te updaten (gewoon code pushen naar GitHub)

## Beveiligingschecklist

- [ ] `.env` staat in `.gitignore`
- [ ] API-sleutel is NIET in de code
- [ ] `.env.example` bevat alleen placeholder
- [ ] Environment variables zijn ingesteld op hosting platform
- [ ] HTTPS is actief (automatisch bij Vercel/Netlify)

## Kosten OpenRouter

OpenRouter rekent per API-aanroep. Voor een school:

- Gemini Flash 2.0: ~$0.075 per 1M tokens (zeer goedkoop)
- Stel een spending limit in op OpenRouter dashboard
- Monitor gebruik via OpenRouter dashboard

**Schatting:** Voor 100 leerlingen die elk 5x de AI gebruiken = ~$0.50-$2.00 per maand

## Hulp Nodig?

Bij problemen:

1. Check de Vercel/Netlify deployment logs
2. Controleer of de environment variable correct is ingesteld
3. Test lokaal eerst met `npm run dev`

---

Gemaakt voor onderwijs
