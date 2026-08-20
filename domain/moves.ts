import type { ConversationMetrics } from './conversation'

export type MoveType =
  | 'curiosity'
  | 'clarification'
  | 'acknowledgement'
  | 'respectful_challenge'
  | 'evidence_request'
  | 'concession'
  | 'repair'
  | 'steelmanning'
  | 'scope_narrowing'
  | 'reflective_listening'
  | 'principle_probe'
  | 'direct_challenge'
  | 'position_exaggeration'
  | 'motive_attribution'
  | 'interpretive_lock'
  | 'presuppositional_accusation'
  | 'goalpost_shift'
  | 'universalization'
  | 'topic_shift'
  | 'meta_argument'
  | 'epistemic_invalidation'
  | 'sarcasm'
  | 'burden_shift'
  | 'false_dichotomy'

export type MoveFamily =
  | 'inquiry'
  | 'repair'
  | 'alignment'
  | 'challenge'
  | 'escalation'
  | 'derailment'

export interface MoveMetadata {
  type: MoveType
  label: string
  description: string
  typicalEffects: Partial<ConversationMetrics>
  family: MoveFamily
  loopAffinity: 'low' | 'mixed' | 'high'
  researchTags: string[]
}

export const moveMetadata: Record<MoveType, MoveMetadata> = {
  curiosity: {
    type: 'curiosity',
    label: 'Curiosity',
    description: 'Asks what the other person means before deciding what to challenge.',
    typicalEffects: { issueClarity: 10, mutualUnderstanding: 12, trust: 6, defensiveness: -6, loopRisk: -6 },
    family: 'inquiry',
    loopAffinity: 'low',
    researchTags: ['information-seeking', 'position-clarification']
  },
  clarification: {
    type: 'clarification',
    label: 'Clarification',
    description: 'Narrows the disputed claim or asks for a distinction.',
    typicalEffects: { issueClarity: 12, mutualUnderstanding: 8, topicDrift: -5, loopRisk: -5 },
    family: 'inquiry',
    loopAffinity: 'low',
    researchTags: ['repair-adjacent', 'scope']
  },
  acknowledgement: {
    type: 'acknowledgement',
    label: 'Acknowledgement',
    description: 'Recognizes part of the other view without necessarily agreeing.',
    typicalEffects: { mutualUnderstanding: 10, trust: 8, defensiveness: -8 },
    family: 'alignment',
    loopAffinity: 'low',
    researchTags: ['face-support', 'partial-alignment']
  },
  respectful_challenge: {
    type: 'respectful_challenge',
    label: 'Respectful challenge',
    description: 'Raises a substantive objection while keeping the other position recognizable.',
    typicalEffects: { issueClarity: 7, mutualUnderstanding: 3, trust: 2, defensiveness: 2 },
    family: 'challenge',
    loopAffinity: 'mixed',
    researchTags: ['substantive-disagreement', 'claim-focused']
  },
  evidence_request: {
    type: 'evidence_request',
    label: 'Evidence request',
    description: 'Moves the disagreement toward what would count as support or counterexample.',
    typicalEffects: { issueClarity: 8, topicDrift: -3, loopRisk: -2 },
    family: 'inquiry',
    loopAffinity: 'low',
    researchTags: ['evidence', 'falsifiability']
  },
  concession: {
    type: 'concession',
    label: 'Concession',
    description: 'Grants a limited point while preserving the remaining disagreement.',
    typicalEffects: { mutualUnderstanding: 9, trust: 9, defensiveness: -8, issueClarity: 5 },
    family: 'alignment',
    loopAffinity: 'low',
    researchTags: ['partial-agreement', 'scope']
  },
  repair: {
    type: 'repair',
    label: 'Repair',
    description: 'Addresses a conversational rupture and tries to return to the issue.',
    typicalEffects: { trust: 12, defensiveness: -12, topicDrift: -8, loopRisk: -10 },
    family: 'repair',
    loopAffinity: 'low',
    researchTags: ['rupture-repair', 'return-to-topic']
  },
  steelmanning: {
    type: 'steelmanning',
    label: 'Steelmanning',
    description: 'Restates the other position in a stronger and fairer form.',
    typicalEffects: { mutualUnderstanding: 14, trust: 10, issueClarity: 8, defensiveness: -7 },
    family: 'alignment',
    loopAffinity: 'low',
    researchTags: ['position-representation', 'good-faith']
  },
  scope_narrowing: {
    type: 'scope_narrowing',
    label: 'Scope narrowing',
    description: 'Reduces a broad dispute to the smallest claim the participants actually need to examine.',
    typicalEffects: { issueClarity: 14, mutualUnderstanding: 6, topicDrift: -8, loopRisk: -6 },
    family: 'inquiry',
    loopAffinity: 'low',
    researchTags: ['scope', 'claim-decomposition']
  },
  reflective_listening: {
    type: 'reflective_listening',
    label: 'Reflective listening',
    description: 'Restates the other person’s concern and invites correction before responding.',
    typicalEffects: { mutualUnderstanding: 15, trust: 9, defensiveness: -10, issueClarity: 5 },
    family: 'alignment',
    loopAffinity: 'low',
    researchTags: ['position-representation', 'repair-adjacent']
  },
  principle_probe: {
    type: 'principle_probe',
    label: 'Principle probe',
    description: 'Asks which underlying value or rule is doing the work in the other person’s position.',
    typicalEffects: { issueClarity: 10, mutualUnderstanding: 8, topicDrift: -2, loopRisk: -3 },
    family: 'inquiry',
    loopAffinity: 'low',
    researchTags: ['values', 'assumptions']
  },
  direct_challenge: {
    type: 'direct_challenge',
    label: 'Direct challenge',
    description: 'Objects directly to the position, which can clarify stakes or harden the exchange.',
    typicalEffects: { issueClarity: 2, defensiveness: 7, trust: -4 },
    family: 'challenge',
    loopAffinity: 'mixed',
    researchTags: ['substantive-disagreement']
  },
  position_exaggeration: {
    type: 'position_exaggeration',
    label: 'Position exaggeration',
    description: 'Reframes the other person as holding a stronger claim than they explicitly stated.',
    typicalEffects: { defensiveness: 15, trust: -10, issueClarity: -5, topicDrift: 10, loopRisk: 15 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['misrepresentation', 'position-drift']
  },
  motive_attribution: {
    type: 'motive_attribution',
    label: 'Motive attribution',
    description: 'Shifts from the claim to a guessed motive behind the claim.',
    typicalEffects: { defensiveness: 14, trust: -14, topicDrift: 12, loopRisk: 12 },
    family: 'derailment',
    loopAffinity: 'high',
    researchTags: ['motive', 'speaker-focus']
  },
  interpretive_lock: {
    type: 'interpretive_lock',
    label: 'Interpretive lock',
    description: 'Treats one interpretation as settled even after the other person rejects it.',
    typicalEffects: { defensiveness: 16, trust: -12, mutualUnderstanding: -10, loopRisk: 18 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['repair-rejection', 'position-representation']
  },
  presuppositional_accusation: {
    type: 'presuppositional_accusation',
    label: 'Presuppositional accusation',
    description: 'Asks or claims something that assumes the other person has already acted badly.',
    typicalEffects: { defensiveness: 18, trust: -14, topicDrift: 14, loopRisk: 15 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['presupposition', 'speaker-focus']
  },
  goalpost_shift: {
    type: 'goalpost_shift',
    label: 'Goalpost shift',
    description: 'Changes the standard for resolution after the conversation addresses the prior standard.',
    typicalEffects: { issueClarity: -8, topicDrift: 12, trust: -8, loopRisk: 12 },
    family: 'derailment',
    loopAffinity: 'high',
    researchTags: ['resolution-standard', 'topic-drift']
  },
  universalization: {
    type: 'universalization',
    label: 'Universalization',
    description: 'Turns a bounded claim into a sweeping claim about all cases or people.',
    typicalEffects: { issueClarity: -5, defensiveness: 10, topicDrift: 8, loopRisk: 9 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['scope-expansion', 'absolutizing']
  },
  topic_shift: {
    type: 'topic_shift',
    label: 'Topic shift',
    description: 'Moves to a nearby issue before the current disagreement is resolved.',
    typicalEffects: { topicDrift: 18, issueClarity: -10, loopRisk: 8 },
    family: 'derailment',
    loopAffinity: 'high',
    researchTags: ['topic-drift']
  },
  meta_argument: {
    type: 'meta_argument',
    label: 'Meta-argument',
    description: 'Shifts from the topic to how the conversation itself is being conducted.',
    typicalEffects: { topicDrift: 12, defensiveness: 12, loopRisk: 14, issueClarity: -6 },
    family: 'derailment',
    loopAffinity: 'high',
    researchTags: ['meta-conflict', 'speaker-focus']
  },
  epistemic_invalidation: {
    type: 'epistemic_invalidation',
    label: 'Epistemic invalidation',
    description: 'Dismisses the other person as unable or unwilling to reason about the issue.',
    typicalEffects: { defensiveness: 18, trust: -18, mutualUnderstanding: -12, loopRisk: 16 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['credibility-attack', 'speaker-focus']
  },
  sarcasm: {
    type: 'sarcasm',
    label: 'Sarcasm',
    description: 'Uses irony or ridicule to make the point, often turning attention to tone.',
    typicalEffects: { defensiveness: 13, trust: -12, topicDrift: 8, loopRisk: 10 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['tone', 'face-threat']
  },
  burden_shift: {
    type: 'burden_shift',
    label: 'Burden shift',
    description: 'Requires the other person to disprove a claim rather than clarifying what would support it.',
    typicalEffects: { issueClarity: -4, defensiveness: 8, trust: -6, loopRisk: 8 },
    family: 'derailment',
    loopAffinity: 'high',
    researchTags: ['burden-of-proof', 'resolution-standard']
  },
  false_dichotomy: {
    type: 'false_dichotomy',
    label: 'False dichotomy',
    description: 'Frames the issue as only two incompatible options when intermediate positions may exist.',
    typicalEffects: { issueClarity: -6, defensiveness: 10, topicDrift: 5, loopRisk: 9 },
    family: 'escalation',
    loopAffinity: 'high',
    researchTags: ['scope-compression', 'position-exaggeration']
  }
}

export const moveTypes = Object.keys(moveMetadata) as MoveType[]
