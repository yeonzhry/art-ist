// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yvukoioliuqlwasfkops.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dWtvaW9saXVxbHdhc2Zrb3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTg4NDMsImV4cCI6MjA3ODUzNDg0M30.TlZaOlZOiXsnwUUD7uJi-4I1PygcYOSSykDP0_2eGxk"

export const supabase = createClient(supabaseUrl, supabaseKey)
