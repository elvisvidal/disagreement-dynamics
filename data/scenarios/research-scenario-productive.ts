import type { ConversationNode } from '~/domain/conversation'
import type { ScenarioCopy } from './research-scenario-helpers'
import { researchResponse } from './research-scenario-helpers'

export function buildResearchProductiveNodes(copy: ScenarioCopy): Record<string, ConversationNode> {
  const metaClaim = `Whether ${copy.partner.name} is being represented fairly`
  return {
    start: {
      id: 'start',
      speaker: 'partner',
      text: copy.opening,
      stateLabel: 'Original position',
      stateKind: 'original',
      responses: [
        researchResponse('start-curious', copy.curiosityPrompt, 'curiosity', 'clarification', 'You ask for the structure of the concern before challenging it.'),
        researchResponse('start-exaggerate', copy.exaggerationPrompt, 'position_exaggeration', 'correction', 'You transform the stated position into a stronger claim that the partner did not explicitly make.', { introducedMetaDispute: metaClaim }),
        researchResponse('start-challenge', copy.challengePrompt, 'respectful_challenge', 'challenge', 'You disagree directly but keep the objection attached to the policy claim.'),
        researchResponse('start-evidence', copy.evidencePrompt, 'evidence_request', 'evidence', 'You ask what evidence would support the partner’s concern.')
      ]
    },
    clarification: {
      id: 'clarification',
      speaker: 'partner',
      text: copy.clarification,
      stateLabel: 'Clarified concern',
      stateKind: 'clarification',
      responses: [
        researchResponse('clarify-principle', copy.principleQuestion, 'principle_probe', 'principle', 'You move from the surface policy to the value or rule underneath it.'),
        researchResponse('clarify-scope', copy.scopeQuestion, 'scope_narrowing', 'scope', 'You reduce the conversation to a smaller claim that can be examined separately.'),
        researchResponse('clarify-motive', `That sounds less like a principle and more like you wanting your side to win.`, 'motive_attribution', 'motive', 'You replace the stated reason with a guessed motive.', { introducedMetaDispute: `Whether ${copy.partner.name}'s motive is the real issue` })
      ]
    },
    scope: {
      id: 'scope',
      speaker: 'partner',
      text: `Yes. If we keep it to that narrower question, I think we can disagree without pretending every related issue has to be settled too.`,
      stateLabel: 'Narrowed scope',
      stateKind: 'clarification',
      responses: [
        researchResponse('scope-reflect', copy.reflectiveText, 'reflective_listening', 'principle', 'You restate the narrower concern and leave room for correction.'),
        researchResponse('scope-evidence', copy.evidenceFollowUp, 'evidence_request', 'evidence', 'You ask what information could change the narrower claim.'),
        researchResponse('scope-drift', `But if we are talking about this, we also have to settle the whole broader political issue around it.`, 'topic_shift', 'drift', 'You expand the conversation beyond the narrowed proposition before resolving it.', { introducedClaim: `A broader political dispute related to ${copy.title}` })
      ]
    },
    principle: {
      id: 'principle',
      speaker: 'partner',
      text: copy.principle,
      stateLabel: 'Underlying principle',
      stateKind: 'values',
      responses: [
        researchResponse('principle-challenge', copy.valueChallenge, 'respectful_challenge', 'tradeoff', 'You challenge the principle by introducing a competing value without dismissing it.'),
        researchResponse('principle-ack', `I can see why that principle matters even though I do not think it settles the policy.`, 'acknowledgement', 'tradeoff', 'You acknowledge the principle while preserving disagreement.'),
        researchResponse('principle-binary', `Either that principle always wins or it is not really a principle at all. Which is it?`, 'false_dichotomy', 'correction', 'You compress a tradeoff into two absolute options.', { introducedMetaDispute: `Whether ${copy.partner.name}'s principle must apply without exceptions` })
      ]
    },
    tradeoff: {
      id: 'tradeoff',
      speaker: 'partner',
      text: copy.tradeoff,
      stateLabel: 'Tradeoff identified',
      stateKind: 'values',
      responses: [
        researchResponse('tradeoff-reflect', copy.reflectiveText, 'reflective_listening', 'common-ground', 'You check whether you understand the tradeoff before pressing the disagreement.'),
        researchResponse('tradeoff-scope', copy.scopeNarrowingText, 'scope_narrowing', 'common-ground', 'You identify the specific tradeoff that actually needs resolution.'),
        researchResponse('tradeoff-sarcasm', `Right, so the answer is apparently that every competing concern just disappears when your principle shows up.`, 'sarcasm', 'tone', 'You use ridicule, making tone and fairness newly disputable.', { introducedMetaDispute: `Whether the exchange has become dismissive` })
      ]
    },
    evidence: {
      id: 'evidence',
      speaker: 'partner',
      text: copy.evidence,
      stateLabel: 'Evidence question',
      stateKind: 'evidence',
      responses: [
        researchResponse('evidence-follow', copy.evidenceFollowUp, 'evidence_request', 'evidence-limit', 'You ask what observation would distinguish the competing predictions.'),
        researchResponse('evidence-goalpost', `Even if that evidence came out your way, I would still need you to prove the broader case too.`, 'goalpost_shift', 'drift', 'You change the standard for resolution before closing the current evidence question.', { introducedClaim: `A broader standard of proof for ${copy.title}` }),
        researchResponse('evidence-invalidate', `If you trust that kind of evidence, I do not think you are looking at this objectively.`, 'epistemic_invalidation', 'motive', 'You question the partner’s capacity to reason instead of the evidence itself.', { introducedMetaDispute: `Whether ${copy.partner.name} is reasoning objectively` })
      ]
    },
    'evidence-limit': {
      id: 'evidence-limit',
      speaker: 'partner',
      text: copy.evidenceLimit,
      stateLabel: 'Evidence limit',
      stateKind: 'evidence',
      responses: [
        researchResponse('limit-concede', copy.concessionText, 'concession', 'evidence-terminal', 'You recognize what the available evidence can and cannot establish.'),
        researchResponse('limit-principle', `Then maybe our real disagreement is not empirical. Which value should decide when evidence cannot settle it?`, 'principle_probe', 'principle', 'You identify a possible transition from factual uncertainty to a value disagreement.'),
        researchResponse('limit-burden', `Until you can prove your prediction will not cause harm, your position should lose by default.`, 'burden_shift', 'burden', 'You assign one side an open-ended burden to disprove a future risk.')
      ]
    },
    challenge: {
      id: 'challenge',
      speaker: 'partner',
      text: copy.challenge,
      stateLabel: 'Substantive challenge',
      stateKind: 'challenge',
      responses: [
        researchResponse('challenge-clarify', `I may be combining two concerns. Which part of my objection are you actually rejecting?`, 'clarification', 'tradeoff', 'You separate your objection into parts instead of escalating it.'),
        researchResponse('challenge-burden', `Can you prove there is no realistic case where your position makes things worse?`, 'burden_shift', 'burden', 'You require the partner to rule out every adverse case.'),
        researchResponse('challenge-sarcasm', `Convenient. Your position gets all the benefits and apparently none of the costs.`, 'sarcasm', 'tone', 'You turn a policy challenge into a tone-sensitive exchange.', { introducedMetaDispute: `Whether the objection is being treated seriously` })
      ]
    }
  }
}
