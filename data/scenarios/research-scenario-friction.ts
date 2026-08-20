import type { ConversationNode } from '~/domain/conversation'
import type { ScenarioCopy } from './research-scenario-helpers'
import { researchResponse } from './research-scenario-helpers'

export function buildResearchFrictionNodes(copy: ScenarioCopy): Record<string, ConversationNode> {
  const originalClaim = copy.proposition
  const metaClaim = `Whether ${copy.partner.name} is being represented fairly`
  return {
    correction: {
      id: 'correction',
      speaker: 'partner',
      text: copy.correction,
      stateLabel: 'Correction attempt',
      stateKind: 'meta',
      responses: [
        researchResponse('correction-repair', copy.repairText, 'repair', 'repair', 'You accept the correction and explicitly return to the stated position.', undefined, { topicDrift: -12, loopRisk: -14 }),
        researchResponse('correction-lock', `You can call it a correction, but that is still basically what your position means.`, 'interpretive_lock', 'locked', 'You reject the speaker’s attempt to define their own claim.', { introducedMetaDispute: metaClaim }),
        researchResponse('correction-accuse', `Why is it so difficult for you to admit the implication of what you are saying?`, 'presuppositional_accusation', 'motive', 'The question presupposes that the disputed implication is already established.', { introducedMetaDispute: `Whether ${copy.partner.name} is refusing to admit an implication` })
      ]
    },
    locked: {
      id: 'locked',
      speaker: 'partner',
      text: copy.locked,
      stateLabel: 'Interpretation dispute',
      stateKind: 'loop',
      responses: [
        researchResponse('locked-meta', `The problem is that you keep hiding behind wording instead of owning your argument.`, 'meta_argument', 'meta', 'The conversation moves from the policy to how the partner is arguing.', { introducedMetaDispute: `Whether ${copy.partner.name} is hiding behind wording` }),
        researchResponse('locked-universal', `You always do this: state something strong and then retreat when challenged.`, 'universalization', 'meta', 'You generalize from this turn to a broader pattern about the person.', { introducedMetaDispute: `Whether ${copy.partner.name} habitually retreats from claims` }),
        researchResponse('locked-repair', copy.repairText, 'repair', 'repair', 'You reopen the possibility that the partner’s clarification changes what must be answered.')
      ]
    },
    meta: {
      id: 'meta',
      speaker: 'partner',
      text: copy.meta,
      stateLabel: 'Meta-disagreement',
      stateKind: 'meta',
      responses: [
        researchResponse('meta-lock', `But you are still avoiding what your position really implies.`, 'interpretive_lock', 'correction', 'You return to the same disputed interpretation, recreating the earlier state.', { returnsToClaim: originalClaim, introducedMetaDispute: metaClaim }, { loopRisk: 20 }),
        researchResponse('meta-repair', `Fair. We are arguing about the argument now. Let me restate your actual claim before I respond.`, 'repair', 'repair', 'You name the meta-conflict and attempt to exit it.', undefined, { loopRisk: -16, topicDrift: -14 }),
        researchResponse('meta-invalidate', `If you cannot see why this is evasive, I do not think this conversation can go anywhere.`, 'epistemic_invalidation', 'breakdown-terminal', 'You make the partner’s reasoning ability the terminal issue.', { introducedMetaDispute: `Whether productive discussion is possible` })
      ]
    },
    repair: {
      id: 'repair',
      speaker: 'partner',
      text: copy.repair,
      stateLabel: 'Repair accepted',
      stateKind: 'clarification',
      responses: [
        researchResponse('repair-reflect', copy.reflectiveText, 'reflective_listening', 'common-ground', 'You verify the repaired understanding before continuing.'),
        researchResponse('repair-curious', `What would you want to understand about my concern before we decide where we disagree?`, 'curiosity', 'curiosity-terminal', 'You shift from defending positions to identifying what each side still needs to understand.'),
        researchResponse('repair-challenge', copy.valueChallenge, 'direct_challenge', 'tradeoff', 'You return to the substantive disagreement after repairing the representation problem.')
      ]
    },
    motive: {
      id: 'motive',
      speaker: 'partner',
      text: copy.motive,
      stateLabel: 'Motive dispute',
      stateKind: 'meta',
      responses: [
        researchResponse('motive-repair', `You are right that I guessed your motive. Let me drop that and respond to the reason you actually gave.`, 'repair', 'repair', 'You withdraw an unsupported motive attribution and restore the original issue.'),
        researchResponse('motive-meta', `Your defensiveness about your motive is part of why I do not trust the argument.`, 'meta_argument', 'meta', 'The denial of a motive becomes new evidence in the motive dispute.', { introducedMetaDispute: `Whether defensiveness proves the attributed motive` }),
        researchResponse('motive-invalidate', `That answer just confirms you are too invested in this to evaluate it fairly.`, 'epistemic_invalidation', 'breakdown-terminal', 'The partner’s response is treated as confirmation of their inability to reason fairly.', { introducedMetaDispute: `Whether investment in the topic disqualifies the argument` })
      ]
    },
    drift: {
      id: 'drift',
      speaker: 'partner',
      text: copy.drift,
      stateLabel: 'Topic drift',
      stateKind: 'drift',
      responses: [
        researchResponse('drift-narrow', copy.scopeNarrowingText, 'scope_narrowing', 'challenge', 'You deliberately return to the bounded proposition.'),
        researchResponse('drift-more', `They are connected, so I think we have to settle all of them before this point counts.`, 'topic_shift', 'breakdown-terminal', 'The resolution condition expands faster than the discussion can resolve claims.', { introducedClaim: `Additional unresolved issues surrounding ${copy.title}` }),
        researchResponse('drift-repair', `We have moved pretty far from the original question. Can we go back to the first claim?`, 'repair', 'clarification', 'You identify topic drift and return to the initial issue.', { returnsToClaim: originalClaim })
      ]
    },
    burden: {
      id: 'burden',
      speaker: 'partner',
      text: copy.burden,
      stateLabel: 'Burden dispute',
      stateKind: 'evidence',
      responses: [
        researchResponse('burden-evidence', `Then what evidence would each of us accept as enough to update our prediction?`, 'evidence_request', 'evidence-limit', 'You make the standard of evidence reciprocal and explicit.'),
        researchResponse('burden-repair', `That is fair; I asked you to disprove an open-ended risk. Let me state what evidence would change my mind.`, 'repair', 'evidence', 'You repair the burden-of-proof problem and return to falsifiable evidence.'),
        researchResponse('burden-goalpost', `If you cannot rule out the worst case, I do not see why we should discuss probabilities at all.`, 'goalpost_shift', 'drift', 'You replace a comparative evidence standard with certainty.')
      ]
    },
    tone: {
      id: 'tone',
      speaker: 'partner',
      text: copy.tone,
      stateLabel: 'Tone dispute',
      stateKind: 'meta',
      responses: [
        researchResponse('tone-repair', `That was sarcastic. Let me put the objection without the jab.`, 'repair', 'repair', 'You repair the tone rupture without withdrawing the substantive disagreement.'),
        researchResponse('tone-meta', `If you focused on the argument instead of my tone, we might get somewhere.`, 'meta_argument', 'meta', 'The exchange becomes a dispute about which conversational problem matters more.', { introducedMetaDispute: `Whether tone or substance is blocking the conversation` }),
        researchResponse('tone-sarcasm', `Sure, because tone is obviously the biggest issue here.`, 'sarcasm', 'breakdown-terminal', 'You answer the tone rupture with another tone rupture.')
      ]
    }
  }
}
