import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vkrxbvxitrgjixovhsww.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcnhidnhpdHJnaml4b3Zoc3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MjIxNzcsImV4cCI6MjA2MzM5ODE3N30.XnqsVZg0nIUO4E9p_FwlDUXfz0gr5tXZcXQ0SQv2928";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
