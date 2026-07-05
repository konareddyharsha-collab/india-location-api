require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createUser() {
  await mongoose.connect(process.env.MONGODB_URI);

  const hash = await bcrypt.hash("123456", 10);

  await User.create({
    email: "test@gmail.com",
    passwordHash: hash,
  });

  console.log("User created");
  process.exit();
}

createUser();