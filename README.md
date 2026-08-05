# Project ORION

> Evidence before Decision.

Project ORION is an evidence-based risk assessment agent for enterprise investment teams, built by **Orion Labs** for the GOAI 2026 AI+Finance track.

## Live demo

https://project-orion-evidence-os.xyropy.chatgpt.site

## What it does

ORION turns company materials and external information into traceable investment evidence. The current prototype demonstrates:

- claim-level evidence inspection;
- verified, conflicted, missing, and major-risk states;
- investment mandate and red-line visibility;
- due-diligence progress and action tracking;
- a human Decision Gate for investment committee review.

The system does not predict investment returns or replace professional judgment. AI organizes evidence and flags risk; investment professionals make the final decision.

## Product workflow

1. Research Agent reads business plans, financial reports, contracts, interviews, and public information.
2. Claim Agent extracts verifiable operating claims.
3. Evidence Agent links supporting, conflicting, and missing evidence.
4. Risk Agent matches investment rules and risk thresholds.
5. Decision Agent prepares a cited Decision Contract for human review.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run build
npm run test:sites
```

## Current scope

This repository contains the interactive frontend prototype with synthetic demonstration data. Document ingestion, model orchestration, persistent Evidence Graph storage, and live risk monitoring are planned backend milestones and are not represented as complete production capabilities.

## Data and privacy

All company names, financial values, claims, evidence IDs, and case records in this prototype are synthetic. Do not upload confidential investment materials to this frontend prototype.

## Team

Orion Labs

## License

MIT. Third-party packages retain their respective licenses; see `THIRD_PARTY_NOTICES.md`.
