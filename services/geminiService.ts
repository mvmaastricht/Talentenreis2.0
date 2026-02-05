import { UserProgress, ReflectionAnswers } from "../types";
import { ROUTES } from "../constants";

// Safe way to retrieve the API key that works in both Vite and general Node environments
const getApiKey = () => {
  // First check what Vite has injected via 'define'
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env.OPENROUTER_API_KEY) {
    // @ts-ignore
    return process.env.OPENROUTER_API_KEY;
  }
  // Fallback to import.meta.env for standard Vite behavior
  return import.meta.env.VITE_OPENROUTER_API_KEY || '';
};

const apiKey = getApiKey();

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// Using a fast, cost-effective model suitable for Dutch text.
// Google's Gemini Flash via OpenRouter is excellent for this.
const MODEL = "google/gemini-2.0-flash-001";

const formatField = (field: string[] = [], custom: string = "") => {
  const safeField = Array.isArray(field) ? field : [];
  const combined = [...safeField];
  if (custom) combined.push(custom);
  return combined.join(", ");
};

const buildContext = (reflection: ReflectionAnswers, progress: UserProgress) => {
  const likedRouteIds = Object.entries(progress.routeScores)
    .filter(([_, score]) => score >= 3)
    .map(([id]) => id);
    
  const likedRoutes = ROUTES.filter(r => likedRouteIds.includes(r.id)).map(r => r.title).join(", ");
  const likedJobs = progress.likedJobs.join(", ");

  return `
    Hier zijn de antwoorden van de leerling uit hun Talentenreis:
    1. Wie ben ik: ${formatField(reflection.whoAmI, reflection.customAnswers.whoAmI)}
    2. Wat vind ik leuk: ${formatField(reflection.likes, reflection.customAnswers.likes)}
    3. Waar ben ik goed in: ${formatField(reflection.goodAt, reflection.customAnswers.goodAt)}
    4. Wat deed ik graag als kind: ${formatField(reflection.childhood, reflection.customAnswers.childhood)}
    5. Waar krijg ik energie van: ${formatField(reflection.energy, reflection.customAnswers.energy)}
    6. Wat zeggen anderen over mij: ${formatField(reflection.othersSay, reflection.customAnswers.othersSay)}
    
    Favoriete routes in de app: ${likedRoutes || "Nog geen specifieke voorkeur"}
    Favoriete beroepen: ${likedJobs || "Nog geen specifieke beroepen"}
  `;
};

// Helper function to call OpenRouter
async function callOpenRouter(prompt: string): Promise<string> {
    if (!apiKey) return "AI Mentor functie is niet beschikbaar (geen API key ingesteld op Vercel).";

    try {
        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://talentenreis.app", // Required by OpenRouter guidelines
                "X-Title": "Mijn Talentenreis" // Required by OpenRouter guidelines
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            console.error("OpenRouter Error:", response.statusText);
            return "Er is een technische fout opgetreden bij de AI service.";
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Geen antwoord ontvangen.";

    } catch (error) {
        console.error("Network Error:", error);
        return "Kan geen verbinding maken met de AI service.";
    }
}

export const generateMentorSummary = async (
  reflection: ReflectionAnswers,
  progress: UserProgress
): Promise<string> => {
  const context = buildContext(reflection, progress);

  const prompt = `
    Je bent een inspirerende loopbaancoach voor leerlingen (12-16 jaar).
    
    ${context}

    Opdracht: Schrijf een compact en visueel aantrekkelijk 'Talentenprofiel'.
    Gebruik EXACT deze structuur met de volgende **dikgedrukte koppen**:

    **✨ Jouw Superkracht**
    [Beschrijf hier in 2 zinnen wat deze leerling uniek maakt]

    **⚡️ Hier ga jij van aan**
    [Waar krijgt de leerling energie van? Wat vinden ze leuk?]

    **🤝 Jouw Rol in een Team**
    [Ben je een leider, een maker, een denker of een helper? Leg kort uit.]

    **🚀 Tip van de Coach**
    [Eén krachtige, positieve zin als afsluiting]

    Schrijf direct tot de leerling ("Jij bent..."). Houd het positief en strak.
  `;

  return await callOpenRouter(prompt);
};

export const generateStudyAdvice = async (
  reflection: ReflectionAnswers,
  progress: UserProgress
): Promise<string> => {
  const context = buildContext(reflection, progress);

  const prompt = `
    Je bent een expert op het gebied van studiekeuze en loopbaanoriëntatie voor alle niveaus (MBO, HBO en WO).
    Je spreekt een leerling aan die net zijn interesses heeft verkend. Houd de taal begrijpelijk (B1 niveau).

    ${context}

    Opdracht: Geef een helder en overzichtelijk **Studie- en Toekomstadvies**.
    
    STRUCTUUR VAN JE ANTWOORD (Houd deze volgorde exact aan):

    DEEL 1: TOP 3 HOOFDADVIEZEN
    Geef direct de 3 beste richtingen/studies die bij deze leerling passen op basis van hun favoriete beroepen. 
    Zet dit in een genummerde lijst (1. 2. 3.).
    Zet direct hieronder de tekst: "===SPLIT==="

    DEEL 2: VERDIEPING
    Hierna volgt de rest van de uitleg. Gebruik de volgende koppen (dikgedrukt):
    
    1. Passende Profielen & Vakken
    (Welke profielen op de middelbare school passen hierbij? Bijv. Economie & Maatschappij, Zorg & Welzijn).

    2. Opleidingen Overzicht
    (Geef een lijstje met specifieke opleidingen per niveau. Bijv. "MBO: ...", "HBO: ...").

    3. Jouw Toekomst
    (Een korte, inspirerende afsluiting).

    Belangrijk:
    - Wees concreet.
    - Geen hashtags (#).
  `;

  return await callOpenRouter(prompt);
};