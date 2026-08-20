import type { ConversationScenario } from '~/domain/conversation'

export const remoteWork: ConversationScenario = {
  id: 'remote-work',
  title: 'Remote work',
  description: 'A disagreement about autonomy, coordination, evidence, and workplace fairness.',
  proposition: 'Should companies allow employees to work remotely whenever their role permits it?',
  partner: {
    name: 'Alex',
    position: 'Alex believes companies should generally allow remote work when the job can be performed remotely.'
  },
  initialNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      speaker: 'partner',
      stateLabel: 'Original claim',
      stateKind: 'original',
      text: 'If the job can be done remotely, I think the default should be allowing it unless there is a clear business reason not to.',
      responses: [
        { id: 's-a', text: 'What counts as a clear business reason to you?', moveType: 'clarification', nextNodeId: 'business-reason', effects: { issueClarity: 12, mutualUnderstanding: 7, trust: 4 } },
        { id: 's-b', text: 'So managers should just stop caring whether teams coordinate well?', moveType: 'position_exaggeration', nextNodeId: 'not-stop-caring', effects: { issueClarity: -7, defensiveness: 15, trust: -11, topicDrift: 10, loopRisk: 15 }, annotations: { introducedMetaDispute: 'Whether Alex dismisses coordination concerns' } },
        { id: 's-c', text: 'I see the autonomy argument, but I worry about mentoring and team learning.', moveType: 'acknowledgement', nextNodeId: 'mentoring', effects: { issueClarity: 9, mutualUnderstanding: 10, trust: 7, defensiveness: -5 } },
        { id: 's-d', text: 'Remote work mostly benefits people who already have comfortable home setups.', moveType: 'direct_challenge', nextNodeId: 'fairness', effects: { issueClarity: 6, defensiveness: 4, trust: -2 }, annotations: { introducedClaim: 'Whether remote policy creates fairness problems across employees' } }
      ]
    },
    'business-reason': {
      id: 'business-reason',
      speaker: 'partner',
      stateLabel: 'Clarification',
      stateKind: 'clarification',
      text: 'Things like security, hands-on equipment, unusually high coordination costs, or onboarding needs. I just dislike vague culture claims.',
      responses: [
        { id: 'br-a', text: 'That seems narrower than I expected. My concern is whether coordination costs are often underestimated.', moveType: 'acknowledgement', nextNodeId: 'coordination-evidence', effects: { issueClarity: 11, mutualUnderstanding: 9, trust: 6 } },
        { id: 'br-b', text: 'Can productivity and retention data actually distinguish remote work from other factors?', moveType: 'evidence_request', nextNodeId: 'evidence', effects: { issueClarity: 8, topicDrift: -2 } },
        { id: 'br-c', text: 'Vague culture claims are still real if leaders cannot quantify them.', moveType: 'respectful_challenge', nextNodeId: 'culture-values', effects: { issueClarity: 7, defensiveness: 3 } }
      ]
    },
    mentoring: {
      id: 'mentoring',
      speaker: 'partner',
      stateLabel: 'Challenge',
      stateKind: 'challenge',
      text: 'That is a fair concern. I would treat mentoring as a design problem, not an automatic reason to require everyone in the office.',
      responses: [
        { id: 'm-a', text: 'Maybe the policy should vary by career stage instead of being one rule for everyone.', moveType: 'clarification', nextNodeId: 'partial', effects: { issueClarity: 13, mutualUnderstanding: 8, trust: 6 }, annotations: { resolvedClaim: 'Whether every remote-capable role should follow the same rule' } },
        { id: 'm-b', text: 'What evidence would show mentoring is working remotely?', moveType: 'evidence_request', nextNodeId: 'evidence', effects: { issueClarity: 9, mutualUnderstanding: 4 } },
        { id: 'm-c', text: 'Calling it a design problem avoids the reality that people learn by being around others.', moveType: 'motive_attribution', nextNodeId: 'avoidance', effects: { issueClarity: -6, defensiveness: 14, trust: -12, topicDrift: 9, loopRisk: 13 }, annotations: { introducedMetaDispute: 'Whether Alex is avoiding the mentoring concern' } }
      ]
    },
    fairness: {
      id: 'fairness',
      speaker: 'partner',
      stateLabel: 'Fairness',
      stateKind: 'values',
      text: 'That matters. But forcing everyone into the office can also burden caregivers, disabled workers, and people with long commutes.',
      responses: [
        { id: 'f-a', text: 'So we are balancing different fairness concerns, not deciding whether fairness matters.', moveType: 'steelmanning', nextNodeId: 'value', effects: { issueClarity: 14, mutualUnderstanding: 13, trust: 9, defensiveness: -5 } },
        { id: 'f-b', text: 'That turns every personal constraint into a company obligation.', moveType: 'universalization', nextNodeId: 'not-every', effects: { issueClarity: -5, defensiveness: 11, trust: -7, loopRisk: 9 } },
        { id: 'f-c', text: 'We would need to know who benefits and who is excluded by each policy.', moveType: 'evidence_request', nextNodeId: 'evidence', effects: { issueClarity: 10, mutualUnderstanding: 5 } }
      ]
    },
    'coordination-evidence': {
      id: 'coordination-evidence',
      speaker: 'partner',
      stateLabel: 'Evidence discussion',
      stateKind: 'evidence',
      text: 'Agreed. I would want teams to track cycle time, onboarding outcomes, retention, and employee preference rather than rely on anecdotes.',
      responses: [
        { id: 'ce-a', text: 'Then we agree the rule should be conditional on observable team outcomes.', moveType: 'concession', nextNodeId: 'agreement', effects: { issueClarity: 14, mutualUnderstanding: 12, trust: 9, defensiveness: -6 } },
        { id: 'ce-b', text: 'Those measures still may not capture trust and spontaneous learning.', moveType: 'respectful_challenge', nextNodeId: 'culture-values', effects: { issueClarity: 8, defensiveness: 2 } },
        { id: 'ce-c', text: 'If the data is mixed, I think leadership judgment has to decide.', moveType: 'clarification', nextNodeId: 'value', effects: { issueClarity: 10, mutualUnderstanding: 6 } }
      ]
    },
    evidence: {
      id: 'evidence',
      speaker: 'partner',
      stateLabel: 'Evidence limit',
      stateKind: 'evidence',
      text: 'Evidence would be messy: role type, manager quality, home setup, and team maturity all interact.',
      responses: [
        { id: 'e-a', text: 'Then this may be an evidence impasse until a specific company can compare outcomes.', moveType: 'acknowledgement', nextNodeId: 'evidence-impasse', effects: { issueClarity: 13, mutualUnderstanding: 10, trust: 6, defensiveness: -4 } },
        { id: 'e-b', text: 'Even with messy evidence, I value employee autonomy as the default.', moveType: 'clarification', nextNodeId: 'value', effects: { issueClarity: 10, mutualUnderstanding: 7 } },
        { id: 'e-c', text: 'Messy evidence is a convenient excuse to keep your preferred answer.', moveType: 'motive_attribution', nextNodeId: 'avoidance', effects: { issueClarity: -7, defensiveness: 15, trust: -13, topicDrift: 11, loopRisk: 14 }, annotations: { introducedMetaDispute: 'Whether Alex is using uncertainty as an excuse' } }
      ]
    },
    'culture-values': {
      id: 'culture-values',
      speaker: 'partner',
      stateLabel: 'Values tradeoff',
      stateKind: 'values',
      text: 'Maybe this is where values enter. I give individual autonomy more weight unless the organization can name a concrete cost.',
      responses: [
        { id: 'cv-a', text: 'I give shared learning and coordination more weight, even when the cost is hard to measure.', moveType: 'clarification', nextNodeId: 'clear', effects: { issueClarity: 14, mutualUnderstanding: 9, trust: 5, defensiveness: -3 } },
        { id: 'cv-b', text: 'I can accept remote as a default with required in-person periods for onboarding.', moveType: 'concession', nextNodeId: 'partial', effects: { issueClarity: 12, mutualUnderstanding: 11, trust: 8, defensiveness: -6 } },
        { id: 'cv-c', text: 'That just means you care more about convenience than work quality.', moveType: 'epistemic_invalidation', nextNodeId: 'breakdown', effects: { issueClarity: -9, mutualUnderstanding: -12, defensiveness: 18, trust: -18, topicDrift: 12, loopRisk: 16 }, annotations: { introducedMetaDispute: 'Whether Alex cares about work quality' } }
      ]
    },
    'not-stop-caring': {
      id: 'not-stop-caring',
      speaker: 'partner',
      stateLabel: 'Defensive clarification',
      stateKind: 'meta',
      text: "No. I'm saying coordination costs should be demonstrated, not assumed.",
      responses: [
        { id: 'nsc-a', text: 'Fair. I overstated it. What coordination costs would count?', moveType: 'repair', nextNodeId: 'business-reason', effects: { issueClarity: 12, mutualUnderstanding: 8, trust: 12, defensiveness: -13, topicDrift: -9, loopRisk: -12 } },
        { id: 'nsc-b', text: 'That is just another way of dismissing managers who see the problem.', moveType: 'interpretive_lock', nextNodeId: 'avoidance', effects: { issueClarity: -7, defensiveness: 15, trust: -12, loopRisk: 16 }, annotations: { introducedMetaDispute: 'Whether Alex dismisses managerial judgment' } }
      ]
    },
    avoidance: {
      id: 'avoidance',
      speaker: 'partner',
      stateLabel: 'Meta-argument',
      stateKind: 'meta',
      text: "I don't think you're responding to my actual claim anymore. You're treating my standard as bad faith.",
      loopTargetNodeId: 'not-stop-caring',
      responses: [
        { id: 'av-a', text: 'You keep reframing this as a misunderstanding instead of answering the concern.', moveType: 'meta_argument', nextNodeId: 'loop', effects: { issueClarity: -8, defensiveness: 17, trust: -14, topicDrift: 16, loopRisk: 22 }, annotations: { introducedMetaDispute: 'Whether Alex is using misunderstanding claims to avoid the concern' } },
        { id: 'av-b', text: 'You are right. Let me separate evidence, values, and implementation.', moveType: 'repair', nextNodeId: 'business-reason', effects: { issueClarity: 13, mutualUnderstanding: 9, trust: 13, defensiveness: -15, topicDrift: -13, loopRisk: -15 } }
      ]
    },
    'not-every': {
      id: 'not-every',
      speaker: 'partner',
      stateLabel: 'Overgeneralization',
      stateKind: 'drift',
      text: "I'm not saying every constraint controls policy. I'm saying office mandates also distribute burdens unevenly.",
      responses: [
        { id: 'ne-a', text: 'That is a fair narrower claim. I still worry about team-level costs.', moveType: 'acknowledgement', nextNodeId: 'coordination-evidence', effects: { issueClarity: 11, mutualUnderstanding: 8, trust: 6, defensiveness: -5 } },
        { id: 'ne-b', text: 'Uneven burden is too broad to guide a policy.', moveType: 'respectful_challenge', nextNodeId: 'value', effects: { issueClarity: 7, defensiveness: 3 } }
      ]
    },
    agreement: { id: 'agreement', speaker: 'partner', stateLabel: 'Agreement', stateKind: 'terminal', text: 'Then we agree on a conditional policy: remote by default where outcomes remain healthy and exceptions are explicit.', terminalStatus: 'agreement', finalDisagreement: 'No major disagreement remains in this path.' },
    partial: { id: 'partial', speaker: 'partner', stateLabel: 'Partial agreement', stateKind: 'terminal', text: 'That is a workable partial agreement: remote-capable roles can be remote, with special handling for onboarding and team learning.', terminalStatus: 'partial-agreement', finalDisagreement: 'How much in-person time is needed for mentoring and coordination.' },
    clear: { id: 'clear', speaker: 'partner', stateLabel: 'Clear disagreement', stateKind: 'terminal', text: 'We understand the tradeoff differently: you give shared coordination more weight, and I give autonomy more weight.', terminalStatus: 'clear-disagreement', finalDisagreement: 'Whether autonomy should be the default unless concrete coordination costs are shown.' },
    value: { id: 'value', speaker: 'partner', stateLabel: 'Value impasse', stateKind: 'terminal', text: 'That sounds like a value impasse more than a factual one: autonomy and shared workplace formation are weighted differently.', terminalStatus: 'value-impasse', finalDisagreement: 'How to weigh autonomy against workplace coordination and formation.' },
    'evidence-impasse': { id: 'evidence-impasse', speaker: 'partner', stateLabel: 'Evidence impasse', stateKind: 'terminal', text: 'Then we need company-specific evidence before deciding whether remote work is helping or hurting.', terminalStatus: 'evidence-impasse', finalDisagreement: 'Which outcomes a specific company would observe under remote-first policy.' },
    breakdown: { id: 'breakdown', speaker: 'partner', stateLabel: 'Breakdown', stateKind: 'terminal', text: 'Now we are mainly arguing about whether my view is unserious, not about remote work policy.', terminalStatus: 'breakdown', finalDisagreement: 'The exchange shifted into a dispute about seriousness and motives.' },
    loop: { id: 'loop', speaker: 'partner', stateLabel: 'Loop', stateKind: 'terminal', text: 'We keep returning to whether I am dismissing coordination rather than clarifying the policy standard.', terminalStatus: 'loop', finalDisagreement: 'Whether Alex is avoiding coordination concerns or asking for a clearer standard.' }
  }
}
