import flagCro from "@/assets/flags/cro-flag.png";
import flagBih from "@/assets/flags/bih-flag.png";
import flagUsa from "@/assets/flags/usa-flag.png";
import flagDe from "@/assets/flags/de-flag.png";

export interface Nationality {
  code: string; // ISO-3, stored in DB
  iso2: string;
  name: string; // Croatian name
}

export const NATIONALITIES: Nationality[] = [
  { code: "CRO", iso2: "hr", name: "Hrvatska" },
  { code: "BIH", iso2: "ba", name: "Bosna i Hercegovina" },
  { code: "SRB", iso2: "rs", name: "Srbija" },
  { code: "SLO", iso2: "si", name: "Slovenija" },
  { code: "MNE", iso2: "me", name: "Crna Gora" },
  { code: "MKD", iso2: "mk", name: "Sjeverna Makedonija" },
  { code: "USA", iso2: "us", name: "Sjedinjene Američke Države" },
  { code: "CAN", iso2: "ca", name: "Kanada" },
  { code: "GER", iso2: "de", name: "Njemačka" },
  { code: "AUT", iso2: "at", name: "Austrija" },
  { code: "SUI", iso2: "ch", name: "Švicarska" },
  { code: "ITA", iso2: "it", name: "Italija" },
  { code: "ESP", iso2: "es", name: "Španjolska" },
  { code: "POR", iso2: "pt", name: "Portugal" },
  { code: "FRA", iso2: "fr", name: "Francuska" },
  { code: "BEL", iso2: "be", name: "Belgija" },
  { code: "NED", iso2: "nl", name: "Nizozemska" },
  { code: "GBR", iso2: "gb", name: "Ujedinjeno Kraljevstvo" },
  { code: "IRL", iso2: "ie", name: "Irska" },
  { code: "DEN", iso2: "dk", name: "Danska" },
  { code: "SWE", iso2: "se", name: "Švedska" },
  { code: "NOR", iso2: "no", name: "Norveška" },
  { code: "FIN", iso2: "fi", name: "Finska" },
  { code: "ISL", iso2: "is", name: "Island" },
  { code: "POL", iso2: "pl", name: "Poljska" },
  { code: "CZE", iso2: "cz", name: "Češka" },
  { code: "SVK", iso2: "sk", name: "Slovačka" },
  { code: "HUN", iso2: "hu", name: "Mađarska" },
  { code: "ROU", iso2: "ro", name: "Rumunjska" },
  { code: "BUL", iso2: "bg", name: "Bugarska" },
  { code: "GRE", iso2: "gr", name: "Grčka" },
  { code: "TUR", iso2: "tr", name: "Turska" },
  { code: "UKR", iso2: "ua", name: "Ukrajina" },
  { code: "RUS", iso2: "ru", name: "Rusija" },
  { code: "LTU", iso2: "lt", name: "Litva" },
  { code: "LAT", iso2: "lv", name: "Latvija" },
  { code: "EST", iso2: "ee", name: "Estonija" },
  { code: "ISR", iso2: "il", name: "Izrael" },
  { code: "GEO", iso2: "ge", name: "Gruzija" },
  { code: "ALB", iso2: "al", name: "Albanija" },
  { code: "KOS", iso2: "xk", name: "Kosovo" },
  { code: "BRA", iso2: "br", name: "Brazil" },
  { code: "ARG", iso2: "ar", name: "Argentina" },
  { code: "URU", iso2: "uy", name: "Urugvaj" },
  { code: "MEX", iso2: "mx", name: "Meksiko" },
  { code: "DOM", iso2: "do", name: "Dominikanska Republika" },
  { code: "PUR", iso2: "pr", name: "Portoriko" },
  { code: "VEN", iso2: "ve", name: "Venezuela" },
  { code: "COL", iso2: "co", name: "Kolumbija" },
  { code: "NGA", iso2: "ng", name: "Nigerija" },
  { code: "SEN", iso2: "sn", name: "Senegal" },
  { code: "CMR", iso2: "cm", name: "Kamerun" },
  { code: "RSA", iso2: "za", name: "Južnoafrička Republika" },
  { code: "EGY", iso2: "eg", name: "Egipat" },
  { code: "AUS", iso2: "au", name: "Australija" },
  { code: "NZL", iso2: "nz", name: "Novi Zeland" },
  { code: "CHN", iso2: "cn", name: "Kina" },
  { code: "JPN", iso2: "jp", name: "Japan" },
  { code: "KOR", iso2: "kr", name: "Južna Koreja" },
  { code: "PHI", iso2: "ph", name: "Filipini" },
];

const LOCAL_FLAGS: Record<string, string> = {
  CRO: flagCro,
  HRV: flagCro,
  BIH: flagBih,
  USA: flagUsa,
  GER: flagDe,
  DEU: flagDe,
};

const BY_CODE = new Map(NATIONALITIES.map((n) => [n.code, n]));

export function getNationality(code?: string | null): Nationality | undefined {
  if (!code) return undefined;
  const up = code.toUpperCase();
  if (up === "HRV") return BY_CODE.get("CRO");
  if (up === "DEU") return BY_CODE.get("GER");
  return BY_CODE.get(up);
}

/** Flag image URL for an ISO-3 code, or undefined when unknown. */
export function getFlagUrl(code?: string | null): string | undefined {
  if (!code) return undefined;
  const up = code.toUpperCase();
  if (LOCAL_FLAGS[up]) return LOCAL_FLAGS[up];
  const nat = getNationality(up);
  return nat ? `https://flagcdn.com/w40/${nat.iso2}.png` : undefined;
}
