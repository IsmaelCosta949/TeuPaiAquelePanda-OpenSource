const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor " +
  "incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud " +
  "exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute " +
  "irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur " +
  "excepteur sint occaecat cupidatat non proident sunt culpa qui officia " +
  "deserunt mollit anim id est laborum"
).split(" ");

const CLASSIC_START = ["lorem", "ipsum", "dolor", "sit", "amet"];

export type LoremUnit = "paragraphs" | "sentences" | "words";

export const LOREM_LIMITS: Record<LoremUnit, number> = {
  paragraphs: 10,
  sentences: 30,
  words: 200,
};

function randomWords(count: number): string[] {
  return Array.from(
    { length: count },
    () => WORDS[Math.floor(Math.random() * WORDS.length)],
  );
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function sentence(startWith?: string[]): string {
  const length = 6 + Math.floor(Math.random() * 9);
  const words = startWith
    ? [...startWith, ...randomWords(Math.max(length - startWith.length, 1))]
    : randomWords(length);
  return `${capitalize(words.join(" "))}.`;
}

function paragraph(startWith?: string[]): string {
  const count = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, (_, i) =>
    sentence(i === 0 ? startWith : undefined),
  ).join(" ");
}

export function generateLorem(
  unit: LoremUnit,
  count: number,
  classicStart: boolean,
): string {
  const start = classicStart ? CLASSIC_START : undefined;

  if (unit === "words") {
    const words = randomWords(count);
    if (start) words.splice(0, Math.min(start.length, count), ...start.slice(0, count));
    return words.join(" ");
  }
  if (unit === "sentences") {
    return Array.from({ length: count }, (_, i) =>
      sentence(i === 0 ? start : undefined),
    ).join(" ");
  }
  return Array.from({ length: count }, (_, i) =>
    paragraph(i === 0 ? start : undefined),
  ).join("\n\n");
}
