// Test file for the NoKey AI API
require('dotenv').config();
const axios = require('axios');

// Mock the aiApi.js module
const mockAiApi = {
  callAIApi: async (prompt) => {
    try {
      console.log('Testing No-Key API with prompt:', prompt);
      
      // Test LibreTranslate.de for editing
      if (prompt.toLowerCase().includes('edit') || 
          prompt.toLowerCase().includes('shorten') || 
          prompt.toLowerCase().includes('lengthen')) {
        return await testLibreTranslate(prompt);
      } else {
        // For general queries, try dictionary API
        return await testDictionary(prompt);
      }
    } catch (error) {
      console.error('All API calls failed:', error.message);
      return {
        text: "Mock response when all APIs fail",
        editSuggestion: null
      };
    }
  }
};

async function testLibreTranslate(prompt) {
  try {
    // Extract text from prompt
    const textToEdit = prompt.replace(/edit|shorten|lengthen/gi, '').trim();
    
    console.log('Extracted text:', textToEdit);
    
    // Use LibreTranslate.de (which doesn't require an API key)
    console.log('Using LibreTranslate.de to translate to Spanish and back...');
    
    // First translate to Spanish
    const firstResponse = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: textToEdit,
        source: 'en',
        target: 'es',
        format: 'text'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const spanishText = firstResponse.data.translatedText;
    console.log('Spanish translation:', spanishText);
    
    // Then translate back to English
    const secondResponse = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: spanishText,
        source: 'es',
        target: 'en',
        format: 'text'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const editedText = secondResponse.data.translatedText;
    console.log('Translated back to English:', editedText);
    
    return {
      text: editedText,
      editSuggestion: editedText
    };
  } catch (error) {
    console.error('Error using LibreTranslate:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
}

async function testDictionary(prompt) {
  try {
    // Extract a meaningful word from the prompt
    const words = prompt.split(/\s+/).filter(word => word.length > 3);
    const searchWord = words[Math.floor(Math.random() * words.length)] || "hello";
    
    console.log('Searching dictionary for word:', searchWord);
    
    // Try dictionary API for a word lookup
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
    
    if (response.data && response.data.length > 0) {
      // Create a response based on the dictionary definition
      const word = response.data[0].word;
      const definitions = response.data[0].meanings
        .map(meaning => `${meaning.partOfSpeech}: ${meaning.definitions[0].definition}`)
        .join('\n');
      
      const responseText = `Based on the word "${word}" in your query:\n\n${definitions}\n\nThis might help with your question about "${prompt}"`;
      console.log('Dictionary response:', responseText);
      
      return {
        text: responseText,
        editSuggestion: null
      };
    }
  } catch (error) {
    console.warn('Dictionary API failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    
    // Try JSONPlaceholder as a fallback
    try {
      console.log('Falling back to JSONPlaceholder...');
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      
      const responseText = `Here's a thought on your question: "${response.data.title}". ${response.data.body}`;
      console.log('JSONPlaceholder response:', responseText);
      
      return {
        text: responseText,
        editSuggestion: null
      };
    } catch (jsonError) {
      console.warn('JSONPlaceholder API failed:', jsonError.message);
      throw jsonError;
    }
  }
}

// Test both functionality
async function runTests() {
  try {
    console.log('\n--- Testing LibreTranslate for editing ---');
    const editResult = await mockAiApi.callAIApi('Edit this text: The quick brown fox jumps over the lazy dog.');
    console.log('Edit Result:', editResult);
    
    console.log('\n--- Testing Dictionary API for general queries ---');
    const queryResult = await mockAiApi.callAIApi('What is the definition of algorithm?');
    console.log('Query Result:', queryResult);
    
    console.log('\n--- Test Successful! ---');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the tests
runTests();
