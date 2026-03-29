# ET Navigator: The Intelligent Newsroom

An AI-native business news experience featuring personalized newsrooms, interactive intelligence briefings, and story arc tracking. Pulse AI synthesizes thousands of sources to deliver a specific, high-signal news edge tailored to your persona.

## 🚀 Features

- **Personalized Newsrooms**: Tailored news feeds for general, investor, analyst, and executive personas.
- **Mobile Reel Mode**: An immersive, vertical-scrolling news experience optimized for mobile devices.
- **Interactive Briefings**: Deep-dive into any story with an AI-powered conversational interface.
- **Story Arc Tracking**: Visualize the evolution of a news narrative over time.
- **AI Video Studio**: Generate concise video summaries of key news stories.
- **Multilingual Support**: Switch between English, Hindi, and Tamil with a single tap.
- **Sentiment Analysis**: Real-time sentiment tracking for every news item.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API via `@google/genai`
- **Charts**: Recharts

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Gemini API Key (get one at [ai.google.dev](https://ai.google.dev/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd pulse-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to `http://localhost:3000` in your browser.

## 🏗️ Build for Production

To create a production-ready build:
```bash
npm run build
```
The output will be in the `dist` folder.

## 📄 License

This project is licensed under the Apache-2.0 License. See the `LICENSE` file for details (if applicable).
