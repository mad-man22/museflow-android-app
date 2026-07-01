import AsyncStorage from '@react-native-async-storage/async-storage';

export interface VibeResponse {
  search_queries: string[];
  mood_profile: {
    mood: string;
    energy: number;
    tempo: 'slow' | 'medium' | 'fast';
  };
}

const compileLocalFallback = (prompt: string): VibeResponse => {
  const kw = prompt.toLowerCase();
  
  const codingFallback: VibeResponse = {
    search_queries: ["lofi chill coding beats", "synthwave retrowave focus", "ambient study study", "instrumental post rock"],
    mood_profile: { mood: "focused", energy: 0.3, tempo: "slow" }
  };

  const gymFallback: VibeResponse = {
    search_queries: ["gym pump metal rock", "hardstyle workout motivation", "synthwave driving cyber", "hyperpop energetic remix"],
    mood_profile: { mood: "energetic", energy: 0.9, tempo: "fast" }
  };

  const sadFallback: VibeResponse = {
    search_queries: ["sad slow acoustic songs", "rainy day lofi piano", "cozy indie folk melancholy", "slow background ambient"],
    mood_profile: { mood: "melancholic", energy: 0.2, tempo: "slow" }
  };

  const generalFallback: VibeResponse = {
    search_queries: [prompt, `${prompt} song`, `${prompt} music`, "chill vibes"],
    mood_profile: { mood: "ambient", energy: 0.5, tempo: "medium" }
  };

  if (kw.includes("gym") || kw.includes("energetic") || kw.includes("workout") || kw.includes("run") || kw.includes("pump")) {
    return gymFallback;
  }
  if (kw.includes("sad") || kw.includes("rain") || kw.includes("cry") || kw.includes("cozy") || kw.includes("night") || kw.includes("lofi")) {
    return sadFallback;
  }
  if (kw.includes("code") || kw.includes("work") || kw.includes("focus") || kw.includes("study")) {
    return codingFallback;
  }

  return generalFallback;
};

export const GeminiService = {
  /**
   * Generates search queries and vibe profiles from natural language prompts using Gemini API
   */
  async generatePlaylistQueries(prompt: string): Promise<VibeResponse> {
    let apiKey = "";
    try {
      apiKey = await AsyncStorage.getItem("gemini_api_key") || "";
    } catch (e) {
      console.warn("Failed to retrieve gemini_api_key from storage:", e);
    }

    const fallback = compileLocalFallback(prompt);

    if (!apiKey) {
      console.log("[Gemini Service] No API Key set. Using high-fidelity local compile fallback.");
      return fallback;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const systemInstruction = 
      "You are the core AI recommendation engine of MuseFlow, a premium music streaming client.\n" +
      "Analyze the user's natural language music prompt. Output a JSON block mapping the prompt into:\n" +
      "1. 'search_queries': An array of 4 distinct search queries (song names, artist search queries, or specific genres) to execute on YouTube Music that capture this vibe.\n" +
      "2. 'mood_profile': An object containing 'mood' (e.g. happy, sad, nostalgic), 'energy' (0.0 to 1.0), and 'tempo' (slow, medium, fast).\n" +
      "Ensure the output is valid JSON, containing ONLY the JSON object. Do not wrap in markdown tags like ```json.";

    const body = {
      contents: [
        {
          parts: [
            { text: `System Instruction: ${systemInstruction}\n\nPrompt: ${prompt}` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(`Gemini API returned status: ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
      
      let parsed = JSON.parse(text);
      if (parsed.search_queries && Array.isArray(parsed.search_queries)) {
        return parsed as VibeResponse;
      }
      return fallback;
    } catch (err) {
      console.warn("[Gemini Service] Call failed, falling back:", err);
      return fallback;
    }
  }
};
