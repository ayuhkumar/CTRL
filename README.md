# QoneqtForge

**AI-Powered Content Pipeline for Qoneqt Global Feed** 
Turn any topic into a publish-ready vertical video in under 2 minutes. Zero cost. Zero compromise.

## Overview
QoneqtForge is a multi-agent AI pipeline that transforms topics, trends, and ideas into professional vertical videos for the Qoneqt Global Feed. It utilizes self-critiquing quality gates, triple-fallback AI providers, and batch production at zero infrastructure cost.

## Problem & Solution
Creating quality short-form video takes 2-4 hours per video manually, making it difficult to keep up with feed demand. QoneqtForge automates the entire pipeline:

Topic/Trend -> Research -> Script -> Scenes -> Critic Gate -> Visuals -> Voice -> Captions -> Music -> Video -> QA -> Export

The system runs through 12 intelligent stages, each with robust provider fallback chains, producing professional 1080x1920 videos optimized for the Qoneqt vertical feed.

## Features
- Multi-Agent Pipeline: 12 structured stages from research to final composed video.
- Quality Gate: LLM critic scores scripts on 6 dimensions and auto-revises weak content.
- Triple Fallbacks: Gemini / Groq / Ollama (LLM) and Pollinations / Cloudflare / Pexels (Images).
- Batch Mode: Discover trends from HackerNews or Reddit and batch-generate videos.
- Multi-Language: English, Hindi, and Gujarati neural voice synthesis.
- Feed-Optimized: 1080x1920 vertical format, karaoke captions, and Ken Burns motion effects.
- Export Pack: MP4, thumbnail, raw captions, and metadata bundled into a single ZIP.
- Zero Cost: 100% free-tier stack. No credit card required.
- Observable: Live Server-Sent Events (SSE) stream for telemetry and progress tracking.

## Technology Stack
- LLM: Gemini 2.0 Flash, Groq (Llama 3), Ollama
- Images: Pollinations.ai, Cloudflare Workers AI, Pexels
- Voice: edge-tts
- Captions: faster-whisper, ASS karaoke subtitles
- Video: FFmpeg, MoviePy
- Backend: FastAPI, SQLite, asyncio
- Frontend: Next.js 14, Tailwind CSS, Framer Motion
- Deployment: Render (Backend), Vercel (Frontend), BetterStack (Uptime monitoring)

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- FFmpeg (with libass support)

### Local Setup
```bash
git clone https://github.com/ayuhkumar/CTRL.git
cd CTRL/qoneqtforge

# Configure environment variables
cp .env.example .env

# Install backend dependencies
cd backend 
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend 
npm install
```

### Running Locally
Terminal 1 (Backend):
```bash
cd backend 
uvicorn app.main:app --reload --port 8000
```
Terminal 2 (Frontend):
```bash
cd frontend 
npm run dev
```

## Production Deployment
- Backend: Deploy the `qoneqtforge/backend` directory as a Web Service on Render using the included Dockerfile. Add all `.env` variables to the Render dashboard. Use BetterStack Uptime to ping the `/api/health` endpoint every 5 minutes to prevent instance sleep.
- Frontend: Deploy the `qoneqtforge/frontend` directory on Vercel. Set the `NEXT_PUBLIC_API_URL` environment variable to your Render backend URL.

## Built For
CTRL FREAK 2026 Hackathon, Ahmedabad.
