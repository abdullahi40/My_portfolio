const { createClient } = require("@supabase/supabase-js");

const env = require("dotenv");

env.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;
