import type {
  ConversationMetrics,
  ConversationResponse,
  ConversationStatus
} from '~/domain/conversation'
import type { MoveType } from '~/domain/moves'
import { moveMetadata } from '~/domain/moves'

export type ScenarioCopy = {
  id: string
  title: string
  description: string
  proposition: string
  tags: string[]
  researchFocus: string
  partner: { name: string; position: string }
  opening: string
  clarification: string
  principle: string
  tradeoff: string
  evidence: string
  evidenceLimit: string
  challenge: string
  correction: string
  locked: string
  meta: string
  repair: string
  motive: string
  drift: string
  burden: string
  tone: string
  commonGround: string
  values: string
  finalDisagreement: string
  curiosityPrompt: string
  exaggerationPrompt: string
  challengePrompt: string
  evidencePrompt: string
  principleQuestion: string
  scopeQuestion: string
  valueChallenge: string
  evidenceFollowUp: string
  concessionText: string
  reflectiveText: string
  repairText: string
  scopeNarrowingText: string
  finalValueProbe: string
}

export function researchEffects(moveType: MoveType, overrides: Partial<ConversationMetrics> = {}) {
  return { ...moveMetadata[moveType].typicalEffects, ...overrides }
}

export function researchResponse(
  id: string,
  text: string,
  moveType: MoveType,
  nextNodeId: string,
  explanation: string,
  annotations?: ConversationResponse['annotations'],
  overrides?: Partial<ConversationMetrics>
): ConversationResponse {
  return {
    id,
    text,
    moveType,
    nextNodeId,
    effects: researchEffects(moveType, overrides),
    explanation,
    annotations
  }
}

export function researchTerminal(
  id: string,
  text: string,
  status: ConversationStatus,
  finalDisagreement: string
) {
  return {
    id,
    speaker: 'partner' as const,
    text,
    stateLabel: status.replace('-', ' '),
    stateKind: 'terminal' as const,
    terminalStatus: status,
    finalDisagreement
  }
}
