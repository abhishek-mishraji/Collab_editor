// Test script for the final API implementation
require('dotenv').config();
const { callAIApi, editTextWithAI } = require('./src/api/aiApi_final');

async function runTests() {
  try {
    console.log('\n--- Testing general query ---');
    const queryResult = await callAIApi('What is the definition of algorithm?');
    console.log('Query Result:', queryResult);
    
    console.log('\n--- Testing text editing ---');
    const editResult = await callAIApi('Edit this text: The quick brown fox jumps over the lazy dog.');
    console.log('Edit Result:', editResult);
    
    console.log('\n--- Testing text shortening ---');
    const shortenResult = await callAIApi('Shorten this text: The quick brown fox jumps over the lazy dog and then continues on a very long journey through the forest where it encounters many different animals and has various adventures that are quite interesting.');
    console.log('Shorten Result:', shortenResult);
    
    console.log('\n--- Testing text lengthening ---');
    const lengthenResult = await callAIApi('Lengthen this text: The quick brown fox.');
    console.log('Lengthen Result:', lengthenResult);
    
    console.log('\n--- Testing table conversion ---');
    const tableResult = await callAIApi('Convert to table: First item. Second item. Third item.');
    console.log('Table Result:', tableResult);
    
    console.log('\n--- Testing editTextWithAI function ---');
    const directEditResult = await editTextWithAI('The quick brown fox jumps over the lazy dog.', 'Improve');
    console.log('Direct Edit Result:', directEditResult);
    
    console.log('\n--- Tests Completed Successfully! ---');
  } catch (error) {
    console.error('Tests failed:', error);
  }
}

// Run the tests
runTests();
