# Viral Shorts Agent

Generate a hook-to-CTA launch plan for viral YouTube Shorts in seconds. Supply a topic, persona, emotion and editing style; the agent manufactures hooks, beat maps, pattern interrupts, B-roll prompts, remix ideas and packaging copy engineered for retention loops.

## Features

- Hook generator calibrated by emotion and persona archetypes  
- Beat-by-beat script with contextualized punch-ins and proof moments  
- Pattern interrupt and visual direction prescriptions tuned to energy level  
- B-roll, remix runway, caption, hashtags and CTA packaging  
- Deterministic output using seeded synthesis so the same brief delivers the same plan  
- Built with Next.js App Router and React 18

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to access the agent UI.

### Production build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout and metadata
│   ├── globals.css         # Curated neon aesthetic styling
│   └── page.tsx            # Agent UI and interaction logic
├── lib/
│   └── agent.ts            # Viral generation engine
├── package.json
└── README.md
```

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Custom design system (no CSS frameworks)

## Scripts

- `npm run dev` – local development
- `npm run build` – create optimized production build
- `npm run start` – serve built assets
- `npm run lint` – Next.js lint rules / TypeScript checks
