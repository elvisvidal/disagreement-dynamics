import type { ConversationScenario } from '~/domain/conversation'

export const aiArt: ConversationScenario = {
  id: 'ai-art',
  title: 'AI-generated art',
  description: 'A disagreement about public access, consent, markets, attribution, and creative control.',
  proposition: 'Should AI companies be allowed to train generative models on publicly accessible artwork without explicit permission from every artist?',
  partner: {
    name: 'Jordan',
    position: 'Jordan believes creators should have more control over whether their work is used for AI training.'
  },
  initialNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      speaker: 'partner',
      stateLabel: 'Original claim',
      stateKind: 'original',
      text: 'Publicly accessible does not mean free for any commercial use. Artists should have more control over whether their work trains AI systems.',
      responses: [
        { id: 's-a', text: 'What kind of control do you mean: permission, payment, opt-out, or attribution?', moveType: 'clarification', nextNodeId: 'control-types', effects: { issueClarity: 13, mutualUnderstanding: 8, trust: 5 } },
        { id: 's-b', text: 'So you want to make learning from art illegal?', moveType: 'position_exaggeration', nextNodeId: 'not-learning', effects: { issueClarity: -8, defensiveness: 15, trust: -12, topicDrift: 10, loopRisk: 16 }, annotations: { introducedMetaDispute: 'Whether Jordan wants to make learning from art illegal' } },
        { id: 's-c', text: 'I see the consent concern, but public culture also depends on people learning from prior work.', moveType: 'acknowledgement', nextNodeId: 'learning-distinction', effects: { issueClarity: 9, mutualUnderstanding: 10, trust: 7, defensiveness: -5 } },
        { id: 's-d', text: 'Is the harm mainly market substitution, lack of consent, or unattributed style imitation?', moveType: 'curiosity', nextNodeId: 'harm-types', effects: { issueClarity: 12, mutualUnderstanding: 10, trust: 6 } }
      ]
    },
    'control-types': {
      id: 'control-types',
      speaker: 'partner',
      stateLabel: 'Clarification',
      stateKind: 'clarification',
      text: 'At minimum, meaningful opt-outs and transparency. For commercial models, maybe licensing or collective compensation.',
      responses: [
        { id: 'ct-a', text: 'That is more specific. I worry permission for every work would make training impossible.', moveType: 'acknowledgement', nextNodeId: 'scale-problem', effects: { issueClarity: 11, mutualUnderstanding: 8, trust: 6 } },
        { id: 'ct-b', text: 'What evidence would show whether opt-outs actually protect artists?', moveType: 'evidence_request', nextNodeId: 'evidence', effects: { issueClarity: 8, topicDrift: -2 } },
        { id: 'ct-c', text: 'Licensing sounds like giving incumbents a veto over new tools.', moveType: 'respectful_challenge', nextNodeId: 'innovation-values', effects: { issueClarity: 8, defensiveness: 3 } }
      ]
    },
    'learning-distinction': {
      id: 'learning-distinction',
      speaker: 'partner',
      stateLabel: 'Core distinction',
      stateKind: 'clarification',
      text: 'I agree artists learn from art. A commercial system copying patterns at scale feels different from a person developing taste and skill.',
      responses: [
        { id: 'ld-a', text: 'So the strongest version is that scale and commercial extraction change the moral category.', moveType: 'steelmanning', nextNodeId: 'innovation-values', effects: { issueClarity: 13, mutualUnderstanding: 14, trust: 9, defensiveness: -5 } },
        { id: 'ld-b', text: 'I am not sure scale alone creates a new right. What makes it decisive?', moveType: 'respectful_challenge', nextNodeId: 'scale-problem', effects: { issueClarity: 9, mutualUnderstanding: 4 } },
        { id: 'ld-c', text: "That distinction just protects human artists from competition they don't like.", moveType: 'motive_attribution', nextNodeId: 'bad-faith', effects: { issueClarity: -7, defensiveness: 15, trust: -13, topicDrift: 10, loopRisk: 14 }, annotations: { introducedMetaDispute: 'Whether Jordan is motivated by fear of competition' } }
      ]
    },
    'harm-types': {
      id: 'harm-types',
      speaker: 'partner',
      stateLabel: 'Clarification',
      stateKind: 'clarification',
      text: 'All three can matter, but I would separate them. Consent is the baseline; market harm and style imitation affect remedies.',
      responses: [
        { id: 'ht-a', text: 'That helps. I might accept transparency and opt-out while resisting permission for every work.', moveType: 'concession', nextNodeId: 'partial', effects: { issueClarity: 13, mutualUnderstanding: 10, trust: 8, defensiveness: -6 }, annotations: { resolvedClaim: 'Whether every remedy must require permission for every work' } },
        { id: 'ht-b', text: 'Can we actually measure market harm from training data separately from general automation?', moveType: 'evidence_request', nextNodeId: 'evidence', effects: { issueClarity: 9, mutualUnderstanding: 4 } },
        { id: 'ht-c', text: 'If consent is baseline, are search engines and archives also violating consent?', moveType: 'respectful_challenge', nextNodeId: 'analogy', effects: { issueClarity: 8, defensiveness: 3 } }
      ]
    },
    'scale-problem': {
      id: 'scale-problem',
      speaker: 'partner',
      stateLabel: 'Scale dispute',
      stateKind: 'challenge',
      text: 'I agree individual permission for every image may be impractical. But impracticality does not automatically erase the creator interest.',
      responses: [
        { id: 'sp-a', text: 'Then we are debating remedy design, not whether artists have any legitimate interest.', moveType: 'clarification', nextNodeId: 'partial', effects: { issueClarity: 14, mutualUnderstanding: 9, trust: 6 } },
        { id: 'sp-b', text: 'If no workable remedy exists, I think training should remain allowed by default.', moveType: 'respectful_challenge', nextNodeId: 'clear', effects: { issueClarity: 11, mutualUnderstanding: 6 } },
        { id: 'sp-c', text: 'That sounds like wanting control without accepting the cost of control.', moveType: 'presuppositional_accusation', nextNodeId: 'bad-faith', effects: { issueClarity: -7, defensiveness: 16, trust: -13, topicDrift: 12, loopRisk: 15 }, annotations: { introducedMetaDispute: 'Whether Jordan wants control without tradeoffs' } }
      ]
    },
    analogy: {
      id: 'analogy',
      speaker: 'partner',
      stateLabel: 'Analogy test',
      stateKind: 'evidence',
      text: 'Good analogy. Search points people back to the work; generative models can substitute for it. But the boundary is not obvious.',
      responses: [
        { id: 'an-a', text: 'Then we need evidence about substitution and attribution before drawing the boundary.', moveType: 'evidence_request', nextNodeId: 'evidence-impasse', effects: { issueClarity: 13, mutualUnderstanding: 9, trust: 5 } },
        { id: 'an-b', text: 'Even if the boundary is fuzzy, I still value open learning from public culture.', moveType: 'clarification', nextNodeId: 'value', effects: { issueClarity: 11, mutualUnderstanding: 7 } },
        { id: 'an-c', text: 'If the boundary is not obvious, your rule is just vibes.', moveType: 'sarcasm', nextNodeId: 'breakdown', effects: { issueClarity: -8, defensiveness: 15, trust: -14, topicDrift: 11, loopRisk: 14 }, annotations: { introducedMetaDispute: 'Whether Jordan’s boundary is arbitrary' } }
      ]
    },
    evidence: {
      id: 'evidence',
      speaker: 'partner',
      stateLabel: 'Evidence limit',
      stateKind: 'evidence',
      text: 'We would need model-specific data: opt-out compliance, market effects, style imitation, and whether attribution changes behavior.',
      responses: [
        { id: 'e-a', text: 'Then this is an evidence impasse until those effects are measured better.', moveType: 'acknowledgement', nextNodeId: 'evidence-impasse', effects: { issueClarity: 13, mutualUnderstanding: 10, trust: 6, defensiveness: -4 } },
        { id: 'e-b', text: 'Even without full evidence, I prioritize creator consent over training efficiency.', moveType: 'clarification', nextNodeId: 'value', effects: { issueClarity: 10, mutualUnderstanding: 7 } },
        { id: 'e-c', text: 'You are moving to evidence because the consent argument is too broad.', moveType: 'meta_argument', nextNodeId: 'bad-faith', effects: { issueClarity: -7, defensiveness: 15, trust: -12, topicDrift: 13, loopRisk: 15 }, annotations: { introducedMetaDispute: 'Whether Jordan is retreating from consent to evidence' } }
      ]
    },
    'innovation-values': {
      id: 'innovation-values',
      speaker: 'partner',
      stateLabel: 'Values tradeoff',
      stateKind: 'values',
      text: 'That may be the core tradeoff: I worry about extraction without consent; you worry about restricting cultural learning and innovation.',
      responses: [
        { id: 'iv-a', text: 'Yes. I think I give open learning more weight, while you give consent more weight.', moveType: 'clarification', nextNodeId: 'clear', effects: { issueClarity: 14, mutualUnderstanding: 10, trust: 6, defensiveness: -4 } },
        { id: 'iv-b', text: 'Maybe we can agree on transparency and opt-out while leaving licensing disputed.', moveType: 'concession', nextNodeId: 'partial', effects: { issueClarity: 13, mutualUnderstanding: 11, trust: 8, defensiveness: -6 } },
        { id: 'iv-c', text: 'Innovation is not a magic word that lets companies take whatever they want.', moveType: 'universalization', nextNodeId: 'breakdown', effects: { issueClarity: -5, defensiveness: 12, trust: -9, topicDrift: 9, loopRisk: 11 } }
      ]
    },
    'not-learning': {
      id: 'not-learning',
      speaker: 'partner',
      stateLabel: 'Defensive clarification',
      stateKind: 'meta',
      text: "No. I'm not trying to ban learning from art. I'm questioning commercial training on people's work without permission or recourse.",
      responses: [
        { id: 'nl-a', text: 'Fair. I overstated it. What control would be enough?', moveType: 'repair', nextNodeId: 'control-types', effects: { issueClarity: 12, mutualUnderstanding: 8, trust: 12, defensiveness: -13, topicDrift: -10, loopRisk: -12 } },
        { id: 'nl-b', text: 'That is still a ban on learning once a computer does it.', moveType: 'interpretive_lock', nextNodeId: 'bad-faith', effects: { issueClarity: -8, mutualUnderstanding: -9, defensiveness: 16, trust: -13, loopRisk: 17 }, annotations: { introducedMetaDispute: 'Whether the user is refusing Jordan’s distinction' } }
      ]
    },
    'bad-faith': {
      id: 'bad-faith',
      speaker: 'partner',
      stateLabel: 'Meta-argument',
      stateKind: 'meta',
      text: "I think you're replacing my claim with a less reasonable one. Then I have to defend a position I do not hold.",
      loopTargetNodeId: 'not-learning',
      responses: [
        { id: 'bf-a', text: 'You keep narrowing the claim whenever it faces an objection.', moveType: 'meta_argument', nextNodeId: 'loop', effects: { issueClarity: -8, defensiveness: 17, trust: -14, topicDrift: 16, loopRisk: 22 }, annotations: { introducedMetaDispute: 'Whether Jordan is narrowing the claim to avoid objections' } },
        { id: 'bf-b', text: 'That is fair. I should separate human learning, model training, and commercial use.', moveType: 'repair', nextNodeId: 'learning-distinction', effects: { issueClarity: 13, mutualUnderstanding: 9, trust: 13, defensiveness: -15, topicDrift: -13, loopRisk: -15 } }
      ]
    },
    partial: { id: 'partial', speaker: 'partner', stateLabel: 'Partial agreement', stateKind: 'terminal', text: 'That is partial agreement: transparency and opt-outs seem reasonable, while licensing and permission remain disputed.', terminalStatus: 'partial-agreement', finalDisagreement: 'Whether commercial model training should require licensing or permission beyond transparency and opt-out.' },
    clear: { id: 'clear', speaker: 'partner', stateLabel: 'Clear disagreement', stateKind: 'terminal', text: 'We understand the tradeoff. You prioritize open learning from public culture; I prioritize creator control over commercial training.', terminalStatus: 'clear-disagreement', finalDisagreement: 'How to weigh open cultural learning against creator consent and control.' },
    value: { id: 'value', speaker: 'partner', stateLabel: 'Value impasse', stateKind: 'terminal', text: 'That is a value impasse: the same uncertainty leads us to prioritize different rights and risks.', terminalStatus: 'value-impasse', finalDisagreement: 'Whether consent or openness should control when evidence remains incomplete.' },
    'evidence-impasse': { id: 'evidence-impasse', speaker: 'partner', stateLabel: 'Evidence impasse', stateKind: 'terminal', text: 'Then the next useful move is evidence, not more certainty from either of us.', terminalStatus: 'evidence-impasse', finalDisagreement: 'Whether training causes measurable substitution, style imitation, or harm that policy can target.' },
    breakdown: { id: 'breakdown', speaker: 'partner', stateLabel: 'Breakdown', stateKind: 'terminal', text: 'Now we are mostly debating whether my concern is arbitrary or anti-innovation.', terminalStatus: 'breakdown', finalDisagreement: 'The exchange shifted from model training policy into legitimacy and motives.' },
    loop: { id: 'loop', speaker: 'partner', stateLabel: 'Loop', stateKind: 'terminal', text: 'We keep returning to whether I am banning learning or merely asking for control over commercial training.', terminalStatus: 'loop', finalDisagreement: 'Whether Jordan’s distinction between learning and commercial model training should be accepted.' }
  }
}
