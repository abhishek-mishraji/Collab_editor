// Script to test different HuggingFace API models
require('dotenv').config();
const { testDifferentModels } = require('./src/api/huggingFaceModelTest');

// Log all environment variables starting with REACT_APP
console.log('Environment variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('REACT_APP'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key].substring(0, 5)}...`);
  });

// Run the test
testDifferentModels()
  .then(success => {
    if (success) {
      console.log('\nTest completed! Check the results above to see which models worked.');
    } else {
      console.log('\nTest failed. See errors above.');
    }
  })
  .catch(err => {
    console.error('Error running test:', err);
  });
