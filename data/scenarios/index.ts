import type { ConversationScenario } from '~/domain/conversation'
import { aiArt } from './ai-art'
import { religionPublicSchools } from './religion-public-schools'
import { remoteWork } from './remote-work'

export const scenarios: ConversationScenario[] = [religionPublicSchools, remoteWork, aiArt]

export function getScenario(id: string): ConversationScenario | undefined {
  return scenarios.find((scenario) => scenario.id === id)
}
