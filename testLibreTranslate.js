// Script to test LibreTranslate API
require('dotenv').config();
const { testLibreTranslate } = require('./src/api/libreTranslateTest');

// Run the test
testLibreTranslate()
  .then(success => {
    if (success) {
      console.log('LibreTranslate API test completed successfully!');
    } else {
      console.log('LibreTranslate API test failed. See errors above.');
    }
  })
  .catch(err => {
    console.error('Error running test:', err);
  });
