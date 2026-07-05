require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkStats() {
  try {
    const states = await prisma.state.count();
    const districts = await prisma.district.count();
    const subDistricts = await prisma.subDistrict.count();
    const villages = await prisma.village.count();

    console.log("✅ Database Statistics:");
    console.log(`States: ${states}`);
    console.log(`Districts: ${districts}`);
    console.log(`Sub-Districts: ${subDistricts}`);
    console.log(`Villages: ${villages}`);
    console.log("\n✅ Project Status: COMPLETED");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStats();