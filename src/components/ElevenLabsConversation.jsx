import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Conversation } from '@11labs/client';
import './ElevenLabsConversation.css'; // Import the new styles

/**
 * Icons
 */
const MicIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
    </svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
);


/**
 * ElevenLabsConversation
 * ----------------------
 * Simple React component that starts/stops a voice conversation with an
 * ElevenLabs Conversational AI agent. It uses the official browser SDK
 * `@elevenlabs/client`, so all Web-Socket glue and audio handling is done
 * for us behind the scenes.
 *
 * Props
 *   agentId (string) – required – ID of the agent created in the ElevenLabs
 *     dashboard. If the agent is private you must expose a signedUrl instead
 *     (see README).
 */
export default function ElevenLabsConversation({ agentId }) {
    const [conv, setConv] = useState(null);
    const [connected, setConnected] = useState(false);
    const [agentMode, setAgentMode] = useState('idle');
    const [error, setError] = useState(null);

    const isPulsing = connected && (agentMode === 'listening' || agentMode === 'speaking');

    const toggleConversation = useCallback(async () => {
        if (connected) {
            // Stop the conversation
            try {
                if (conv) {
                    await conv.endSession();
                }
            } finally {
                setConv(null);
                setConnected(false);
                setAgentMode('idle');
            }
        } else {
            // Start the conversation
            if (!agentId) return;
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                const conversation = await Conversation.startSession({
                    agentId,
                    onConnect: () => setConnected(true),
                    onDisconnect: () => {
                        setConnected(false);
                        setConv(null);
                    },
                    onError: (err) => {
                        console.error(err);
                        setError(err.message || 'Unknown error');
                    },
                    onModeChange: (mode) => {
                        setAgentMode(mode.mode);
                    },
                });
                setConv(conversation);
            } catch (e) {
                console.error(e);
                setError(e.message || 'Failed to start conversation');
            }
        }
    }, [agentId, connected, conv]);

    if (!agentId) {
        return (
            <div style={{ color: 'white', padding: '1rem' }}>
                <h3>Missing configuration</h3>
                <p>
                    Please define <code>VITE_ELEVENLABS_AGENT_ID</code> in your <code>.env</code> file.
                </p>
            </div>
        );
    }

    return (
        <div className="conversation-control">
            <button
                onClick={toggleConversation}
                className={`play-pause-button ${connected ? 'active' : ''} ${isPulsing ? 'pulsing' : ''}`}
            >
                {connected ? <PauseIcon /> : <MicIcon />}
            </button>
            {/* <p style={{ color: 'white' }}>Status: {connected ? 'Connected' : 'Disconnected'} | Agent is {agentMode}</p>
            {error && (
                <p style={{ color: '#ffb3b3' }}>Error: {error}</p>
            )} */}
        </div>
    );
}

ElevenLabsConversation.propTypes = {
    agentId: PropTypes.string.isRequired,
}; 