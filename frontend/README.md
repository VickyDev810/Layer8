# Secure LLM Query Frontend

A clean, minimalist dark-mode frontend built with Svelte, TailwindCSS, and Vite for the NLP Data Anonymizer API service.

## 📋 Overview

This frontend provides a user-friendly interface for the anonymization API service. It:

1. Takes user queries and sends them to the API
2. The API handles all anonymization, LLM interaction, and deanonymization
3. Displays only the final deanonymized response to the user
4. Uses a simple, responsive chat-style interface

## 🔧 Installation

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Make sure the API service is running at http://localhost:8000.

## 🚀 Running the Frontend

Start the development server:

```bash
npm run dev
```

This will launch the frontend at http://localhost:5173 by default.

## 🏗️ Building for Production

Build the frontend for production:

```bash
npm run build
```

The build output will be in the `dist` directory, which can be deployed to any static hosting service.

## 🔧 Configuration

The frontend is pre-configured to use the API service running at http://localhost:8000. If you need to change this, update the `API_URL` constant in `src/App.svelte`.

By default, the frontend uses the "gemini" LLM provider. This can also be changed in the same file if needed.

## 📱 Features

- **Dark Mode**: Modern dark theme for reduced eye strain
- **Responsive Design**: Works on both desktop and mobile devices
- **Simple Interface**: Chat-style interface familiar to users
- **Error Handling**: Shows useful error messages if the API is unavailable
- **Keyboard Shortcuts**: Send messages with Enter (Shift+Enter for new line)

## 🔒 Privacy

This frontend works with the secure API service to ensure sensitive information is anonymized before being sent to LLM services. The original sensitive data never leaves your server.
