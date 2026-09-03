import { supabase } from "@/integrations/supabase/client";
import { resolveAssetUrl } from "@/lib/utils";

export interface GalleryEvent {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  description: string;
  coverImage: string;
  images: string[];
}

export async function fetchGalleryEvents(): Promise<GalleryEvent[]> {
  const { data, error } = await supabase
    .from("galleries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row) => {
    const images = (row.images || []).map((u: string) => resolveAssetUrl(u));
    return {
      id: row.id,
      homeTeam: row.title,
      awayTeam: "",
      date: row.date,
      description: "",
      coverImage: resolveAssetUrl(row.cover_image) || images[0] || "",
      images,
    };
  });
}
