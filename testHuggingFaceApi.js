// Test script for HuggingFace implementation
require('dotenv').config();
const { callAIApi, editTextWithAI } = require('./src/api/aiApi');

async function runTests() {
  try {
    console.log('REACT_APP_HUGGINGFACE_TOKEN available:', !!process.env.REACT_APP_HUGGINGFACE_TOKEN);
    console.log('First 5 chars of token:', process.env.REACT_APP_HUGGINGFACE_TOKEN ? process.env.REACT_APP_HUGGINGFACE_TOKEN.substring(0, 5) : 'none');
    
    console.log('\n--- Testing general query with HuggingFace ---');
    const queryResult = await callAIApi('What is the best way to learn programming?');
    console.log('Query Result:', queryResult);
    
    console.log('\n--- Testing text editing with HuggingFace ---');
    const editResult = await callAIApi('Edit this text: The quick brown fox jumps over the lazy dog.');
    console.log('Edit Result:', editResult);
    
    console.log('\n--- Testing direct edit function ---');
    const directEditResult = await editTextWithAI('The quick brown fox jumps over the lazy dog.', 'Improve');
    console.log('Direct Edit Result:', directEditResult);
    
    console.log('\n--- Tests Completed Successfully! ---');
  } catch (error) {
    console.error('Tests failed:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the tests
runTests();
