import type { ConversationNode } from '~/domain/conversation'
import type { ScenarioCopy } from './research-scenario-helpers'
import { researchResponse, researchTerminal } from './research-scenario-helpers'

export function buildResearchOutcomeNodes(copy: ScenarioCopy): Record<string, ConversationNode> {
  return {
    'common-ground': {
      id: 'common-ground',
      speaker: 'partner',
      text: copy.commonGround,
      stateLabel: 'Common ground',
      stateKind: 'clarification',
      responses: [
        researchResponse('common-scope', copy.scopeNarrowingText, 'scope_narrowing', 'values', 'You preserve the common ground and isolate the remaining disagreement.'),
        researchResponse('common-concede', copy.concessionText, 'concession', 'partial-terminal', 'You grant the point that has converged while keeping the unresolved part visible.', { resolvedClaim: `A shared concern within ${copy.title}` }),
        researchResponse('common-principle', copy.finalValueProbe, 'principle_probe', 'values', 'You ask which underlying priority explains the remaining disagreement.')
      ]
    },
    values: {
      id: 'values',
      speaker: 'partner',
      text: copy.values,
      stateLabel: 'Defined value conflict',
      stateKind: 'values',
      responses: [
        researchResponse('values-clear', `I think I understand your priority now. I still weight the competing value more heavily, so this may be where we simply disagree.`, 'acknowledgement', 'clear-terminal', 'You identify a stable disagreement without requiring conversion.', undefined, { issueClarity: 14, mutualUnderstanding: 12, loopRisk: -12 }),
        researchResponse('values-partial', `I can agree with that limit even though I would draw the boundary differently in the harder cases.`, 'concession', 'partial-terminal', 'You record partial convergence without pretending the remaining boundary question disappeared.', { resolvedClaim: `A limited point within ${copy.title}` }),
        researchResponse('values-probe', copy.finalValueProbe, 'principle_probe', 'value-terminal', 'You conclude that the remaining disagreement depends primarily on how competing values are prioritized.')
      ]
    },
    'clear-terminal': researchTerminal('clear-terminal', `That seems accurate. We are not agreeing, but at least I know which tradeoff you are choosing and you know which one I am choosing.`, 'clear-disagreement', copy.finalDisagreement),
    'partial-terminal': researchTerminal('partial-terminal', `That is probably the part we can genuinely agree on. The boundary beyond it is still disputed.`, 'partial-agreement', copy.finalDisagreement),
    'evidence-terminal': researchTerminal('evidence-terminal', `Then our next step is not another round of the same argument. We would need better evidence before either prediction deserves more confidence.`, 'evidence-impasse', copy.finalDisagreement),
    'value-terminal': researchTerminal('value-terminal', `I think that captures it. We understand the same tradeoff but rank the underlying values differently.`, 'value-impasse', copy.finalDisagreement),
    'curiosity-terminal': researchTerminal('curiosity-terminal', `I would want to know what evidence or experience would make you revise your boundary. I can tell you the same for mine.`, 'mutual-curiosity', copy.finalDisagreement),
    'breakdown-terminal': researchTerminal('breakdown-terminal', `We are spending more time judging each other’s motives and way of arguing than discussing the original policy. I do not think this version of the conversation is moving.`, 'breakdown', copy.finalDisagreement)
  }
}
