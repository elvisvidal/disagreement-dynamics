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
  | 'common_ground'
  | 'scope_narrowing'
  | 'direct_challenge'
  | 'position_exaggeration'
  | 'motive_attribution'
  | 'interpretive_lock'
  | 'presuppositional_accusation'
  | 'goalpost_shift'
  | 'burden_shift'
  | 'false_dichotomy'
  | 'reframing'
  | 'universalization'
  | 'topic_shift'
  | 'meta_argument'
  | 'epistemic_invalidation'
  | 'sarcasm'

export type MoveFamily = 'exploratory' | 'convergent' | 'adversarial' | 'drift' | 'meta'

export interface MoveMetadata {
  type: MoveType
  label: string
  description: string
  family: MoveFamily
  researchTags: string[]
  typicalEffects: Partial<ConversationMetrics>
}

export const moveMetadata: Record<MoveType, MoveMetadata> = {
  curiosity: {
    type: 'curiosity', label: 'Curiosity', family: 'exploratory', researchTags: ['elicitation', 'understanding'],
    description: 'Asks what the other person means before deciding what to challenge.',
    typicalEffects: { issueClarity: 10, mutualUnderstanding: 12, trust: 6, defensiveness: -6, loopRisk: -6 }
  },
  clarification: {
    type: 'clarification', label: 'Clarification', family: 'exploratory', researchTags: ['repair-adjacent', 'scope'],
    description: 'Narrows the disputed claim or asks for a distinction.',
    typicalEffects: { issueClarity: 12, mutualUnderstanding: 8, topicDrift: -5, loopRisk: -5 }
  },
  acknowledgement: {
    type: 'acknowledgement', label: 'Acknowledgement', family: 'convergent', researchTags: ['recognition', 'face-saving'],
    description: 'Recognizes part of the other view without necessarily agreeing.',
    typicalEffects: { mutualUnderstanding: 10, trust: 8, defensiveness: -8 }
  },
  respectful_challenge: {
    type: 'respectful_challenge', label: 'Respectful challenge', family: 'exploratory', researchTags: ['substantive-objection'],
    description: 'Raises a substantive objection while keeping the other position recognizable.',
    typicalEffects: { issueClarity: 7, mutualUnderstanding: 3, trust: 2, defensiveness: 2 }
  },
  evidence_request: {
    type: 'evidence_request', label: 'Evidence request', family: 'exploratory', researchTags: ['epistemic-standard'],
    description: 'Moves the disagreement toward what would count as support or counterexample.',
    typicalEffects: { issueClarity: 8, topicDrift: -3, loopRisk: -2 }
  },
  concession: {
    type: 'concession', label: 'Concession', family: 'convergent', researchTags: ['partial-resolution'],
    description: 'Grants a limited point while preserving the remaining disagreement.',
    typicalEffects: { mutualUnderstanding: 9, trust: 9, defensiveness: -8, issueClarity: 5 }
  },
  repair: {
    type: 'repair', label: 'Repair', family: 'convergent', researchTags: ['repair', 'de-escalation'],
    description: 'Addresses a conversational rupture and tries to return to the issue.',
    typicalEffects: { trust: 12, defensiveness: -12, topicDrift: -8, loopRisk: -10 }
  },
  steelmanning: {
    type: 'steelmanning', label: 'Steelmanning', family: 'convergent', researchTags: ['restatement', 'charitable-interpretation'],
    description: 'Restates the other position in a stronger and fairer form.',
    typicalEffects: { mutualUnderstanding: 14, trust: 10, issueClarity: 8, defensiveness: -7 }
  },
  common_ground: {
    type: 'common_ground', label: 'Common ground', family: 'convergent', researchTags: ['shared-premise', 'alignment'],
    description: 'Identifies a premise or goal both participants appear to share before locating the remaining disagreement.',
    typicalEffects: { issueClarity: 8, mutualUnderstanding: 9, trust: 10, defensiveness: -7, loopRisk: -5 }
  },
  scope_narrowing: {
    type: 'scope_narrowing', label: 'Scope narrowing', family: 'convergent', researchTags: ['scope', 'claim-reduction'],
    description: 'Reduces a broad dispute to a smaller claim that can be evaluated more precisely.',
    typicalEffects: { issueClarity: 13, mutualUnderstanding: 6, topicDrift: -8, loopRisk: -7 }
  },
  direct_challenge: {
    type: 'direct_challenge', label: 'Direct challenge', family: 'adversarial', researchTags: ['substantive-objection'],
    description: 'Objects directly to the position, which can clarify stakes or harden the exchange.',
    typicalEffects: { issueClarity: 2, defensiveness: 7, trust: -4 }
  },
  position_exaggeration: {
    type: 'position_exaggeration', label: 'Position exaggeration', family: 'adversarial', researchTags: ['misrepresentation', 'escalation'],
    description: 'Reframes the other person as holding a stronger claim than they explicitly stated.',
    typicalEffects: { defensiveness: 15, trust: -10, issueClarity: -5, topicDrift: 10, loopRisk: 15 }
  },
  motive_attribution: {
    type: 'motive_attribution', label: 'Motive attribution', family: 'meta', researchTags: ['speaker-focus', 'bad-faith-attribution'],
    description: 'Shifts from the claim to a guessed motive behind the claim.',
    typicalEffects: { defensiveness: 14, trust: -14, topicDrift: 12, loopRisk: 12 }
  },
  interpretive_lock: {
    type: 'interpretive_lock', label: 'Interpretive lock', family: 'meta', researchTags: ['repair-rejection', 'misrepresentation'],
    description: 'Treats one interpretation as settled even after the other person rejects it.',
    typicalEffects: { defensiveness: 16, trust: -12, mutualUnderstanding: -10, loopRisk: 18 }
  },
  presuppositional_accusation: {
    type: 'presuppositional_accusation', label: 'Presuppositional accusation', family: 'meta', researchTags: ['loaded-question', 'speaker-focus'],
    description: 'Asks or claims something that assumes the other person has already acted badly.',
    typicalEffects: { defensiveness: 18, trust: -14, topicDrift: 14, loopRisk: 15 }
  },
  goalpost_shift: {
    type: 'goalpost_shift', label: 'Goalpost shift', family: 'drift', researchTags: ['resolution-standard', 'moving-target'],
    description: 'Changes the standard for resolution after the conversation addresses the prior standard.',
    typicalEffects: { issueClarity: -8, topicDrift: 12, trust: -8, loopRisk: 12 }
  },
  burden_shift: {
    type: 'burden_shift', label: 'Burden shift', family: 'adversarial', researchTags: ['proof-obligation', 'epistemic-standard'],
    description: 'Places the entire burden of establishing or disproving a contested claim on the other participant.',
    typicalEffects: { issueClarity: -2, defensiveness: 8, trust: -6, loopRisk: 8 }
  },
  false_dichotomy: {
    type: 'false_dichotomy', label: 'False dichotomy', family: 'drift', researchTags: ['forced-choice', 'scope'],
    description: 'Frames a multi-option disagreement as if only two mutually exclusive positions were available.',
    typicalEffects: { issueClarity: -7, mutualUnderstanding: -5, defensiveness: 10, loopRisk: 9 }
  },
  reframing: {
    type: 'reframing', label: 'Reframing', family: 'exploratory', researchTags: ['frame-change', 'perspective'],
    description: 'Restates the dispute through a different lens without necessarily changing the underlying claim.',
    typicalEffects: { issueClarity: 5, mutualUnderstanding: 5, topicDrift: 2 }
  },
  universalization: {
    type: 'universalization', label: 'Universalization', family: 'drift', researchTags: ['scope-expansion', 'overgeneralization'],
    description: 'Turns a bounded claim into a sweeping claim about all cases or people.',
    typicalEffects: { issueClarity: -5, defensiveness: 10, topicDrift: 8, loopRisk: 9 }
  },
  topic_shift: {
    type: 'topic_shift', label: 'Topic shift', family: 'drift', researchTags: ['issue-substitution'],
    description: 'Moves to a nearby issue before the current disagreement is resolved.',
    typicalEffects: { topicDrift: 18, issueClarity: -10, loopRisk: 8 }
  },
  meta_argument: {
    type: 'meta_argument', label: 'Meta-argument', family: 'meta', researchTags: ['conversation-about-conversation'],
    description: 'Shifts from the topic to how the conversation itself is being conducted.',
    typicalEffects: { topicDrift: 12, defensiveness: 12, loopRisk: 14, issueClarity: -6 }
  },
  epistemic_invalidation: {
    type: 'epistemic_invalidation', label: 'Epistemic invalidation', family: 'meta', researchTags: ['speaker-competence', 'dismissal'],
    description: 'Dismisses the other person as unable or unwilling to reason about the issue.',
    typicalEffects: { defensiveness: 18, trust: -18, mutualUnderstanding: -12, loopRisk: 16 }
  },
  sarcasm: {
    type: 'sarcasm', label: 'Sarcasm', family: 'adversarial', researchTags: ['ridicule', 'tone-conflict'],
    description: 'Uses irony or ridicule to make the point, often turning attention to tone.',
    typicalEffects: { defensiveness: 13, trust: -12, topicDrift: 8, loopRisk: 10 }
  }
}

export const restorativeMoveTypes: MoveType[] = [
  'curiosity', 'clarification', 'acknowledgement', 'respectful_challenge', 'evidence_request',
  'concession', 'repair', 'steelmanning', 'common_ground', 'scope_narrowing'
]

export const loopProneMoveTypes: MoveType[] = [
  'position_exaggeration', 'motive_attribution', 'interpretive_lock', 'presuppositional_accusation',
  'goalpost_shift', 'burden_shift', 'false_dichotomy', 'universalization', 'topic_shift',
  'meta_argument', 'epistemic_invalidation', 'sarcasm'
]
