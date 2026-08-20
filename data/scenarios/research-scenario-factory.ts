import type { ConversationScenario } from '~/domain/conversation'

export interface ResearchScenarioSeed {
  id: string
  title: string
  domain: string
  description: string
  proposition: string
  partnerName: string
  partnerPosition: string
  opening: string
  clarification: string
  evidenceQuestion: string
  evidenceLimit: string
  valueTradeoff: string
  userConcern: string
  exaggeratedConcern: string
  partnerCorrection: string
  productiveRestatement: string
  directChallenge: string
  commonGround: string
  evidenceRequest: string
  valueResponse: string
  finalClearDisagreement: string
  finalValueDisagreement: string
}

export function createResearchScenario(seed: ResearchScenarioSeed): ConversationScenario {
  return {
    id: seed.id,
    title: seed.title,
    description: seed.description,
    proposition: seed.proposition,
    partner: { name: seed.partnerName, position: seed.partnerPosition },
    initialNodeId: 'start',
    research: {
      domain: seed.domain,
      hypotheses: [
        {
          id: `${seed.id}-repair-rejection`,
          statement: 'Position exaggeration followed by rejected clarification and meta-argument will raise loop risk more than a clarification followed by a substantive challenge.',
          expectedLoopMoves: ['position_exaggeration', 'interpretive_lock', 'meta_argument'],
          expectedRepairMoves: ['clarification', 'repair', 'scope_narrowing']
        },
        {
          id: `${seed.id}-speaker-vs-claim`,
          statement: 'Moves that redirect attention from the proposition to the speaker will increase topic drift and defensiveness.',
          expectedLoopMoves: ['motive_attribution', 'epistemic_invalidation'],
          expectedRepairMoves: ['evidence_request', 'common_ground']
        }
      ],
      phrasingPairs: [
        {
          id: `${seed.id}-pair-1`,
          label: 'Same concern, different frame',
          sameUnderlyingConcern: seed.userConcern,
          higherLoopRiskMove: 'position_exaggeration',
          lowerLoopRiskMove: 'respectful_challenge'
        },
        {
          id: `${seed.id}-pair-2`,
          label: 'Respond to clarification or lock interpretation',
          sameUnderlyingConcern: 'Whether the partner has answered the original concern precisely.',
          higherLoopRiskMove: 'interpretive_lock',
          lowerLoopRiskMove: 'scope_narrowing'
        }
      ],
      expectedProductiveOutcomes: ['agreement', 'partial-agreement', 'clear-disagreement', 'evidence-impasse', 'value-impasse'],
      expectedLoopSignature: ['position_exaggeration', 'interpretive_lock', 'meta_argument']
    },
    nodes: {
      start: {
        id: 'start', speaker: 'partner', stateLabel: 'Original claim', stateKind: 'original', text: seed.opening,
        responses: [
          { id: 'start-clarify', text: seed.clarification, moveType: 'clarification', nextNodeId: 'clarified', effects: { issueClarity: 12, mutualUnderstanding: 8, trust: 4, loopRisk: -4 } },
          { id: 'start-challenge', text: seed.directChallenge, moveType: 'respectful_challenge', nextNodeId: 'evidence', effects: { issueClarity: 7, mutualUnderstanding: 3, defensiveness: 2 } },
          { id: 'start-common', text: seed.commonGround, moveType: 'common_ground', nextNodeId: 'values', effects: { issueClarity: 8, mutualUnderstanding: 10, trust: 9, defensiveness: -6 } },
          { id: 'start-exaggerate', text: seed.exaggeratedConcern, moveType: 'position_exaggeration', nextNodeId: 'correction', effects: { issueClarity: -6, mutualUnderstanding: -8, defensiveness: 15, trust: -11, topicDrift: 10, loopRisk: 16 }, annotations: { introducedMetaDispute: `Whether ${seed.partnerName}'s position has been represented fairly` } }
        ]
      },
      clarified: {
        id: 'clarified', speaker: 'partner', stateLabel: 'Clarification', stateKind: 'clarification', text: seed.partnerCorrection,
        responses: [
          { id: 'clarified-narrow', text: seed.productiveRestatement, moveType: 'scope_narrowing', nextNodeId: 'evidence', effects: { issueClarity: 14, mutualUnderstanding: 10, trust: 7, topicDrift: -5, loopRisk: -7 } },
          { id: 'clarified-evidence', text: seed.evidenceRequest, moveType: 'evidence_request', nextNodeId: 'evidence', effects: { issueClarity: 9, mutualUnderstanding: 4, topicDrift: -3 } },
          { id: 'clarified-partial', text: 'I can accept that narrower principle if the policy also contains clear limits for the concern I raised.', moveType: 'concession', nextNodeId: 'partial', effects: { issueClarity: 12, mutualUnderstanding: 11, trust: 9, defensiveness: -7, loopRisk: -6 } },
          { id: 'clarified-motive', text: 'That sounds like a convenient way to protect the conclusion you already prefer.', moveType: 'motive_attribution', nextNodeId: 'meta', effects: { issueClarity: -7, defensiveness: 15, trust: -14, topicDrift: 12, loopRisk: 14 }, annotations: { introducedMetaDispute: `Whether ${seed.partnerName} is reasoning in good faith` } }
        ]
      },
      evidence: {
        id: 'evidence', speaker: 'partner', stateLabel: 'Evidence boundary', stateKind: 'evidence', text: seed.evidenceQuestion,
        responses: [
          { id: 'evidence-accept-limit', text: 'That sounds testable in principle, but I do not think we have enough evidence here to settle it.', moveType: 'acknowledgement', nextNodeId: 'evidence-impasse', effects: { issueClarity: 12, mutualUnderstanding: 9, trust: 6, defensiveness: -5 } },
          { id: 'evidence-value', text: seed.valueResponse, moveType: 'reframing', nextNodeId: 'values', effects: { issueClarity: 8, mutualUnderstanding: 6, topicDrift: 1 } },
          { id: 'evidence-agree', text: 'If those are the standards we both want the policy judged by, I think we may agree on more than we first thought.', moveType: 'common_ground', nextNodeId: 'agreement', effects: { issueClarity: 12, mutualUnderstanding: 13, trust: 11, defensiveness: -8, loopRisk: -7 } },
          { id: 'evidence-burden', text: 'If you cannot prove your position works in every important case, why should anyone accept it?', moveType: 'burden_shift', nextNodeId: 'meta', effects: { issueClarity: -4, defensiveness: 9, trust: -7, loopRisk: 10 }, annotations: { introducedMetaDispute: 'Whether one side has an impossible proof burden' } }
        ]
      },
      values: {
        id: 'values', speaker: 'partner', stateLabel: 'Values tradeoff', stateKind: 'values', text: seed.valueTradeoff,
        responses: [
          { id: 'values-clear', text: seed.finalClearDisagreement, moveType: 'steelmanning', nextNodeId: 'clear', effects: { issueClarity: 14, mutualUnderstanding: 14, trust: 9, defensiveness: -7, loopRisk: -5 } },
          { id: 'values-impasse', text: seed.finalValueDisagreement, moveType: 'clarification', nextNodeId: 'value-impasse', effects: { issueClarity: 13, mutualUnderstanding: 9, trust: 5, defensiveness: -3 } },
          { id: 'values-dichotomy', text: 'Either you take this principle seriously or you accept the harm that follows from ignoring it.', moveType: 'false_dichotomy', nextNodeId: 'meta', effects: { issueClarity: -7, mutualUnderstanding: -5, defensiveness: 11, trust: -8, loopRisk: 10 }, annotations: { introducedMetaDispute: 'Whether the disagreement allows more than two positions' } }
        ]
      },
      correction: {
        id: 'correction', speaker: 'partner', stateLabel: 'Defensive clarification', stateKind: 'meta', text: seed.partnerCorrection,
        loopTargetNodeId: 'correction',
        responses: [
          { id: 'correction-repair', text: 'Fair — I made your position stronger than you stated it. Let me return to the narrower concern.', moveType: 'repair', nextNodeId: 'clarified', effects: { issueClarity: 12, mutualUnderstanding: 10, trust: 13, defensiveness: -14, topicDrift: -10, loopRisk: -14 } },
          { id: 'correction-lock', text: 'You can phrase it more carefully, but that is still basically what your position means.', moveType: 'interpretive_lock', nextNodeId: 'meta', effects: { issueClarity: -7, mutualUnderstanding: -11, defensiveness: 17, trust: -13, topicDrift: 9, loopRisk: 19 }, annotations: { introducedMetaDispute: `Whether ${seed.partnerName}'s clarification changes the interpretation` } }
        ]
      },
      meta: {
        id: 'meta', speaker: 'partner', stateLabel: 'Meta-disagreement', stateKind: 'meta', text: `We are spending more time arguing about what I supposedly mean and how I am arguing than about ${seed.userConcern.toLowerCase()}.`,
        loopTargetNodeId: 'correction',
        responses: [
          { id: 'meta-repair', text: 'You are right about the drift. Let us separate the claim, the evidence, and the value tradeoff.', moveType: 'repair', nextNodeId: 'clarified', effects: { issueClarity: 14, mutualUnderstanding: 9, trust: 12, defensiveness: -15, topicDrift: -14, loopRisk: -16 } },
          { id: 'meta-loop', text: 'Calling it drift is another way of avoiding the implication I am pointing out.', moveType: 'meta_argument', nextNodeId: 'loop', effects: { issueClarity: -9, defensiveness: 18, trust: -15, topicDrift: 17, loopRisk: 24 }, annotations: { introducedMetaDispute: 'Whether calling out conversational drift is itself avoidance' } },
          { id: 'meta-dismiss', text: 'If you cannot see why your reasoning is the problem, there is not much point continuing.', moveType: 'epistemic_invalidation', nextNodeId: 'breakdown', effects: { issueClarity: -10, mutualUnderstanding: -13, defensiveness: 19, trust: -19, topicDrift: 14, loopRisk: 18 } }
        ]
      },
      agreement: { id: 'agreement', speaker: 'partner', stateLabel: 'Agreement', stateKind: 'terminal', text: 'Then we have converged on a shared standard, even if the exact implementation would still need evidence.', terminalStatus: 'agreement', finalDisagreement: 'No major conceptual disagreement remains on this path.' },
      partial: { id: 'partial', speaker: 'partner', stateLabel: 'Partial agreement', stateKind: 'terminal', text: 'That sounds like a genuine partial agreement: the principle is acceptable with narrower limits around the concern you raised.', terminalStatus: 'partial-agreement', finalDisagreement: seed.userConcern },
      'evidence-impasse': { id: 'evidence-impasse', speaker: 'partner', stateLabel: 'Evidence impasse', stateKind: 'terminal', text: seed.evidenceLimit, terminalStatus: 'evidence-impasse', finalDisagreement: 'The participants agree on what evidence would matter but do not currently have enough of it.' },
      clear: { id: 'clear', speaker: 'partner', stateLabel: 'Clear disagreement', stateKind: 'terminal', text: 'That seems like the real disagreement. We understand the tradeoff, but we weight it differently.', terminalStatus: 'clear-disagreement', finalDisagreement: seed.finalClearDisagreement },
      'value-impasse': { id: 'value-impasse', speaker: 'partner', stateLabel: 'Value impasse', stateKind: 'terminal', text: 'Then the remaining difference is mainly about which value should take priority, not about misunderstanding each other.', terminalStatus: 'value-impasse', finalDisagreement: seed.finalValueDisagreement },
      breakdown: { id: 'breakdown', speaker: 'partner', stateLabel: 'Breakdown', stateKind: 'terminal', text: 'The conversation is now mostly about whether one of us is capable of discussing the issue fairly.', terminalStatus: 'breakdown', finalDisagreement: 'The original proposition has been displaced by a dispute about the participants.' },
      loop: { id: 'loop', speaker: 'partner', stateLabel: 'Loop', stateKind: 'terminal', text: 'We have returned to the same interpretive dispute: I clarify the position, and the clarification is treated as further evidence for the original interpretation.', terminalStatus: 'loop', finalDisagreement: 'Whether clarification is allowed to update the interpretation of the other participant’s position.' }
    }
  }
}
