import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PRIVATE_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PRIVATE_SUPABASE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
