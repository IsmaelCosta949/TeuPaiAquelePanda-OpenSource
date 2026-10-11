const WORDS_PER_MINUTE = 200;

export type TextStats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  readingMinutes: number;
};

export function getTextStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  return {
    // Array.from conta emojis e outros caracteres fora do BMP como um só.
    characters: Array.from(text).length,
    charactersNoSpaces: Array.from(text.replace(/\s/g, "")).length,
    words,
    lines: text ? text.split(/\r\n|\r|\n/).length : 0,
    readingMinutes: words / WORDS_PER_MINUTE,
  };
}
