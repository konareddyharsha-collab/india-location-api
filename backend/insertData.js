require('dotenv').config();

const mongoose = require('mongoose');
const Location = require('./src/models/locationModel');

const sampleData = [
  { state: 'Maharashtra', district: 'Nandurbar', subDistrict: 'Akkalkuwa', village: 'Manibeli', code: '525002' },
  { state: 'Maharashtra', district: 'Nandurbar', subDistrict: 'Akkalkuwa', village: 'Dhankhedi', code: '525003' },
  { state: 'Maharashtra', district: 'Nandurbar', subDistrict: 'Akkalkuwa', village: 'Chimalkhadi', code: '525004' },
  { state: 'Maharashtra', district: 'Nandurbar', subDistrict: 'Akkalkuwa', village: 'Sinduri', code: '525005' },
  { state: 'Andhra Pradesh', district: 'Nellore', subDistrict: 'Kavali', village: 'Kavali', code: '600001' },
  { state: 'Telangana', district: 'Hyderabad', subDistrict: 'Rajendranagar', village: 'Gachibowli', code: '700001' },
];

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/village-api-project';

async function seedData() {
  try {
    await mongoose.connect(mongoUri);
    console.log('DB connected');

    // Clear existing data
    await Location.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const inserted = await Location.insertMany(sampleData);
    console.log(`Inserted ${inserted.length} location records`);

    console.log('Sample data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seedData();