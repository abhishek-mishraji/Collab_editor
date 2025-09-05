// Test script for the final robust API implementation
require('dotenv').config();
const { callAIApi } = require('./src/api/aiApi');

async function runTests() {
  try {
    console.log('--- Testing Edit Function ---');
    const editResult = await callAIApi('Edit this text: The quick brown fox jumps over the lazy dog.');
    console.log('Edit Result:', editResult);

    console.log('\n--- Testing General Query ---');
    const queryResult = await callAIApi('What is the best way to learn programming?');
    console.log('Query Result:', queryResult);

    console.log('\n--- Tests Complete ---');
    console.log('Test completed successfully with the most robust implementation!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests();
