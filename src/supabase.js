import { createClient } from "@supabase/supabase-js"

const supabaseKey = "sb_publishable_gFH7d5DZk77IcMsa7obQ-g_YhURBEWi"
const supabaseUrl = "https://maxrlrucikvemarnrgdj.supabase.co"

export const supabase = createClient(supabaseUrl, supabaseKey)