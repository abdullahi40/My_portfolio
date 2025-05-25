const bcrypt = require("bcrypt");

async function hashPassword() {
  const password = "HOYObarako@6683";
  const saltRounds = 10; // Number of rounds for salting

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password", hashedPassword);
  } catch (err) {
    console.error("Error hashing password", err);
  }
}

hashPassword();
