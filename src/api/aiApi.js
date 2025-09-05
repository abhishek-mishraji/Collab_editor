/**
 * AI API Service with Gemini integration
 * Previously used HuggingFace, now updated to use Google's Gemini AI
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import axios from 'axios';

// Main API function
export const callAIApi = async (prompt) => {
  console.log('Calling AI API with prompt:', prompt);
  
  // First check if the Gemini API key is available
  const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  if (geminiApiKey) {
    console.log('Gemini API key available, trying Gemini API');
    
    try {
      // Try using the Gemini API
      return await callGeminiApi(prompt, geminiApiKey);
    } catch (error) {
      console.error('Gemini API failed:', error.message);
      console.log('External API failed, using mock implementation');
      return callMockAIApi(prompt);
    }
  } else {
    console.warn('No Gemini API key found, using mock implementation');
    return callMockAIApi(prompt);
  }
};

// Implementation using Google's Gemini API
const callGeminiApi = async (prompt, apiKey) => {
  try {
    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use the correct model name based on the available models
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    
    // Configure safety settings - set to allow most content with reasonable safeguards
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
    
    // Determine if this is an editing task
    const isEditing = prompt.toLowerCase().includes('edit') || 
                     prompt.toLowerCase().includes('shorten') || 
                     prompt.toLowerCase().includes('lengthen');
    
    // For editing tasks, add specific instructions
    let enhancedPrompt = prompt;
    if (isEditing) {
      enhancedPrompt = `${prompt} 
      Instructions: 
      1. Carefully process the text provided
      2. Make the requested changes (edit/shorten/lengthen)
      3. Return ONLY the modified text without any explanations or additional text
      4. Do not add phrases like "Here's the edited text" or "Here's the result"`;
    }
    
    // Generate content with the prompt
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: enhancedPrompt }] }],
      safetySettings,
      generationConfig: {
        temperature: isEditing ? 0.2 : 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
    });
    
    const response = result.response;
    const responseText = response.text();
    
    console.log('Gemini API response received');
    
    return {
      text: responseText,
      editSuggestion: isEditing ? responseText : null
    };
  } catch (error) {
    console.error('Error using Gemini API:', error);
    throw error;
  }
};

/**
 * Function to edit text using AI
 */
export async function editTextWithAI(text, instruction) {
  console.log('Editing text with AI:', text.substring(0, 50) + '...');
  console.log('Instruction:', instruction);
  
  try {
    // Create a prompt that combines the text and instruction
    const prompt = `${instruction} the following text: ${text}`;
    
    // Call the main API function
    const result = await callAIApi(prompt);
    
    return result.text || result.editSuggestion || "I've made some improvements to your text.";
  } catch (error) {
    console.error('Error editing text with AI:', error.message);
    
    // Simple fallback when API calls fail
    return simulateEditResponse(text);
  }
}

// Helper function to extract text from a prompt
function extractTextFromPrompt(prompt) {
  const match = prompt.match(/text:\s*(.*?)$/s);
  if (match && match[1]) {
    return match[1].trim();
  }
  
  // Try to extract anything after a colon
  const colonMatch = prompt.match(/:\s*(.*?)$/s);
  if (colonMatch && colonMatch[1]) {
    return colonMatch[1].trim();
  }
  
  // If no clear text is found, use the whole prompt except for command words
  return prompt
    .replace(/shorten|lengthen|edit|convert|to table|the following/gi, '')
    .replace(/text/gi, '')
    .trim();
}

// Fallback mock implementation
const callMockAIApi = async (prompt) => {
  console.log('Using mock AI implementation for prompt:', prompt);
  
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response based on prompt
  let response = {
    text: 'I\'m here to help you with your document. You can ask me to edit, format, or transform your text in various ways.',
    editSuggestion: null
  };
  
  if (prompt.toLowerCase().includes('shorten')) {
    response.editSuggestion = simulateShortenResponse(prompt);
  } else if (prompt.toLowerCase().includes('lengthen')) {
    response.editSuggestion = simulateLengthenResponse(prompt);
  } else if (prompt.toLowerCase().includes('table')) {
    response.editSuggestion = simulateTableResponse(prompt);
  } else if (prompt.toLowerCase().includes('edit')) {
    response.editSuggestion = simulateEditResponse(extractTextFromPrompt(prompt));
  }
  
  return response;
};

// Mock response generators
function simulateShortenResponse(prompt) {
  const textToShorten = extractTextFromPrompt(prompt);
  if (!textToShorten) return 'I need some text to shorten.';
  
  // Simple logic to shorten text
  const words = textToShorten.split(' ');
  if (words.length <= 3) return textToShorten;
  
  const shortened = words.slice(0, Math.ceil(words.length * 0.6)).join(' ');
  return shortened;
}

function simulateLengthenResponse(prompt) {
  const textToLengthen = extractTextFromPrompt(prompt);
  if (!textToLengthen) return 'I need some text to expand.';
  
  // Simple logic to lengthen text
  return textToLengthen + ' Furthermore, this additional context helps to clarify the meaning and provides more detail for the reader to understand the full scope of the topic being discussed.';
}

function simulateTableResponse(prompt) {
  const textToConvert = extractTextFromPrompt(prompt);
  if (!textToConvert) return 'I need some text to convert to a table.';
  
  // Create a simple table from text
  const lines = textToConvert.split('.');
  let tableHtml = '<table border="1" cellpadding="5"><tr><th>Item</th><th>Description</th></tr>';
  
  lines.forEach((line, index) => {
    if (line.trim()) {
      tableHtml += `<tr><td>Item ${index + 1}</td><td>${line.trim()}</td></tr>`;
    }
  });
  
  tableHtml += '</table>';
  return tableHtml;
}

function simulateEditResponse(text) {
  if (!text) return 'I need some text to edit.';
  
  // Simple edit: fix capitalization and add some polish
  let edited = text.trim();
  edited = edited.charAt(0).toUpperCase() + edited.slice(1);
  
  if (!edited.endsWith('.') && !edited.endsWith('!') && !edited.endsWith('?')) {
    edited += '.';
  }
  
  // Replace common words with more sophisticated alternatives
  edited = edited
    .replace(/good/g, 'excellent')
    .replace(/bad/g, 'problematic')
    .replace(/big/g, 'substantial');
    
  return edited;
}
