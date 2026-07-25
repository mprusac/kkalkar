import { supabase } from "@/integrations/supabase/client";

// Team logos (kept in sync with Results.tsx / Statistics.tsx)
import logoPosusje from "@/assets/logos/kk_posusje.png";
import logoCedevita from "@/assets/logos/kk_cedevita_junior.png";
import logoCibona from "@/assets/logos/kk_cibona.png";
import logoDinamo from "@/assets/logos/kk_dinamo_zagreb.png";
import logoDubrava from "@/assets/logos/kk_dubrava.png";
import logoDubrovnik from "@/assets/logos/kk_dubrovnik.png";
import logoDakovo from "@/assets/logos/kk_dakovo.png";
import logoKvarner from "@/assets/logos/kk_kvarner.png";
import logoSamobor from "@/assets/logos/kk_samobor.png";
import logoSplit from "@/assets/logos/kk_split.png";
import logoZabok from "@/assets/logos/kk_zabok.png";
import logoZadar from "@/assets/logos/kk_zadar.png";
import logoSibenka from "@/assets/logos/kk_sibenka.png";
import logoSyntainics from "@/assets/logos/SYNTAINICS_BC.png.asset.json";
import logoFyllingen from "@/assets/logos/fyllingen_lions.png.asset.json";
import logoDonar from "@/assets/logos/donar_groningen.png.asset.json";
import logoKapfenberg from "@/assets/logos/kapfenberg_bulls.png.asset.json";
import logoBristol from "@/assets/logos/bristol_fylers.png.asset.json";
import logoVoluntari from "@/assets/logos/CSO_Voluntari.png.asset.json";
import logoTalTech from "@/assets/logos/taltech_alexela.png.asset.json";
import logoValmiera from "@/assets/logos/Valmiera_Glass_VIA.png.asset.json";


export const POSUSJE_NAME = "KK Alkar Sinj";

export const OPPONENT_OPTIONS = [
  "Cedevita Junior",
  "Cibona",
  "Dinamo",
  "Dubrava",
  "Dubrovnik",
  "Đakovo",
  "Kvarner",
  "Samobor",
  "Split",
  "Zabok",
  "Zadar",
  "Šibenka",
];

export const staticTeamLogos: Record<string, string> = {
  "KK Alkar Sinj": logoPosusje,
  "KK Alkar": logoPosusje,
  "Alkar": logoPosusje,
  "Cedevita Junior": logoCedevita,
  "KK Cedevita Junior": logoCedevita,
  "Cibona": logoCibona,
  "KK Cibona": logoCibona,
  "Dinamo": logoDinamo,
  "KK Dinamo": logoDinamo,
  "KK Dinamo Zagreb": logoDinamo,
  "Dubrava": logoDubrava,
  "KK Dubrava": logoDubrava,
  "Dubrovnik": logoDubrovnik,
  "KK Dubrovnik": logoDubrovnik,
  "Đakovo": logoDakovo,
  "KK Đakovo": logoDakovo,
  "Kvarner": logoKvarner,
  "KK Kvarner": logoKvarner,
  "Samobor": logoSamobor,
  "KK Samobor": logoSamobor,
  "Split": logoSplit,
  "KK Split": logoSplit,
  "Zabok": logoZabok,
  "KK Zabok": logoZabok,
  "Zadar": logoZadar,
  "KK Zadar": logoZadar,
  "Šibenka": logoSibenka,
  "KK Šibenka": logoSibenka,
};

export interface MatchRow {
  id: string;
  match_date: string; // YYYY-MM-DD
  opponent: string;
  is_home: boolean;
  posusje_score: number | null;
  opponent_score: number | null;
  competition: string;
  youtube_link: string | null;
  sofascore_link: string | null;
  opponent_logo_url: string | null;
}

export function formatDMY(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function competitionLabel(c: string): string {
  switch (c) {
    case "kup": return "Kup 🏆";
    case "enbl": return "ENBL";
    case "liburnia": return "Liburnia Kup";
    case "kkcup": return "Krešimir Ćosić Cup";
    case "liga":
    default: return "SuperSport PL";
  }
}


export interface DisplayMatch {
  id: string;
  date: string; // DD.MM.YYYY
  isoDate: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  isUpcoming: boolean;
  sofascoreLink?: string;
  youtubeLink?: string;
  competition: string;
  opponent: string;
  opponentLogoUrl: string | null;
}

export function toDisplay(row: MatchRow): DisplayMatch {
  const homeTeam = row.is_home ? POSUSJE_NAME : row.opponent;
  const awayTeam = row.is_home ? row.opponent : POSUSJE_NAME;
  const homeScore = row.is_home ? row.posusje_score ?? 0 : row.opponent_score ?? 0;
  const awayScore = row.is_home ? row.opponent_score ?? 0 : row.posusje_score ?? 0;
  const isUpcoming = row.posusje_score === null || row.opponent_score === null;
  return {
    id: row.id,
    date: formatDMY(row.match_date),
    isoDate: row.match_date,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isHome: row.is_home,
    isUpcoming,
    sofascoreLink: row.sofascore_link ?? undefined,
    youtubeLink: row.youtube_link ?? undefined,
    competition: competitionLabel(row.competition),
    opponent: row.opponent,
    opponentLogoUrl: row.opponent_logo_url,
  };
}

export async function fetchMatches(): Promise<DisplayMatch[]> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("match_date", { ascending: false });
  if (error) throw error;
  return (data as MatchRow[]).map(toDisplay);
}

// W/L for last N played (from Posušje's POV), newest first
export interface FormEntry {
  id: string;
  opponent: string;
  result: "W" | "L";
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  opponentLogoUrl: string | null;
}

export function buildForm(matches: DisplayMatch[], count = 7): FormEntry[] {
  const played = matches.filter((m) => !m.isUpcoming);
  // matches already sorted DESC by isoDate
  const last = played.slice(0, count);
  return last.map((m) => {
    const posusjeScore = m.isHome ? m.homeScore : m.awayScore;
    const oppScore = m.isHome ? m.awayScore : m.homeScore;
    return {
      id: m.id,
      opponent: m.opponent,
      result: posusjeScore > oppScore ? "W" : "L",
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      opponentLogoUrl: m.opponentLogoUrl,
    };
  });
}

export function getTeamLogoFor(match: DisplayMatch, team: string): string | null {
  // If the team is the opponent and we have a custom logo URL, use it
  if (team === match.opponent && match.opponentLogoUrl) return match.opponentLogoUrl;
  return staticTeamLogos[team] ?? null;
}
