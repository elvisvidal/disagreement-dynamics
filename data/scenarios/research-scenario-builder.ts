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
    initialNodeId: 'start',
    nodes: {
      ...buildResearchProductiveNodes(copy),
      ...buildResearchFrictionNodes(copy),
      ...buildResearchOutcomeNodes(copy)
    }
  }
}
