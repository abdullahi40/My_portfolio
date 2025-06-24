require("dotenv").config(); // VERY IMPORTANT

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const testFetch = async () => {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    console.error("❌ ERROR:", error.message);
  } else {
    console.log("✅ SUCCESS: Data from blogs table:", data);
  }
};

testFetch();
