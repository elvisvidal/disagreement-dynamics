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

The app keeps four layers separate:

```text
CONTENT
scenario dialogue

DOMAIN
conversation state + moves + metrics + research summaries

ENGINE
state transitions + loop detection + replay restore + trajectory analysis

UI
visual representation + replay comparison
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
→ completed path summary
→ replay comparison
→ candidate hypothesis
```

Scenario files define directed conversation graphs. Vue components render the current state but do not contain hardcoded scenario logic. The engine updates metrics, claims, meta-disputes, move history, loop risk, terminal status, replay snapshots, and research summaries.

## V2 Research Milestone

The current library contains **13 scenarios**: the original three handcrafted scenarios plus ten additional research scenarios.

Original scenarios:

- Religion in public schools
- Remote work
- AI-generated art

Additional scenarios:

- Social media moderation
- Housing density and neighborhood change
- Immigration and public services
- Climate policy and household costs
- Policing and public safety
- University speech restrictions
- Taxing extreme wealth
- Teen digital privacy
- Contested public monuments
- Cashless businesses

The lower-temperature cashless-business scenario is intentionally useful as a control-like topic: it lets us ask whether loop-producing interaction patterns still appear when identity and ideology are less central.

## Conversation Move Taxonomy

V2 defines **24 conversational moves** grouped into six heuristic families:

- inquiry
- repair
- alignment
- challenge
- escalation
- derailment

Each move also has a low, mixed, or high `loopAffinity` marker and research tags. These labels are implementation hypotheses, not claims that the categories have been academically validated.

New V2 moves include:

- scope narrowing
- reflective listening
- principle probe
- burden shift
- false dichotomy

The taxonomy is designed so future research can ask about **sequences**, not only isolated phrases. For example:

```text
position exaggeration
→ interpretive lock
→ meta-argument
→ interpretive lock
```

can be compared with:

```text
curiosity
→ principle probe
→ reflective listening
→ scope narrowing
→ clear disagreement
```

## Replay Research Data

Every completed path stores a research summary containing:

- exact move sequence
- move-family sequence
- adjacent move-transition pairs
- inquiry move count
- repair move count
- escalation move count
- derailment move count
- low-loop-affinity move count
- high-loop-affinity move count
- terminal outcome and final heuristic metrics

After at least two replay paths exist, the UI derives a small set of **candidate hypotheses** from contrasts between loop/breakdown paths and non-loop paths.

Examples include:

- whether a transition appears on loop paths but not comparison paths
- whether high-loop-affinity move density is greater on loop paths
- whether repair/inquiry moves appear more often in non-loop outcomes
- whether meta-dispute accumulation distinguishes loops from strong but productive disagreement

These hypotheses are explicitly presented as prompts for later testing, not empirical findings.

## Identity Context Note

Identity context is intentionally not modeled as a cause of beliefs or conversational behavior. Future versions may represent identity context separately from:

- beliefs
- conversational style
- emotional state
- personal stakes

The current data does not infer political, religious, or conversational behavior from race, gender, religion, nationality, or other demographic identity.

## Future Research Direction

The next step is to move from deterministic within-session comparison toward analyzable observations across many sessions. Useful future additions include:

- persistent anonymized path data
- scenario and phrasing A/B variants
- transition-frequency analysis across sessions
- researcher-defined taxonomies and coding overrides
- transcript import and manual coding
- LLM-generated surface dialogue constrained by explicit state transitions
- preregistered hypotheses before collecting participant data
- academic review and validation of move categories and metrics
