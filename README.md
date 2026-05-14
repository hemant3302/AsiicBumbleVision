<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# BumbleVision

**by Ascii test**

Real-time camera to ASCII art converter with AI-powered scene analysis.

</div>

## About

BumbleVision transforms your webcam feed into live ASCII art with a futuristic cyberpunk HUD. Point your camera at anything and hit **Scan + Analyze** to get an AI-powered breakdown of the scene.

**Features:**
- Live webcam → ASCII art conversion
- Multiple color modes: Matrix, B&W, Retro, Color
- Multiple charsets: Simple, Complex, Binary, Blocks
- Adjustable font size, brightness, and contrast
- AI scene analysis powered by Gemini
- Snapshot export
- Sci-fi sound effects

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your Gemini API key in `.env.local`:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000** and allow camera access.

## Acknowledgements

Special thanks to **okaypranjul** for teaching and guiding through this project.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI (`@google/genai`)
- Web Audio API
- Canvas API
