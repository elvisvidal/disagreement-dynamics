import type { ConversationScenario } from '~/domain/conversation'
import { aiArt } from './ai-art'
import { religionPublicSchools } from './religion-public-schools'
import { remoteWork } from './remote-work'
import { researchScenarios } from './research-scenarios'

export const scenarios: ConversationScenario[] = [
  religionPublicSchools,
  remoteWork,
  aiArt,
  ...researchScenarios
]

export function getScenario(id: string): ConversationScenario | undefined {
  return scenarios.find((scenario) => scenario.id === id)
}
