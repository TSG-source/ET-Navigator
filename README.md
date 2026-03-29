# ET Navigator (Pulse AI)

An AI-native business news experience featuring personalized newsrooms, interactive intelligence briefings, and story arc tracking. Pulse AI synthesizes thousands of sources to deliver a specific, high-signal news edge tailored to your persona.

## Features

- **Personalized Newsrooms** — Tailored news feeds for investor, founder, student, and general personas.
- **Mobile Reel Mode** — Immersive vertical-scrolling news, optimized for mobile.
- **Interactive Briefings** — Deep-dive into any story with an AI-powered conversational interface.
- **Story Arc Tracking** — Visualize how a news narrative evolves over time.
- **AI Video Studio** — Generate concise video summaries of key news stories.
- **Multilingual Support** — Switch between English, Hindi, and Tamil.
- **Sentiment Analysis** — Real-time sentiment tracking for every news item.

---

## Complete Setup Guide (Fresh Computer)

This guide assumes you have a brand-new computer with nothing installed. Follow the steps for your operating system.

---

### Step 1: Install Node.js

This project requires **Node.js v18 or higher**. Node.js comes bundled with `npm` (the package manager), so you don't need to install npm separately.

#### Windows

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** version (the big green button).
3. Run the installer. Accept the defaults and click through until it finishes.
4. Restart your computer.
5. Open **Command Prompt** or **PowerShell** (search for either in the Start menu) and verify:
   ```
   node --version
   npm --version
   ```
   You should see version numbers printed (e.g., `v20.x.x` and `10.x.x`).

#### macOS

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** version for macOS.
3. Run the `.pkg` installer and follow the prompts.
4. Open **Terminal** (search for it in Spotlight with `Cmd + Space`) and verify:
   ```
   node --version
   npm --version
   ```

**Alternative (using Homebrew):** If you already have Homebrew, you can run:
```bash
brew install node
```

#### Linux (Ubuntu/Debian)

Open a terminal and run:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify:
```bash
node --version
npm --version
```

---

### Step 2: Install Git (optional but recommended)

Git lets you clone repositories. If you received the project as a `.zip` file, you can skip this step.

#### Windows

1. Download from [https://git-scm.com/download/win](https://git-scm.com/download/win).
2. Run the installer with default settings.

#### macOS

Git is often pre-installed. Check by running `git --version` in Terminal. If not installed, macOS will prompt you to install the Xcode Command Line Tools — follow the prompt.

#### Linux (Ubuntu/Debian)

```bash
sudo apt-get install -y git
```

---

### Step 3: Get a Gemini API Key

The app uses Google's Gemini AI to generate news content. You need a free API key.

1. Go to [https://ai.google.dev](https://ai.google.dev).
2. Click **"Get API key in Google AI Studio"**.
3. Sign in with your Google account.
4. Click **"Create API Key"** and copy the key that appears.
5. Keep this key handy — you'll need it in the next step.

---

### Step 4: Download and Set Up the Project

#### Option A: From a zip file

1. Extract the `et-navigator.zip` file to a folder of your choice.
2. Open a terminal/command prompt and navigate into the folder:
   ```bash
   cd path/to/et-navigator
   ```

#### Option B: From a Git repository

```bash
git clone <your-repo-url>
cd et-navigator
```

---

### Step 5: Configure the Environment

Create a file called `.env` in the project's root folder (the same folder that has `package.json`).

#### Windows (Command Prompt)

```cmd
echo GEMINI_API_KEY=paste_your_api_key_here > .env
```

#### macOS / Linux

```bash
echo 'GEMINI_API_KEY=paste_your_api_key_here' > .env
```

Replace `paste_your_api_key_here` with the actual API key you got from Step 3. The file should contain exactly one line:

```
GEMINI_API_KEY=your_actual_key_goes_here
```

> **Note:** Never share this key publicly or commit the `.env` file to a repository.

---

### Step 6: Install Dependencies

In the project folder, run:

```bash
npm install
```

This downloads all the libraries the project needs. It may take a minute or two. You'll see a `node_modules` folder appear when it's done.

---

### Step 7: Start the App

```bash
npm run dev
```

You should see output like:

```
VITE v6.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://x.x.x.x:3000/
```

Open your browser and go to **[http://localhost:3000](http://localhost:3000)**. The app should load and you'll see the onboarding screen.

---

## Usage

1. **Choose your persona** — Select whether you're an investor, founder, student, or general reader.
2. **Browse your feed** — Scroll through AI-curated news stories personalized to your persona.
3. **Tap into a story** — Open any story for an AI-powered deep dive.
4. **Track story arcs** — See how ongoing narratives evolve over time.
5. **Use the chatbot** — Ask follow-up questions about any story using the floating chat icon.
6. **Switch languages** — Toggle between English, Hindi, and Tamil.

---

## Available Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production-ready build in the `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the project with TypeScript |
| `npm run clean` | Delete the `dist/` folder |

---

## Building for Production

To create an optimized build you can deploy:

```bash
npm run build
```

The output goes into the `dist/` folder. You can serve it with any static file server, or preview it locally with:

```bash
npm run preview
```

---

## Tech Stack

- **React 19** — UI framework
- **Vite 6** — Build tool and dev server
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **Recharts** — Charts and data visualization
- **Google Gemini API** (`@google/genai`) — AI-powered content generation

---

## Troubleshooting

**"command not found: node" or "node is not recognized"**
Node.js isn't installed or isn't in your system PATH. Reinstall Node.js from [nodejs.org](https://nodejs.org) and restart your terminal.

**"npm install" fails with permission errors**
On macOS/Linux, don't use `sudo npm install`. Instead, fix npm permissions: [https://docs.npmjs.com/resolving-eafp-permissions-errors](https://docs.npmjs.com/resolving-eafp-permissions-errors).

**The page loads but shows no news stories**
Check that your `.env` file exists in the project root and contains a valid `GEMINI_API_KEY`. Restart the dev server after creating or editing `.env`.

**"API key not valid" error in the browser console**
Double-check that you copied the full API key from Google AI Studio with no extra spaces. Make sure the `.env` file has no quotes around the key value.

**Port 3000 is already in use**
Another app is using that port. Either close it, or start the dev server on a different port:
```bash
npm run dev -- --port 3001
```

---

## License

This project is licensed under the Apache-2.0 License. See the `LICENSE` file for details.
