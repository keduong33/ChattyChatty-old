const allowedLanguages = ["Deutsch", "Italian", "English"];

export function isValidLanguage(language: string): boolean {
  return allowedLanguages.includes(language);
}
