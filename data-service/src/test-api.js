const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing India Location API...\n');

    // Test states endpoint
    console.log('1. Testing /states endpoint:');
    const statesResponse = await axios.get('http://localhost:5000/states');
    console.log(`Found ${statesResponse.data.length} states`);
    console.log('First 5 states:', statesResponse.data.slice(0, 5));

    if (statesResponse.data.length > 0) {
      const firstState = statesResponse.data[0];

      // Test districts endpoint
      console.log(`\n2. Testing /states/${firstState.id}/districts endpoint:`);
      const districtsResponse = await axios.get(`http://localhost:5000/states/${firstState.id}/districts`);
      console.log(`Found ${districtsResponse.data.length} districts in ${firstState.name}`);
      console.log('First 3 districts:', districtsResponse.data.slice(0, 3));

      if (districtsResponse.data.length > 0) {
        const firstDistrict = districtsResponse.data[0];

        // Test sub-districts endpoint
        console.log(`\n3. Testing /districts/${firstDistrict.id}/subdistricts endpoint:`);
        const subDistrictsResponse = await axios.get(`http://localhost:5000/districts/${firstDistrict.id}/subdistricts`);
        console.log(`Found ${subDistrictsResponse.data.length} sub-districts in ${firstDistrict.name}`);
        console.log('First 3 sub-districts:', subDistrictsResponse.data.slice(0, 3));

        if (subDistrictsResponse.data.length > 0) {
          const firstSubDistrict = subDistrictsResponse.data[0];

          // Test villages endpoint
          console.log(`\n4. Testing /subdistricts/${firstSubDistrict.id}/villages endpoint:`);
          const villagesResponse = await axios.get(`http://localhost:5000/subdistricts/${firstSubDistrict.id}/villages`);
          console.log(`Found ${villagesResponse.data.length} villages in ${firstSubDistrict.name}`);
          console.log('First 5 villages:', villagesResponse.data.slice(0, 5));
        }
      }
    }

    // Test search endpoint
    console.log('\n5. Testing /villages/search endpoint:');
    const searchResponse = await axios.get('http://localhost:5000/villages/search?q=delhi');
    console.log(`Found ${searchResponse.data.length} villages matching 'delhi'`);
    if (searchResponse.data.length > 0) {
      console.log('First result:', searchResponse.data[0]);
    }

    console.log('\n✅ All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();