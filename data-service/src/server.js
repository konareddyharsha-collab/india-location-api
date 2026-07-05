const express = require("express");
const cors = require("cors");
const prisma = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Get all states
app.get("/states", async (req, res) => {
  try {
    const states = await prisma.state.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get districts by state ID
app.get("/states/:stateId/districts", async (req, res) => {
  try {
    const { stateId } = req.params;
    const districts = await prisma.district.findMany({
      where: { stateId: parseInt(stateId) },
      orderBy: { name: 'asc' }
    });
    res.json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get sub-districts by district ID
app.get("/districts/:districtId/subdistricts", async (req, res) => {
  try {
    const { districtId } = req.params;
    const subDistricts = await prisma.subDistrict.findMany({
      where: { districtId: parseInt(districtId) },
      orderBy: { name: 'asc' }
    });
    res.json(subDistricts);
  } catch (error) {
    console.error("Error fetching sub-districts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get villages by sub-district ID
app.get("/subdistricts/:subDistrictId/villages", async (req, res) => {
  try {
    const { subDistrictId } = req.params;
    const villages = await prisma.village.findMany({
      where: { subDistrictId: parseInt(subDistrictId) },
      orderBy: { name: 'asc' }
    });
    res.json(villages);
  } catch (error) {
    console.error("Error fetching villages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search villages by name
app.get("/villages/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const villages = await prisma.village.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive'
        }
      },
      include: {
        subDistrict: {
          include: {
            district: {
              include: {
                state: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' },
      take: 50 // Limit results
    });

    res.json(villages);
  } catch (error) {
    console.error("Error searching villages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "India Location API Running",
    endpoints: {
      states: "GET /states",
      districts: "GET /states/:stateId/districts",
      subDistricts: "GET /districts/:districtId/subdistricts",
      villages: "GET /subdistricts/:subDistrictId/villages",
      search: "GET /villages/search?q=village_name"
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});