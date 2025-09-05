/**
 * Integration module for replacing HuggingFace with Gemini AI
 * 
 * This file provides a drop-in replacement for existing HuggingFace API calls
 */

// Import the new Gemini implementation
import { callAIApi, editTextWithAI } from './aiApi';

/**
 * Main API function that maintains compatibility with previous HuggingFace implementation
 * This allows for a smooth transition without changing other parts of the application
 */
export const processText = async (text, options = {}) => {
  console.log('Processing text with Gemini API:', text.substring(0, 50) + '...');
  
  try {
    const { operation = 'default', instruction = '' } = options;
    
    // Handle different operations
    switch (operation) {
      case 'edit':
        return await editTextWithAI(text, instruction || 'Edit and improve');
        
      case 'shorten':
        const shortenPrompt = `Shorten the following text: ${text}`;
        const shortenResult = await callAIApi(shortenPrompt);
        return shortenResult.text || shortenResult.editSuggestion;
        
      case 'lengthen':
        const lengthenPrompt = `Expand and elaborate on the following text: ${text}`;
        const lengthenResult = await callAIApi(lengthenPrompt);
        return lengthenResult.text || lengthenResult.editSuggestion;
        
      case 'convertToTable':
        const tablePrompt = `Convert the following text to a table format: ${text}`;
        const tableResult = await callAIApi(tablePrompt);
        return tableResult.text || tableResult.editSuggestion;
        
      case 'default':
      default:
        // If no specific operation, just process the text with AI
        const result = await callAIApi(text);
        return result.text;
    }
  } catch (error) {
    console.error('Error processing text with Gemini API:', error);
    return `Error: Unable to process text. ${error.message}`;
  }
};

/**
 * Function to perform batch operations
 */
export const processBatch = async (items, operation, instruction) => {
  const results = [];
  
  for (const item of items) {
    try {
      const result = await processText(item, { operation, instruction });
      results.push(result);
    } catch (error) {
      console.error('Error in batch processing:', error);
      results.push(`Error: ${error.message}`);
    }
  }
  
  return results;
};

/**
 * Check if the AI service is available
 */
export const checkAIServiceAvailability = async () => {
  try {
    // Simple ping to check if Gemini API is responsive
    const result = await callAIApi('Hello');
    return { available: true, provider: 'Gemini AI' };
  } catch (error) {
    console.error('AI service unavailable:', error);
    return { available: false, error: error.message };
  }
};

// Export the direct Gemini functions as well
export { callAIApi, editTextWithAI };
