// Script to test the HuggingFace API
require('dotenv').config();
const { testHuggingFaceAPI } = require('./src/api/huggingFaceTest');

// Log all environment variables starting with REACT_APP
console.log('Environment variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('REACT_APP'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key].substring(0, 5)}...`);
  });

// Run the test
testHuggingFaceAPI()
  .then(success => {
    if (success) {
      console.log('HuggingFace API test completed successfully!');
    } else {
      console.log('HuggingFace API test failed. See errors above.');
    }
  })
  .catch(err => {
    console.error('Error running test:', err);
  });
