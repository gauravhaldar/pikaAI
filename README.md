# Pika AI

PikaG's intelligent agentic AI assistant powered by the ElevenLabs Conversational Agent widget.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory **(never commit this file)** with **ONLY** the ElevenLabs variables (the client no longer uses n8n):
   ```
   # ElevenLabs Agent credentials
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
   # Optional – choose a specific voice
   VITE_ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   ```
   ⚠️  If this is a public-facing frontend you should proxy the request through a backend or serverless function so the API key is not exposed in the browser.

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- Embedded ElevenLabs conversation widget (text + speech in/out)
- No custom chat logic required – the widget handles transcription, TTS, and conversation memory
- Clean, modern UI surrounding the widget

## How it Works

`src/App.jsx` loads the widget script from the ElevenLabs CDN and instantiates it:

```js
new window.ElevenLabsWidget({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
  agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
  voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID,
  container: document.getElementById('elevenlabs-widget-container'),
  mode: 'conversation'
});
```

The widget takes care of the conversation end-to-end. There is **no** n8n code or fallback logic in the client anymore.
# pikaAI
# pikaAI
