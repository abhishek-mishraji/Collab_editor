// Script to explore workarounds for the HuggingFace permissions issue

// Import necessary libraries
require('dotenv').config();
const axios = require('axios');

// Log environment variables
console.log('Environment check:');
Object.keys(process.env)
  .filter(key => key.startsWith('REACT_APP'))
  .forEach(key => {
    console.log(`${key}: ${process.env[key].substring(0, 5)}...`);
  });

async function main() {
  // First, let's try using the free libretranslate.de endpoint
  try {
    console.log('\n--- Testing LibreTranslate.de (No API key required) ---');
    const libreTranslateResponse = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: 'Hello, this is a test of the API.',
        source: 'en',
        target: 'es',
        format: 'text'
      }
    );
    console.log('LibreTranslate.de Response:', libreTranslateResponse.data);
    console.log('✓ LibreTranslate.de works without an API key!');
  } catch (error) {
    console.error('× LibreTranslate.de failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
  
  // Second, let's try a different free service that doesn't require API keys
  try {
    console.log('\n--- Testing Free Dictionary API ---');
    const dictResponse = await axios.get(
      'https://api.dictionaryapi.dev/api/v2/entries/en/hello'
    );
    console.log('Dictionary API Response:', 
      dictResponse.data[0].meanings[0].definitions[0].definition);
    console.log('✓ Dictionary API works without an API key!');
  } catch (error) {
    console.error('× Dictionary API failed:', error.message);
  }
  
  // Third, let's try a free fake data API
  try {
    console.log('\n--- Testing JSONPlaceholder API ---');
    const jsonResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    console.log('JSONPlaceholder Response:', jsonResponse.data);
    console.log('✓ JSONPlaceholder API works without an API key!');
  } catch (error) {
    console.error('× JSONPlaceholder API failed:', error.message);
  }
  
  console.log('\n--- Recommendations ---');
  console.log('Based on these tests, you have a few options:');
  console.log('1. Use LibreTranslate.de without an API key (may have rate limits)');
  console.log('2. Use the Dictionary API for simple word definitions');
  console.log('3. Generate mock responses on the client side');
  console.log('4. Create a new HuggingFace account and try a new API token');
}

// Run the test
main().catch(error => {
  console.error('Test failed:', error);
});
