// This file tests if environment variables are being loaded correctly
console.log('HuggingFace Token available:', process.env.REACT_APP_HUGGINGFACE_TOKEN ? 'Yes' : 'No');
console.log('Token first few characters:', process.env.REACT_APP_HUGGINGFACE_TOKEN ? process.env.REACT_APP_HUGGINGFACE_TOKEN.substring(0, 5) : 'None');
