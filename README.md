# Disagreement Dynamics

An experimental Nuxt 3 simulator for studying conversational dynamics: how the same disagreement can become clearer, drift, escalate, resolve partially, reach respectful disagreement, or enter a self-reinforcing loop.

The app does not decide who is politically, morally, religiously, or factually correct. It visualizes the structure and trajectory of a conversation.

## What It Is Not

This project is not:

- a truth detector
- political persuasion software
- a psychological diagnosis
- a measure of intelligence
- a morality score

The displayed metrics are educational heuristics used to make conversational structure visible. They are not scientifically validated psychological measurements.

## Running Locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Nuxt.

Useful verification commands:

```bash
npm run test
npm run build
```

## Architecture

The MVP keeps four layers separate:

```text
CONTENT
scenario dialogue

DOMAIN
conversation state + moves + metrics

ENGINE
state transitions + loop detection + replay restore

UI
visual representation
```

The runtime flow is:

```text
Scenario
→ conversation graph
→ user response
→ conversational move
→ metric effects
→ next state
→ trajectory visualization
```

Scenario files define directed conversation graphs. Vue components render the current state but do not contain hardcoded scenario logic. The engine updates metrics, claims, meta-disputes, move history, loop risk, terminal status, and replay snapshots.

## Scenarios

The first version includes three fictional conversations:

- Religion in public schools
- Remote work
- AI-generated art

Each scenario includes paths toward partial agreement or agreement, clear respectful disagreement, evidence or value impasse, breakdown, and an explicit loop.

## Identity Context Note

Identity context is intentionally not modeled in this MVP. Future versions may represent identity context separately from beliefs, conversational style, emotional state, and personal stakes. The current data does not infer beliefs or conversational behavior from demographic identity.

## Future Directions

- richer scenario authoring tools
- researcher-defined move taxonomies
- conversation transcript import
- LLM-generated dialogue constrained by state transitions
- anonymized experimental sessions
- comparison of phrasing variants
- context variables
- academic validation of the metrics
