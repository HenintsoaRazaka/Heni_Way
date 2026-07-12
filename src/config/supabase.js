const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseService = createClient(supabaseUrl, supabaseServiceRoleKey, {
    autoRefreshToken: false,
    persistSession: false
});

module.exports = {
    supabase,
    supabaseService
};