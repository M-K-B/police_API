import { createClient } from "../deps.ts";
import "jsr:@std/dotenv/load";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_KEY")!;

export const supabase = createClient(supabaseUrl, supabaseKey);
