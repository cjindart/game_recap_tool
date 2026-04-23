# game_recap_tool

Paste a box score or game stats and get back an announcer-style highlights script, streamed token by token. Available as both a web app and a CLI tool.

## Prerequisites

- Node.js 20+
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Web App

```bash
node --env-file=.env server.js
```

Open `http://localhost:3000` in your browser.

- Paste stats directly into the text area
- Or drag and drop a `.txt` or `.csv` file onto the upload zone
- Select your sport from the dropdown
- Click **Generate Recap** — the script streams in as it's written

`script.txt` is an included example (2022 NBA Finals Game 6) you can drag in to try it out.

## CLI

```bash
npm start
```

Paste your stats at the prompt, then press **Enter** followed by **Ctrl+D** to submit.

Pass `--sport` to set the sport (defaults to basketball):

```bash
npm start -- --sport football
npm start -- --sport baseball
npm start -- --sport hockey
```
