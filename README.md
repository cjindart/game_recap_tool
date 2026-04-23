# game_recap_tool

Paste a box score or game stats and get back an announcer-style highlights script, streamed token by token to your terminal.

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

## Usage

```bash
npm start
```

Paste your stats at the prompt, then press **Enter** followed by **Ctrl+D** to submit.

### Sport flag

By default the broadcaster covers basketball. Pass `--sport` to switch:

```bash
npm start -- --sport nfl
npm start -- --sport baseball
npm start -- --sport hockey
```

## Example

```
$ npm start -- --sport nfl
Paste stats below, then press Ctrl+D:
Chiefs 27, Bills 24 — Mahomes 312 yards, 3 TD...
^D

What a finish in Buffalo on a frigid January night...
```
