# Mijn Talentenreis 🚀

Een interactieve web-applicatie voor leerlingen (12-16 jaar) om hun talenten, interesses en passende beroepen te ontdekken.

## ✨ Functies

- **Zelfreflectie**: Leerlingen beantwoorden vragen over wie ze zijn, wat ze leuk vinden en waar ze goed in zijn
- **Beroepen Verkennen**: Ontdek verschillende beroepen via thematische "routes" (Zorgstad, Techlab, etc.)
- **AI Talenten Coach**: Krijg een persoonlijk talentenprofiel en studieadvies op basis van je antwoorden
- **Experimenten**: Plan en volg real-world experimenten om beroepen te verkennen
- **Voortgang Bijhouden**: Al je keuzes en voorkeuren worden lokaal opgeslagen

## 🛠️ Technologie

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: OpenRouter API (Google Gemini Flash 2.0)

## 🚀 Lokaal Draaien

### Vereisten
- Node.js (versie 18 of hoger)
- Een OpenRouter API-sleutel (gratis aan te maken op https://openrouter.ai)

### Installatie

1. **Clone de repository**
   ```bash
   git clone https://github.com/geertjecaris-cyber/Talentenreis2.0.git
   cd Talentenreis2.0
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Configureer API-sleutel**
   ```bash
   cp .env.example .env
   ```
   Open `.env` en vul je OpenRouter API-sleutel in:
   ```
   OPENROUTER_API_KEY=sk-or-v1-jouw-sleutel-hier
   ```

4. **Start de development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Ga naar http://localhost:3000

## 📦 Deployment

Zie [DEPLOYMENT.md](DEPLOYMENT.md) voor gedetailleerde instructies over hoe je de app veilig kunt deployen op:
- Vercel (aanbevolen)
- Netlify
- Traditionele hosting providers

## 🐛 Bug Fixes (Februari 2025)

Deze fork bevat belangrijke fixes voor de originele code:

### Probleem: App crashte bij gebruik van AI
**Oorzaak:**
- `process.env` was niet correct geconfigureerd voor browser-gebruik
- Ontbrekende null-checks bij data verwerking
- API-sleutel werd niet veilig opgehaald

**Oplossing:**
- ✅ Veilige API-sleutel ophaling via `import.meta.env` en Vite's `define`
- ✅ Robuuste data validatie in `formatField` functie
- ✅ Betere error handling bij ontbrekende API-sleutel
- ✅ Verbeterde localStorage data merging

### Technische Details

**Bestanden aangepast:**
- `services/geminiService.ts`: Veilige API-sleutel ophaling en data validatie
- `vite.config.ts`: Correcte environment variable exposure
- `App.tsx`: Betere localStorage data merging
- `index.html`: Toegevoegd Vite entry-point voor lokale development

## 🔒 Beveiliging

- API-sleutels worden NOOIT in de code opgeslagen
- `.env` staat in `.gitignore`
- Environment variables worden veilig beheerd via hosting platform
- Alle gebruikersdata blijft lokaal in de browser (localStorage)

## 📝 Licentie

Dit project is gemaakt voor educatieve doeleinden.

## 🙏 Credits

- Originele code: Geertje Caris
- Bug fixes en deployment guide: Marc (Februari 2025)
- AI Model: Google Gemini Flash 2.0 via OpenRouter

---

**Gemaakt met ❤️ voor onderwijs**
