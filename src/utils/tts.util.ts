export interface TTSOptions {
    lang?: string;
    speed?: number;
    pitch?: number;
    volume?: number;
}

export function isWebSpeechAPIAvailable(): boolean {
    if (typeof window === "undefined") return false;
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export async function playTTS(text: string, options: TTSOptions = {}): Promise<void> {
    const { lang = "en-US", speed = 1, pitch = 1, volume = 1 } = options;

    if (!isWebSpeechAPIAvailable()) {
        throw new Error("Web Speech API is not available in this browser");
    }

    return new Promise((resolve, reject) => {
        try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = speed;
            utterance.pitch = pitch;
            utterance.volume = volume;

            utterance.onend = () => {
                resolve();
            };

            utterance.onerror = (error) => {
                console.error("Web Speech API error:", error);
                reject(new Error(`Speech synthesis failed: ${error.error}`));
            };

            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error("Error initializing Web Speech API:", error);
            reject(error);
        }
    });
}

export function stopTTS(): void {
    if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
    if (typeof window === "undefined" || !window.speechSynthesis) {
        return [];
    }
    return window.speechSynthesis.getVoices();
}

export function findVoiceByLang(lang: string): SpeechSynthesisVoice | null {
    const voices = getAvailableVoices();
    let voice = voices.find((v) => v.lang === lang);
    if (voice) return voice;

    const langCode = lang.split("-")[0];
    voice = voices.find((v) => v.lang.startsWith(langCode));
    if (voice) return voice;

    return voices.find((v) => v.default) || voices[0] || null;
}

