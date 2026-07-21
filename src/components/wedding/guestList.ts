// Official guest list for the Portuguese RSVP form.
// Only these names can be selected in the /casamento confirmation form.
export const GUEST_LIST: string[] = [
  "Carminha de Paula Ferreira",
  "João de Paula Cupertino",
  "Bianca Ferreira",
  "Brenda Ferreira",
  "Weider de Paula Ferreira",
  "Josiane Pereira",
  "Teresinha dos Santos",
  "Antônio Ferreira",
  "Genesia Tavares",
  "Rubens Tavares",
  "Israel Tavares",
  "Gabriel Tavares",
  "George Novais",
  "Naiara Novais",
  "Carmen Ferreira",
  "Julio Cesar",
  "Dayse Oliveira",
  "Jhemerson Gujaski",
  "Willian Grando",
  "Josyane Pillar",
  "Emmanuelle Vitória",
  "Marco Tulio dos Santos",
  "Daniele Cristina",
  "Maria Ferreira dos Santos",
  "Aldo Ferreira dos Santos",
  "Elisa Silva",
  "Huercules Guimarães",
  "Júnia Almeida",
  "Tayze Almeida",
  "Nayara Almeida Mendes",
  "Ana Almeida Mendes",
  "Enzo Almeida Mendes",
  "Valdenir Mendes",
  "Juciana Almeida",
  "Eduarda Almeida",
  "Jussara Almeida",
  "Camila Almeida",
  "Maria da Conceição Almeida",
  "Amanda Reis",
  "Carlos Henrique",
  "Oliver Reis",
  "Theo Reis",
  "Ana Luiza Souza",
  "Marcos Eduardo",
  "Wander Ferreira",
  "Lilian Ferreira",
  "Natalia Ferreira",
  "Vânia Maria Marques",
  "Manoel Messias Adelaide",
  "Sophia Lara Marques Adelaide",
  "Mikaelly Oliveira",
];

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export const normalizeName = stripDiacritics;

const firstNameOf = (name: string) => stripDiacritics(name).split(/\s+/)[0] ?? "";

export function findGuestMatches(query: string, excluded: string[] = []): string[] {
  const q = stripDiacritics(query);
  if (q.length < 2) return [];
  const excludedSet = new Set(excluded.map(stripDiacritics).filter(Boolean));
  return GUEST_LIST.filter((name) => {
    const norm = stripDiacritics(name);
    if (excludedSet.has(norm)) return false;
    // Match only against the beginning of the first name.
    return firstNameOf(name).startsWith(q);
  }).slice(0, 8);
}

export function isValidGuest(name: string): boolean {
  const n = stripDiacritics(name);
  return GUEST_LIST.some((g) => stripDiacritics(g) === n);
}
