require("dotenv").config();
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const prisma = require("./config/db");

async function readExcelFile(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
}

async function getAllExcelFiles() {
  const datasetDir = path.join(__dirname, "..", "..", "dataset");
  const files = fs.readdirSync(datasetDir);
  return files.filter(file => file.endsWith('.xls') || file.endsWith('.xlsx') || file.endsWith('.ods'));
}

async function seedDatabase() {
  try {
    const files = await getAllExcelFiles();
    console.log(`Found ${files.length} Excel files to process`);

    const statesMap = new Map();
    const districtsMap = new Map();
    const subDistrictsMap = new Map();

    for (const file of files) {
      console.log(`\nProcessing ${file}...`);
      const filePath = path.join(__dirname, "..", "..", "dataset", file);

      try {
        const data = await readExcelFile(filePath);
        console.log(`Found ${data.length} rows in ${file}`);

        let processedRows = 0;

        for (const row of data) {
          try {
            // Skip header rows or invalid data
            if (!row['MDDS STC'] || !row['STATE NAME']) continue;

            const stateCode = row['MDDS STC'].toString();
            const stateName = row['STATE NAME'].trim();
            const districtCode = row['MDDS DTC']?.toString();
            const districtName = row['DISTRICT NAME']?.trim();
            const subDistrictCode = row['MDDS Sub_DT']?.toString();
            const subDistrictName = row['SUB-DISTRICT NAME']?.trim();
            const villageCode = row['MDDS PLCN']?.toString();
            const villageName = row['Area Name']?.trim();

            // Process State
            if (!statesMap.has(stateCode)) {
              let state = await prisma.state.findFirst({
                where: { name: stateName }
              });

              if (!state) {
                state = await prisma.state.create({
                  data: { name: stateName }
                });
                console.log(`Created state: ${stateName}`);
              }

              statesMap.set(stateCode, state);
            }

            const state = statesMap.get(stateCode);

            // Process District
            if (districtCode && districtName && districtCode !== '000') {
              const districtKey = `${stateCode}-${districtCode}`;

              if (!districtsMap.has(districtKey)) {
                let district = await prisma.district.findFirst({
                  where: {
                    name: districtName,
                    stateId: state.id
                  }
                });

                if (!district) {
                  district = await prisma.district.create({
                    data: {
                      name: districtName,
                      stateId: state.id
                    }
                  });
                }

                districtsMap.set(districtKey, district);
              }
            }

            const district = districtsMap.get(`${stateCode}-${districtCode}`);

            // Process Sub-District
            if (subDistrictCode && subDistrictName && subDistrictCode !== '00000' && district) {
              const subDistrictKey = `${stateCode}-${districtCode}-${subDistrictCode}`;

              if (!subDistrictsMap.has(subDistrictKey)) {
                let subDistrict = await prisma.subDistrict.findFirst({
                  where: {
                    name: subDistrictName,
                    districtId: district.id
                  }
                });

                if (!subDistrict) {
                  subDistrict = await prisma.subDistrict.create({
                    data: {
                      name: subDistrictName,
                      districtId: district.id
                    }
                  });
                }

                subDistrictsMap.set(subDistrictKey, subDistrict);
              }
            }

            const subDistrict = subDistrictsMap.get(`${stateCode}-${districtCode}-${subDistrictCode}`);

            // Process Village
            if (villageCode && villageName && villageCode !== '000000' && subDistrict) {
              const existingVillage = await prisma.village.findFirst({
                where: {
                  name: villageName,
                  subDistrictId: subDistrict.id
                }
              });

              if (!existingVillage) {
                await prisma.village.create({
                  data: {
                    name: villageName,
                    subDistrictId: subDistrict.id
                  }
                });
              }
            }

            processedRows++;
            if (processedRows % 1000 === 0) {
              console.log(`Processed ${processedRows} rows...`);
            }

          } catch (rowError) {
            console.error(`Error processing row:`, row, rowError);
          }
        }

        console.log(`Completed processing ${file}`);

      } catch (fileError) {
        console.error(`Error processing file ${file}:`, fileError);
      }
    }

    console.log("\nDatabase seeding completed successfully!");

    // Print some statistics
    const stateCount = await prisma.state.count();
    const districtCount = await prisma.district.count();
    const subDistrictCount = await prisma.subDistrict.count();
    const villageCount = await prisma.village.count();

    console.log(`States: ${stateCount}`);
    console.log(`Districts: ${districtCount}`);
    console.log(`Sub-Districts: ${subDistrictCount}`);
    console.log(`Villages: ${villageCount}`);

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();