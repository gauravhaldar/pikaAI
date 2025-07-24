import React from 'react';
import ElevenLabsConversation from './components/ElevenLabsConversation.jsx';

export default function App() {
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  return (
    <div className="app-container">
      <canvas id="canvasOne" className="background-canvas"></canvas>
      <div className="main-content">
        <div className="header-section">
          {/* Futuristic, animated “Jarvis-style” logo */}
          <div className="logo-container">
            <div id="JarvisHood">
              <div className="square">
                <span className="circle"></span>
                <span className="circle"></span>
                <span className="circle"></span>
              </div>
            </div>
          </div>
          <h1 className="main-title">Pika AI</h1>
          <p className="subtitle">Powered by Haldar AI & IT Pvt. Ltd.</p>
        </div>

        {/* ElevenLabs Conversational Agent */}
        <ElevenLabsConversation agentId={agentId} />
      </div>
    </div>
  );
}
