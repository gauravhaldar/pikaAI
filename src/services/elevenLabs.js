// Utility functions for interacting with ElevenLabs Conversational AI HTTP API
// For now we only expose a single helper for generating a signed WebSocket URL
// when your agent requires authentication. You **should call this from a
// secure backend**, never the browser – keep your API key secret!

import axios from 'axios';

/**
 * getSignedUrl
 * -------------
 * Fetches a one-time signed WebSocket URL for connecting to a *private*
 * Conversational AI agent. The request is made directly to ElevenLabs using
 * your API key, so make sure this function is executed in a server-side
 * context (for example, inside a Vite + Express API route).
 *
 * @param {string} agentId – The agent ID as shown in the ElevenLabs dashboard.
 * @param {string} apiKey  – Your ElevenLabs API key. **Do not expose this on the client!**
 * @returns {Promise<string>} – The signed URL that can be passed to the
 *   `signedUrl` option of `Conversation.startSession()` (from @elevenlabs/client).
 */
export async function getSignedUrl(agentId, apiKey) {
  if (!agentId) throw new Error('Missing agentId');
  if (!apiKey) throw new Error('Missing ElevenLabs apiKey');

  const url = `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`;
  const { data } = await axios.get(url, {
    headers: {
      'xi-api-key': apiKey,
    },
  });

  if (!data?.signed_url) {
    throw new Error('Failed to obtain signed_url from ElevenLabs');
  }

  return data.signed_url;
} 