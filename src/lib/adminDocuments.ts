export const DOCUMENTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-documents`;

export type DocumentCategory = "poziv" | "radionica";

export interface ProjectDocument {
  id: string;
  title: string;
  description: string | null;
  doc_date: string; // YYYY-MM-DD
  category: DocumentCategory;
  file_url: string;
  storage_path?: string;
  sort_order: number;
}

export function formatDocDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${Number(d)}.${Number(m)}.${y}.`;
}

export async function fetchProjectDocuments(): Promise<ProjectDocument[]> {
  const res = await fetch(`${DOCUMENTS_URL}/list-public`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as ProjectDocument[];
  return Array.isArray(data) ? data : [];
}
