import type { ConversationScenario } from '~/domain/conversation'
import type { ScenarioCopy } from './research-scenario-helpers'
import { buildResearchFrictionNodes } from './research-scenario-friction'
import { buildResearchOutcomeNodes } from './research-scenario-outcomes'
import { buildResearchProductiveNodes } from './research-scenario-productive'

export type { ScenarioCopy } from './research-scenario-helpers'

export function buildResearchScenario(copy: ScenarioCopy): ConversationScenario {
  return {
    id: copy.id,
    title: copy.title,
    description: copy.description,
    proposition: copy.proposition,
    partner: copy.partner,
    tags: copy.tags,
    researchFocus: copy.researchFocus,
    research: {
      domain: copy.tags[0] ?? 'general',
      hypotheses: [
        {
          id: `${copy.id}-repair-rejection`,
          statement: 'Position exaggeration followed by rejected clarification and meta-argument will raise loop risk more than clarification followed by repair or scope narrowing.',
          expectedLoopMoves: ['position_exaggeration', 'interpretive_lock', 'meta_argument'],
          expectedRepairMoves: ['clarification', 'repair', 'scope_narrowing']
        },
        {
          id: `${copy.id}-speaker-vs-claim`,
          statement: 'Moves that redirect attention from the proposition to the speaker will produce more topic drift and defensiveness than evidence-focused or reflective responses.',
          expectedLoopMoves: ['motive_attribution', 'epistemic_invalidation'],
          expectedRepairMoves: ['evidence_request', 'reflective_listening']
        }
      ],
      phrasingPairs: [
        {
          id: `${copy.id}-same-concern-frame`,
          label: 'Same concern, different frame',
          sameUnderlyingConcern: copy.challengePrompt,
          higherLoopRisk: {
            text: copy.exaggerationPrompt,
            moveType: 'position_exaggeration'
          },
          lowerLoopRisk: {
            text: copy.challengePrompt,
            moveType: 'respectful_challenge'
          }
        },
        {
          id: `${copy.id}-clarification-response`,
          label: 'Accept or reject a clarification',
          sameUnderlyingConcern: 'Whether the partner’s clarification should update the interpretation of the original claim.',
          higherLoopRisk: {
            text: 'You can call it a correction, but that is still basically what your position means.',
            moveType: 'interpretive_lock'
          },
          lowerLoopRisk: {
            text: copy.repairText,
            moveType: 'repair'
          }
        }
      ],
      expectedProductiveOutcomes: [
        'partial-agreement',
        'clear-disagreement',
        'evidence-impasse',
        'value-impasse',
        'mutual-curiosity'
      ],
      expectedLoopSignature: [
        'position_exaggeration',
        'interpretive_lock',
        'meta_argument',
        'interpretive_lock'
      ]
    },
    initialNodeId: 'start',
    nodes: {
      ...buildResearchProductiveNodes(copy),
      ...buildResearchFrictionNodes(copy),
      ...buildResearchOutcomeNodes(copy)
    }
  }
}
