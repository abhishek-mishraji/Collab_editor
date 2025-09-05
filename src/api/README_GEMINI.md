# Google Gemini AI Implementation

This implementation replaces the previous HuggingFace-based AI functionality with Google's Gemini AI.

## Files Overview

1. `aiApi.js` - The core implementation using Google's Gemini API
2. `aiApiIntegration.js` - A compatibility layer for easy transition from HuggingFace
3. `GEMINI_DOCS.md` - Detailed documentation about the implementation

## Setup Instructions

1. Ensure you have the Gemini API key in your `.env` file:

   ```
   REACT_APP_GEMINI_API_KEY=AIzaSyBd-ayzz7tJOMO1wlXpgdsAOrsfy4ascQY
   ```

2. Make sure the Gemini SDK is installed:

   ```
   npm install @google/generative-ai --legacy-peer-deps
   ```

3. Replace any imports from the previous HuggingFace implementation with imports from the new integration file:

   ```javascript
   // Old import
   import { processText } from "./api/aiApi";

   // New import
   import { processText } from "./api/aiApiIntegration";
   ```

## Testing the Implementation

You can manually test the implementation by using it in your application. The implementation includes robust fallback mechanisms that will use a mock implementation if the API is unavailable.

## Configuration

This will run several tests, including:

- Simple prompt to Gemini AI
- Text editing functionality
- Text shortening functionality
- Error handling and fallback mechanism

## Features

- **Direct API Access**: Uses the official Google Generative AI SDK
- **Robust Fallback**: Falls back to mock implementation if API is unavailable
- **Compatibility Layer**: Drop-in replacement for previous HuggingFace implementation
- **Advanced Safety Settings**: Configurable content safety thresholds
- **Specialized Text Editing**: Optimized for editing, shortening, and lengthening tasks

## Usage Examples

### Basic AI Interaction

```javascript
import { callAIApi } from "./api/aiApi_gemini";

// Ask a question
const response = await callAIApi("What is artificial intelligence?");
console.log(response.text);
```

### Text Editing

```javascript
import { editTextWithAI } from "./api/aiApi_gemini";

// Edit text
const originalText = "the quick brown fox jumps over the lazy dog.";
const editedText = await editTextWithAI(originalText, "Edit and improve");
console.log(editedText);
```

### Using the Compatibility Layer

```javascript
import { processText } from "./api/aiApiIntegration";

// Shorten text
const originalText = "This is a long text that needs to be shortened...";
const shortenedText = await processText(originalText, {
  operation: "shorten",
});
console.log(shortenedText);
```
