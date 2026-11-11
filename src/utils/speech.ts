/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SpeechHelper {
  private isSpeaking = false;

  public speak(text: string, onEnd?: () => void): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85; // Slightly slower, comfortable pace for seniors
      utterance.pitch = 1.0;

      // Select Korean voice if available
      const voices = window.speechSynthesis.getVoices();
      const koreanVoice = voices.find((v) => v.lang.startsWith('ko') || v.lang.includes('KR'));
      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      this.isSpeaking = true;

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.isSpeaking = false;
  }

  public getSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechHelper = new SpeechHelper();
