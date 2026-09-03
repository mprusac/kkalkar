import { supabase } from "@/integrations/supabase/client";
import { resolveAssetUrl } from "@/lib/utils";

export type SeasonStatKey =
  | "points"
  | "rebounds"
  | "assists"
  | "steals"
  | "blocks"
  | "minutes"
  | "fg2_pct"
  | "fg3_pct"
  | "threes"
  | "def_rebounds"
  | "off_rebounds"
  | "double_doubles";

export interface SeasonStatField {
  key: SeasonStatKey;
  /** Title as shown in the "Top igrači" section */
  title: string;
  placeholder: string;
  /** "time" values are mm:ss, "pct" get a % suffix on display */
  kind: "number" | "time" | "pct";
}

export const SEASON_STAT_FIELDS: SeasonStatField[] = [
  { key: "points", title: "Poeni", placeholder: "npr. 11.4", kind: "number" },
  { key: "rebounds", title: "Skokovi", placeholder: "npr. 5.2", kind: "number" },
  { key: "assists", title: "Asistencije", placeholder: "npr. 4.1", kind: "number" },
  { key: "steals", title: "Ukradene lopte", placeholder: "npr. 1.8", kind: "number" },
  { key: "blocks", title: "Blokade", placeholder: "npr. 0.9", kind: "number" },
  { key: "minutes", title: "Minute", placeholder: "mm:ss (npr. 30:12)", kind: "time" },
  { key: "fg2_pct", title: "Šut za 2p %", placeholder: "npr. 58.2", kind: "pct" },
  { key: "fg3_pct", title: "Šut za 3p %", placeholder: "npr. 38.9", kind: "pct" },
  { key: "threes", title: "Trojke", placeholder: "npr. 52", kind: "number" },
  { key: "def_rebounds", title: "Obrambeni skokovi", placeholder: "npr. 4.8", kind: "number" },
  { key: "off_rebounds", title: "Skokovi u napadu", placeholder: "npr. 2.1", kind: "number" },
  { key: "double_doubles", title: "Double-double", placeholder: "npr. 4", kind: "number" },
];

export type SeasonStats = Partial<Record<SeasonStatKey, string>>;

export interface PublicPlayer {
  id: string;
  name: string;
  position: string;
  jerseyNumber: string;
  image: string;
  nationality: string;
  heightCm: number | null;
  birthDate: string | null; // ISO
  sofascoreLink: string | null;
  seasonStats: SeasonStats;
  sortOrder: number;
}

export function calcAge(birthDate?: string | null): number | null {
  if (!birthDate) return null;
  const d = new Date(birthDate);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age >= 0 && age < 120 ? age : null;
}

export function formatDMY(iso?: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d}.${m}.${y}.`;
}

const POSITION_ORDER: Record<string, number> = { bek: 0, krilo: 1, centar: 2 };

export async function fetchPublicPlayers(): Promise<PublicPlayer[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data) return [];
  const players = data.map((row: any) => ({
    id: row.id,
    name: row.name,
    position: row.position || "",
    jerseyNumber: row.jersey_number != null ? String(row.jersey_number) : "-",
    image: resolveAssetUrl(row.image_url) || "",
    nationality: (row.nationality || "").toUpperCase(),
    heightCm: row.height_cm ?? null,
    birthDate: row.birth_date ?? null,
    sofascoreLink: row.sofascore_link || null,
    seasonStats: (row.season_stats || {}) as SeasonStats,
    sortOrder: row.sort_order ?? 0,
  }));
  // Group by position: bekovi, krila, centri — keeping the admin sort order inside each group
  return players.sort((a, b) => {
    const pa = POSITION_ORDER[a.position.trim().toLowerCase()] ?? 99;
    const pb = POSITION_ORDER[b.position.trim().toLowerCase()] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.sortOrder - b.sortOrder;
  });
}

export interface TopEntry {
  rank: number;
  name: string;
  position: string;
  value: number | string;
  image?: string;
}

function numericValue(kind: SeasonStatField["kind"], raw: string): number | null {
  if (kind === "time") {
    const m = raw.match(/^(\d+):(\d{1,2})$/);
    if (m) return Number(m[1]) * 60 + Number(m[2]);
    const n = Number(raw.replace(",", "."));
    return Number.isFinite(n) ? n * 60 : null;
  }
  const n = Number(raw.replace("%", "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function displayValue(kind: SeasonStatField["kind"], raw: string): number | string {
  if (kind === "time") return raw;
  if (kind === "pct") return raw.endsWith("%") ? raw : `${raw}%`;
  const n = Number(raw.replace(",", "."));
  return Number.isFinite(n) ? n : raw;
}

export function buildTopCategories(
  players: PublicPlayer[],
): { title: string; data: TopEntry[] }[] {
  return SEASON_STAT_FIELDS.map((field) => {
    const rows = players
      .map((p) => {
        const raw = (p.seasonStats?.[field.key] ?? "").toString().trim();
        if (!raw) return null;
        const num = numericValue(field.kind, raw);
        if (num === null) return null;
        return { player: p, num, raw };
      })
      .filter(Boolean) as { player: PublicPlayer; num: number; raw: string }[];

    rows.sort((a, b) => b.num - a.num);

    return {
      title: field.title,
      data: rows.slice(0, 3).map((r, i) => ({
        rank: i + 1,
        name: r.player.name,
        position: r.player.position,
        value: displayValue(field.kind, r.raw),
        image: r.player.image || undefined,
      })),
    };
  });
}
