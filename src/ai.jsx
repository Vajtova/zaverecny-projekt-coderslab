import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

   export async function getJidelnicek({pohlavi, vek, vyska, vaha, aktivita, cil, kalorie, bilkoviny, sacharidy, tuky}) {
  const response = await ai.models.generateContent({
    contents: `Vytvoř mi prosím příklad denního jídelníčku na základě doporučených kalorických hodnot a makroživin. 
    Jídelníček by měl obsahovat pět jídel denně: snídaně, svačina, oběd, svačina a večeře. 
    U každého jídla vytvoř prosím tři různé varianty s přibližně stejnými kalorickými hodnotami. 
    U snídaně dávej prosím vždy minimálně jednu slanou a jednu sladkou variantu. 
    U hlavních jídel (snídaně, oběd, večeře) dbej na dostatečné zastoupení bílkovin (minimálně 30 g na porci).

        Pohlaví: ${pohlavi}
        Věk: ${vek}
        Váha: ${vaha} kg
        Výška: ${vyska} cm
        Aktivita: ${aktivita}
        Cíl: ${cil}

        Doporučený kalorický příjem: ${kalorie} kcal
        Bílkoviny: ${bilkoviny} g
        Sacharidy: ${sacharidy} g
        Tuky: ${tuky} g
        
    Výstup vygeneruj ve formátu JSON podle následujícího vzoru:
    {
      "snidane": {
          "nazev": "snidane"
          "kalorie": 450,
          "jidla": [
              {
                "nazev": "Řecký jogurt s proteinem, granolou a medem", 
                "ziviny": "cca 30 g bílkovin, 31 g sacharidů, 4.5 g tuků", 
                "popis": "150 g řeckého jogurtu, odměrka syrovátkového proteinu, 30 g granoly, 1 čajová lžička medu"},
              {
                "nazev": "Vaječná omeleta s šunkou a zeleninou",
                "ziviny": "cca 32 g bílkovin, 5 g sacharidů, 20 g tuků",
                "popis": "3 vejce, 50 g šunky, 100 g zeleniny (paprika, rajče),
                "popis": "50 g šunky, 100 g zeleniny (paprika, rajče), 1 lžíce olivového oleje"},
                ]
                }
      "svacina": {},
      "obed": {},
      "svacina2": {},
      "vecere": {}
    
    Odpověď vrať pouze jako plain text, neformátuj odpověď jako markdown.`,

    model: 'gemini-2.5-flash-lite',
  });
 const text = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
 return JSON.parse(text)
}