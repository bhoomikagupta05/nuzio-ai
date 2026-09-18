# Voice Integration Documentation

## Voice Architecture Overview
Nuzio AI uses the **Web Speech API (`window.speechSynthesis`)** to deliver real-time browser-based Text-to-Speech (TTS) narration. This allows for zero-latency voice generation without requiring heavy backend audio processing or expensive external TTS APIs.

The system is designed to consume AI-synthesized intelligence (the Daily Briefing) and narrate it cleanly and conversationally.

### 1. Narration Script Service (`voiceService.js`)
- **Location**: `frontend/src/services/voiceService.js`
- **Purpose**: Instead of feeding raw, 5000-word articles into the voice engine, this service constructs a structured, conversational script from the AI's summary.
- **Output**: Produces a `narrationText` string and a breakdown of `segments` with estimated durations.

### 2. Audio Context & State Management (`AudioContext.jsx`)
- Replaces the legacy mock timer implementation.
- **Voice Loading**: Hooks into the `onvoiceschanged` event to securely load native operating system voices dynamically (critical for Chrome/Safari compatibility).
- **Voice Selection Heuristic**: Maps the user's `narrator.name` preference (e.g., "Aria", "Marcus") to the best available system voice (e.g., Google US English Female).
- **Playback Controls**: Implements `play`, `pause`, `resume`, `skip`, and dynamic `playbackRate` mapping directly to the `SpeechSynthesisUtterance`.

## Error Handling & Fallbacks
- If a specific named voice is unavailable on the user's OS, the system automatically falls back to a generic Male/Female English voice.
- Network disconnects do not affect playback, as the synthesis occurs entirely on the client's local hardware.
- If the browser does not support `window.speechSynthesis` (extremely rare on modern browsers), the audio controls fail gracefully without crashing the UI.

## Development & Production Considerations
- **Chunking**: The Web Speech API can sometimes halt abruptly if fed a single monolithic string longer than 200-300 characters (particularly on mobile Safari). While `voiceService.js` currently groups text, future production iterations could split the `narrationText` by punctuation and queue consecutive `SpeechSynthesisUtterance` objects.
- **No API Keys**: Because this runs locally in the browser, there are no external TTS API keys to protect or leak.
- **Mobile Playback**: iOS Safari requires that the *first* audio interaction be directly triggered by a user's click event. The current architecture respects this by ensuring playback only starts when the user taps "Play".
