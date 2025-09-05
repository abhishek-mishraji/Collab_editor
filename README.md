# Collaborative Editor with AI Integration

A real-time collaborative rich text editor with AI integration that allows users to interact with AI for text editing and enhancements.

## Features

- Rich text editor using Tiptap
- AI-powered text editing (shorten, lengthen, edit, convert to table)
- Chat interface for interacting with AI
- Selection-based AI suggestions
- Preview mode for comparing original and AI-suggested edits

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

## AI Integration

This application uses a multi-layered approach to AI-powered text editing:

1. **HuggingFace Inference Client (Primary)**: Uses the official `@huggingface/inference` client to access AI models
2. **Direct API Fallback**: Falls back to direct API calls if the client encounters issues
3. **Built-in processing logic**: Uses JavaScript for text transformations when external services are unavailable

### Using HuggingFace (Enhanced AI)

For the best AI capabilities:

1. Sign up for a free account at [HuggingFace](https://huggingface.co/)
2. Generate an API token in your HuggingFace settings
3. Add the token to your `.env` file: `REACT_APP_HUGGINGFACE_TOKEN=your_token_here`

The application has robust fallback mechanisms:

- First tries the HuggingFace Inference client with summarization models
- If that fails, tries direct API calls to multiple model endpoints
- Finally falls back to built-in processing that works without external services

No API key is required - the app will use smart built-in fallback logic if no API keys are available.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
