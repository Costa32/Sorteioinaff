export interface User {
  id: string; // O Supabase geralmente usa UUIDs para IDs
  name: string;
  last_name: string;
  cpf: string;
  email: string;
  other_email?: string | null; // Opcional
  cellphone?: string | null;
  whatsapp?: string | null;
  tel?: string | null;
  state?: string | null;
  city?: string | null;
  occupation?: string | null;
  linked_institution?: string | null;
  institution?: string | null;
  job_position?: string | null;
  created_at?: string; // Supabase adiciona essa coluna automaticamente
}