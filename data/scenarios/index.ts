import type { ConversationScenario } from '~/domain/conversation'
import { aiArt } from './ai-art'
import { religionPublicSchools } from './religion-public-schools'
import { remoteWork } from './remote-work'
import { researchScenarios } from './research-scenarios'

const originalScenarios: ConversationScenario[] = [
  {
    ...religionPublicSchools,
    tags: ['religion', 'education', 'public institutions'],
    researchFocus: 'How position exaggeration can turn a dispute about individual expression and institutional neutrality into a recursive argument about what someone “really” believes.'
  },
  {
    ...remoteWork,
    tags: ['work', 'management', 'evidence'],
    researchFocus: 'Whether evidence requests and scope clarification help separate productivity claims from assumptions about trust, effort, and managerial control.'
  },
  {
    ...aiArt,
    tags: ['AI', 'creative work', 'ownership'],
    researchFocus: 'Whether a dispute about consent, training data, and creative practice stays proposition-focused or becomes a moral judgment about artists and technologists.'
  }
]

export const scenarios: ConversationScenario[] = [
  ...originalScenarios,
  ...researchScenarios
]

export function getScenario(id: string): ConversationScenario | undefined {
  return scenarios.find((scenario) => scenario.id === id)
}
