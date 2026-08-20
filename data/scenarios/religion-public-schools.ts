import type { ConversationScenario } from '~/domain/conversation'

export const religionPublicSchools: ConversationScenario = {
  id: 'religion-public-schools',
  title: 'Religion in public schools',
  description: 'A disagreement about individual expression, institutional neutrality, and equal treatment.',
  proposition: 'Should students and teachers be allowed to wear visible religious symbols in public schools?',
  partner: {
    name: 'Sam',
    position: 'Sam believes banning personal religious symbols is discriminatory.'
  },
  initialNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      speaker: 'partner',
      stateLabel: 'Original claim',
      stateKind: 'original',
      text: 'I think banning religious symbols would discriminate against people whose religion includes visible clothing.',
      responses: [
        {
          id: 'start-a',
          text: 'Religion should have no place in schools.',
          moveType: 'direct_challenge',
          nextNodeId: 'institutional-neutrality',
          effects: { issueClarity: 4, defensiveness: 5, trust: -3 },
          annotations: { introducedClaim: 'Whether visible personal symbols conflict with secular-school principles' }
        },
        {
          id: 'start-b',
          text: 'So you want religion pushed onto children?',
          moveType: 'position_exaggeration',
          nextNodeId: 'not-what-i-said',
          effects: { issueClarity: -7, defensiveness: 16, trust: -12, topicDrift: 12, loopRisk: 18 },
          annotations: {
            introducedClaim: 'Whether Sam wants religion imposed on children',
            introducedMetaDispute: "Whether the user's paraphrase misrepresents Sam"
          }
        },
        {
          id: 'start-c',
          text: 'What part of the ban feels discriminatory to you?',
          moveType: 'curiosity',
          nextNodeId: 'neutral-rule',
          effects: { issueClarity: 12, mutualUnderstanding: 12, trust: 7, defensiveness: -5, loopRisk: -6 }
        },
        {
          id: 'start-d',
          text: "I disagree, but I think I understand the principle you're defending.",
          moveType: 'acknowledgement',
          nextNodeId: 'principle',
          effects: { mutualUnderstanding: 10, trust: 8, defensiveness: -7, issueClarity: 4 }
        }
      ]
    },
    'neutral-rule': {
      id: 'neutral-rule',
      speaker: 'partner',
      stateLabel: 'Clarification',
      stateKind: 'clarification',
      text: "Some religions require visible clothing or symbols, so a rule that looks neutral doesn't affect everyone equally.",
      responses: [
        {
          id: 'neutral-a',
          text: 'I understand that. My concern is whether public institutions should remain visibly secular.',
          moveType: 'acknowledgement',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 13, mutualUnderstanding: 10, trust: 6, defensiveness: -4 },
          annotations: { introducedClaim: 'Whether institutional neutrality should limit individual expression' }
        },
        {
          id: 'neutral-b',
          text: 'Do we have evidence that these bans actually burden some students more than others?',
          moveType: 'evidence_request',
          nextNodeId: 'evidence-needed',
          effects: { issueClarity: 9, mutualUnderstanding: 3, topicDrift: -3 }
        },
        {
          id: 'neutral-c',
          text: 'But every rule affects someone more. That cannot decide the whole policy.',
          moveType: 'respectful_challenge',
          nextNodeId: 'values-tradeoff',
          effects: { issueClarity: 8, defensiveness: 3, trust: 1 }
        },
        {
          id: 'neutral-d',
          text: 'That sounds like asking schools to redesign themselves around religion.',
          moveType: 'position_exaggeration',
          nextNodeId: 'not-redesign',
          effects: { issueClarity: -5, defensiveness: 13, trust: -9, topicDrift: 9, loopRisk: 13 }
        }
      ]
    },
    principle: {
      id: 'principle',
      speaker: 'partner',
      stateLabel: 'Principle',
      stateKind: 'clarification',
      text: "Right. I'm not saying schools should promote religion. I'm saying people don't stop having protected expression when they enter a public building.",
      responses: [
        {
          id: 'principle-a',
          text: 'So the strongest version is: institutional neutrality should regulate the school, not erase the person.',
          moveType: 'steelmanning',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 12, mutualUnderstanding: 14, trust: 10, defensiveness: -6 }
        },
        {
          id: 'principle-b',
          text: "I still think visible symbols can make students wonder whose values the school endorses.",
          moveType: 'respectful_challenge',
          nextNodeId: 'student-perception',
          effects: { issueClarity: 8, mutualUnderstanding: 4, defensiveness: 2 }
        },
        {
          id: 'principle-c',
          text: 'That only works if every religious claim is treated as sincere.',
          moveType: 'goalpost_shift',
          nextNodeId: 'sincerity-drift',
          effects: { issueClarity: -5, topicDrift: 13, trust: -5, loopRisk: 8 }
        }
      ]
    },
    'institutional-neutrality': {
      id: 'institutional-neutrality',
      speaker: 'partner',
      stateLabel: 'Challenge',
      stateKind: 'challenge',
      text: 'I agree schools should not teach or endorse religion. I separate that from individuals wearing something meaningful to them.',
      responses: [
        {
          id: 'inst-a',
          text: 'What makes individual expression different from institutional endorsement in practice?',
          moveType: 'clarification',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 12, mutualUnderstanding: 7, topicDrift: -4 }
        },
        {
          id: 'inst-b',
          text: 'But younger students may not see that distinction.',
          moveType: 'respectful_challenge',
          nextNodeId: 'student-perception',
          effects: { issueClarity: 8, defensiveness: 2 }
        },
        {
          id: 'inst-c',
          text: "You're making secularism sound intolerant.",
          moveType: 'motive_attribution',
          nextNodeId: 'motive-defence',
          effects: { defensiveness: 14, trust: -12, topicDrift: 11, loopRisk: 12 },
          annotations: { introducedMetaDispute: 'Whether Sam is portraying secularism unfairly' }
        }
      ]
    },
    'separate-neutrality': {
      id: 'separate-neutrality',
      speaker: 'partner',
      stateLabel: 'Core distinction',
      stateKind: 'clarification',
      text: "That's probably where we differ. I separate the institution's neutrality from the individual's expression.",
      responses: [
        {
          id: 'sep-a',
          text: 'That is useful. I think I give institutional neutrality more weight.',
          moveType: 'concession',
          nextNodeId: 'clear-disagreement',
          effects: { issueClarity: 15, mutualUnderstanding: 14, trust: 8, defensiveness: -8, loopRisk: -10 },
          annotations: { resolvedClaim: 'Whether Sam is arguing for institutional religious endorsement' }
        },
        {
          id: 'sep-b',
          text: 'Could evidence about student perception help decide how much that distinction matters?',
          moveType: 'evidence_request',
          nextNodeId: 'evidence-needed',
          effects: { issueClarity: 8, mutualUnderstanding: 5, topicDrift: -4 }
        },
        {
          id: 'sep-c',
          text: 'I can accept that for students more than for teachers.',
          moveType: 'concession',
          nextNodeId: 'partial-agreement',
          effects: { issueClarity: 12, mutualUnderstanding: 10, trust: 8, defensiveness: -7 },
          annotations: { resolvedClaim: 'Whether students should retain personal expression rights' }
        }
      ]
    },
    'student-perception': {
      id: 'student-perception',
      speaker: 'partner',
      stateLabel: 'Evidence question',
      stateKind: 'evidence',
      text: 'That seems like an empirical question: when do students experience a symbol as personal expression versus school endorsement?',
      responses: [
        {
          id: 'perception-a',
          text: 'Yes. Without evidence about that, I do not think either of us can settle the practical risk.',
          moveType: 'acknowledgement',
          nextNodeId: 'evidence-impasse',
          effects: { issueClarity: 12, mutualUnderstanding: 9, trust: 5, defensiveness: -5 }
        },
        {
          id: 'perception-b',
          text: 'Even if students understand the distinction, I still prioritize a visibly secular environment.',
          moveType: 'clarification',
          nextNodeId: 'value-impasse',
          effects: { issueClarity: 14, mutualUnderstanding: 8, defensiveness: -3 }
        },
        {
          id: 'perception-c',
          text: "Now you're hiding behind studies instead of answering the principle.",
          moveType: 'presuppositional_accusation',
          nextNodeId: 'meta-principle',
          effects: { issueClarity: -8, defensiveness: 16, trust: -12, topicDrift: 13, loopRisk: 14 },
          annotations: { introducedMetaDispute: 'Whether Sam is avoiding the principle by asking for evidence' }
        }
      ]
    },
    'values-tradeoff': {
      id: 'values-tradeoff',
      speaker: 'partner',
      stateLabel: 'Values tradeoff',
      stateKind: 'values',
      text: "Agreed, unequal impact doesn't automatically decide it. For me it creates a strong reason unless the school can show a concrete harm.",
      responses: [
        {
          id: 'value-a',
          text: 'Then we may be weighing the same facts through different priorities.',
          moveType: 'clarification',
          nextNodeId: 'value-impasse',
          effects: { issueClarity: 13, mutualUnderstanding: 10, trust: 5, defensiveness: -4 }
        },
        {
          id: 'value-b',
          text: "I partly agree: a blanket ban seems too broad, but teachers may be different.",
          moveType: 'concession',
          nextNodeId: 'partial-agreement',
          effects: { issueClarity: 12, mutualUnderstanding: 9, trust: 8, defensiveness: -6 },
          annotations: { resolvedClaim: 'Whether every visible symbol should be treated the same way' }
        },
        {
          id: 'value-c',
          text: 'That standard lets any group claim harm whenever rules inconvenience them.',
          moveType: 'universalization',
          nextNodeId: 'universal-defence',
          effects: { issueClarity: -4, defensiveness: 11, trust: -6, loopRisk: 9 }
        }
      ]
    },
    'evidence-needed': {
      id: 'evidence-needed',
      speaker: 'partner',
      stateLabel: 'Evidence limit',
      stateKind: 'evidence',
      text: "We would need examples: complaints, exclusion rates, and whether students actually read a teacher's symbol as endorsement.",
      responses: [
        {
          id: 'evidence-a',
          text: 'Then the disagreement depends on information neither of us has right now.',
          moveType: 'acknowledgement',
          nextNodeId: 'evidence-impasse',
          effects: { issueClarity: 14, mutualUnderstanding: 10, trust: 5, defensiveness: -4 }
        },
        {
          id: 'evidence-b',
          text: "And if that evidence is mixed, we'd still have to decide which risk matters more.",
          moveType: 'clarification',
          nextNodeId: 'value-impasse',
          effects: { issueClarity: 13, mutualUnderstanding: 8, topicDrift: -3 }
        },
        {
          id: 'evidence-c',
          text: 'You only want data because the principle is weak.',
          moveType: 'motive_attribution',
          nextNodeId: 'motive-defence',
          effects: { issueClarity: -7, defensiveness: 15, trust: -13, topicDrift: 12, loopRisk: 14 },
          annotations: { introducedMetaDispute: 'Whether Sam is using evidence demands to avoid a weak principle' }
        }
      ]
    },
    'not-redesign': {
      id: 'not-redesign',
      speaker: 'partner',
      stateLabel: 'Defensive clarification',
      stateKind: 'meta',
      text: "That's not what I mean. I'm talking about individual expression, not redesigning school around religion.",
      responses: [
        {
          id: 'redesign-a',
          text: 'Fair. I overstated that. Let me ask about the individual/institution distinction.',
          moveType: 'repair',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 12, mutualUnderstanding: 8, trust: 12, defensiveness: -13, topicDrift: -10, loopRisk: -12 }
        },
        {
          id: 'redesign-b',
          text: 'But that is basically the effect, whether you intend it or not.',
          moveType: 'interpretive_lock',
          nextNodeId: 'not-what-i-said',
          effects: { mutualUnderstanding: -8, defensiveness: 14, trust: -10, loopRisk: 16 },
          annotations: { returnsToClaim: 'Whether Sam wants religion imposed on children' }
        }
      ]
    },
    'not-what-i-said': {
      id: 'not-what-i-said',
      speaker: 'partner',
      stateLabel: 'Misrepresentation dispute',
      stateKind: 'meta',
      text: "That's not what I said. I'm talking about individual expression, not teaching religion to children.",
      responses: [
        {
          id: 'said-a',
          text: 'Fair enough. What distinction are you making between expression and endorsement?',
          moveType: 'repair',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 12, mutualUnderstanding: 8, trust: 12, defensiveness: -14, topicDrift: -10, loopRisk: -12 },
          annotations: { resolvedClaim: "Whether the user's paraphrase misrepresents Sam" }
        },
        {
          id: 'said-b',
          text: 'It basically is what you said.',
          moveType: 'interpretive_lock',
          nextNodeId: 'same-argument',
          effects: { issueClarity: -8, mutualUnderstanding: -10, defensiveness: 16, trust: -12, loopRisk: 18 },
          annotations: { introducedMetaDispute: 'Whether Sam is allowed to clarify the original position' }
        },
        {
          id: 'said-c',
          text: 'Maybe I put it too strongly, but I worry that is the practical result.',
          moveType: 'repair',
          nextNodeId: 'student-perception',
          effects: { issueClarity: 9, mutualUnderstanding: 6, trust: 8, defensiveness: -8, topicDrift: -6 }
        }
      ]
    },
    'same-argument': {
      id: 'same-argument',
      speaker: 'partner',
      stateLabel: 'Clarification rejected',
      stateKind: 'meta',
      text: "No. I'm clarifying the same argument: personal symbols are different from the school promoting religion.",
      responses: [
        {
          id: 'same-a',
          text: "You're changing your argument now.",
          moveType: 'meta_argument',
          nextNodeId: 'clarifying-same',
          effects: { issueClarity: -7, defensiveness: 14, trust: -10, topicDrift: 14, loopRisk: 16 },
          annotations: { introducedMetaDispute: 'Whether Sam is changing the argument or clarifying it' }
        },
        {
          id: 'same-b',
          text: 'I hear the distinction. I still think the practical effect matters.',
          moveType: 'acknowledgement',
          nextNodeId: 'student-perception',
          effects: { issueClarity: 10, mutualUnderstanding: 10, trust: 7, defensiveness: -7, loopRisk: -8 }
        }
      ]
    },
    'clarifying-same': {
      id: 'clarifying-same',
      speaker: 'partner',
      stateLabel: 'Meta-argument',
      stateKind: 'meta',
      text: "I'm clarifying the same argument. We're now spending more time on what I supposedly believe than on the policy.",
      responses: [
        {
          id: 'clarify-a',
          text: "You keep avoiding what I'm saying.",
          moveType: 'presuppositional_accusation',
          nextNodeId: 'trying-explain',
          effects: { issueClarity: -8, defensiveness: 17, trust: -13, topicDrift: 15, loopRisk: 18 },
          annotations: { introducedMetaDispute: 'Whether Sam is avoiding the user’s concern' }
        },
        {
          id: 'clarify-b',
          text: "You're right that we're off track. Let's return to the policy distinction.",
          moveType: 'repair',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 13, mutualUnderstanding: 8, trust: 12, defensiveness: -14, topicDrift: -15, loopRisk: -15 }
        }
      ]
    },
    'trying-explain': {
      id: 'trying-explain',
      speaker: 'partner',
      stateLabel: 'Defence',
      stateKind: 'meta',
      text: "I'm trying to explain what I actually mean.",
      loopTargetNodeId: 'same-argument',
      responses: [
        {
          id: 'explain-a',
          text: "That's exactly the problem: you won't admit what your position implies.",
          moveType: 'interpretive_lock',
          nextNodeId: 'loop-terminal',
          effects: { issueClarity: -10, mutualUnderstanding: -12, defensiveness: 18, trust: -16, topicDrift: 16, loopRisk: 22 },
          annotations: { introducedMetaDispute: 'Whether Sam is refusing to admit an implication' }
        },
        {
          id: 'explain-b',
          text: 'Okay. I may be treating an implication as your stated view. What is the policy distinction?',
          moveType: 'repair',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 14, mutualUnderstanding: 10, trust: 14, defensiveness: -15, topicDrift: -14, loopRisk: -16 }
        }
      ]
    },
    'motive-defence': {
      id: 'motive-defence',
      speaker: 'partner',
      stateLabel: 'Motive dispute',
      stateKind: 'meta',
      text: "I don't think that's fair. I'm not trying to attack secularism; I'm trying to separate two kinds of neutrality.",
      responses: [
        {
          id: 'motive-a',
          text: 'Fair. I shifted to your motive. Let me restate the policy concern.',
          moveType: 'repair',
          nextNodeId: 'separate-neutrality',
          effects: { issueClarity: 12, mutualUnderstanding: 8, trust: 13, defensiveness: -14, topicDrift: -12, loopRisk: -12 }
        },
        {
          id: 'motive-b',
          text: 'You may not intend it, but that is how the argument works.',
          moveType: 'interpretive_lock',
          nextNodeId: 'same-argument',
          effects: { issueClarity: -6, mutualUnderstanding: -7, defensiveness: 14, trust: -11, loopRisk: 15 }
        }
      ]
    },
    'meta-principle': {
      id: 'meta-principle',
      speaker: 'partner',
      stateLabel: 'Process dispute',
      stateKind: 'meta',
      text: "I'm not hiding. I think both the principle and the practical effects matter, and you're treating that as evasive.",
      responses: [
        {
          id: 'meta-a',
          text: "You're right; I turned a distinction into an accusation.",
          moveType: 'repair',
          nextNodeId: 'values-tradeoff',
          effects: { issueClarity: 10, mutualUnderstanding: 8, trust: 12, defensiveness: -13, topicDrift: -12, loopRisk: -12 }
        },
        {
          id: 'meta-b',
          text: 'Because it is evasive.',
          moveType: 'interpretive_lock',
          nextNodeId: 'trying-explain',
          effects: { issueClarity: -8, mutualUnderstanding: -9, defensiveness: 15, trust: -12, loopRisk: 16 }
        }
      ]
    },
    'sincerity-drift': {
      id: 'sincerity-drift',
      speaker: 'partner',
      stateLabel: 'Topic drift',
      stateKind: 'drift',
      text: 'Sincerity tests are a different and difficult question. They do not answer whether a broad ban is justified.',
      responses: [
        {
          id: 'sincerity-a',
          text: 'That is a separate issue. Returning to the ban, I care most about institutional neutrality.',
          moveType: 'repair',
          nextNodeId: 'value-impasse',
          effects: { issueClarity: 12, trust: 6, topicDrift: -12, loopRisk: -8 }
        },
        {
          id: 'sincerity-b',
          text: 'But if sincerity is hard to judge, your whole position becomes impossible to administer.',
          moveType: 'goalpost_shift',
          nextNodeId: 'universal-defence',
          effects: { issueClarity: -5, defensiveness: 8, topicDrift: 10, loopRisk: 8 }
        }
      ]
    },
    'universal-defence': {
      id: 'universal-defence',
      speaker: 'partner',
      stateLabel: 'Overgeneralization',
      stateKind: 'drift',
      text: "I don't think every inconvenience counts. I'm saying a burden tied to protected personal expression deserves special scrutiny.",
      responses: [
        {
          id: 'universal-a',
          text: 'That narrows it. I still weigh school neutrality more heavily.',
          moveType: 'clarification',
          nextNodeId: 'value-impasse',
          effects: { issueClarity: 11, mutualUnderstanding: 7, defensiveness: -4, loopRisk: -6 }
        },
        {
          id: 'universal-b',
          text: 'Special scrutiny just means special pleading.',
          moveType: 'sarcasm',
          nextNodeId: 'breakdown',
          effects: { issueClarity: -8, defensiveness: 16, trust: -14, topicDrift: 10, loopRisk: 14 },
          annotations: { introducedMetaDispute: 'Whether Sam is special pleading' }
        }
      ]
    },
    'clear-disagreement': {
      id: 'clear-disagreement',
      speaker: 'partner',
      stateLabel: 'Clear disagreement',
      stateKind: 'terminal',
      text: 'And I give individual expression more weight. We disagree, but at least we have the disagreement located.',
      terminalStatus: 'clear-disagreement',
      finalDisagreement: 'Whether individual religious expression should receive greater protection than institutional neutrality.'
    },
    'partial-agreement': {
      id: 'partial-agreement',
      speaker: 'partner',
      stateLabel: 'Partial agreement',
      stateKind: 'terminal',
      text: 'That seems like partial agreement: blanket student bans are hard to justify, while teacher cases may need separate rules.',
      terminalStatus: 'partial-agreement',
      finalDisagreement: 'How public schools should treat visible symbols worn by teachers rather than students.'
    },
    'evidence-impasse': {
      id: 'evidence-impasse',
      speaker: 'partner',
      stateLabel: 'Evidence impasse',
      stateKind: 'terminal',
      text: 'Then we have an evidence impasse. We know what information would matter, but we do not have it here.',
      terminalStatus: 'evidence-impasse',
      finalDisagreement: 'Whether visible symbols are commonly perceived as personal expression or school endorsement.'
    },
    'value-impasse': {
      id: 'value-impasse',
      speaker: 'partner',
      stateLabel: 'Value impasse',
      stateKind: 'terminal',
      text: 'That sounds like a value impasse: you prioritize institutional neutrality, while I prioritize individual expression.',
      terminalStatus: 'value-impasse',
      finalDisagreement: 'How to weigh institutional neutrality against individual religious expression.'
    },
    breakdown: {
      id: 'breakdown',
      speaker: 'partner',
      stateLabel: 'Breakdown',
      stateKind: 'terminal',
      text: 'I do not think we are discussing the policy anymore. We are mostly arguing about whether my position is legitimate.',
      terminalStatus: 'breakdown',
      finalDisagreement: 'The exchange became primarily about motives and legitimacy rather than the school policy.'
    },
    'loop-terminal': {
      id: 'loop-terminal',
      speaker: 'partner',
      stateLabel: 'Loop',
      stateKind: 'terminal',
      text: "We're now arguing about what I supposedly believe instead of the policy, and we keep returning to that point.",
      terminalStatus: 'loop',
      finalDisagreement: "Whether Sam's clarification should be accepted or treated as evasion."
    }
  }
}
