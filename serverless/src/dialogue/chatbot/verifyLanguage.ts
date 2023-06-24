export const allowedLanguages = ["English"];

export function isValidLanguage(language: string): boolean {
  return allowedLanguages.includes(language);
}
