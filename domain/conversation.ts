import type { MoveType } from './moves'

export interface ConversationMetrics {
  issueClarity: number
  mutualUnderstanding: number
  defensiveness: number
  trust: number
  topicDrift: number
  loopRisk: number
}

export type ConversationStatus =
  | 'active'
  | 'agreement'
  | 'partial-agreement'
  | 'clear-disagreement'
  | 'evidence-impasse'
  | 'value-impasse'
  | 'mutual-curiosity'
  | 'breakdown'
  | 'loop'

export interface ConversationMove {
  turn: number
  responseId: string
  responseText: string
  moveType: MoveType
  fromNodeId: string
  toNodeId: string
  effects: Partial<ConversationMetrics>
}

export interface ConversationHistoryItem {
  id: string
  speaker: 'user' | 'partner'
  text: string
  nodeId?: string
  moveType?: MoveType
}

export interface ConversationSnapshot {
  currentNodeId: string
  metrics: ConversationMetrics
  unresolvedClaims: string[]
  resolvedClaims: string[]
  metaDisputes: string[]
  visitedNodeIds: string[]
  moveHistory: ConversationMove[]
  messageHistory: ConversationHistoryItem[]
  status: ConversationStatus
  lastExplanation?: MoveExplanation
}

export interface MoveExplanation {
  label: string
  description: string
  effects: Partial<ConversationMetrics>
  why: string
}

export interface ConversationState extends ConversationSnapshot {
  scenarioId: string
  snapshots: ConversationSnapshot[]
  completedPaths: CompletedPath[]
  replayingFromTurn?: number
}

export interface CompletedPath {
  id: string
  label: string
  outcome: ConversationStatus
  metrics: ConversationMetrics
  metaDisputeCount: number
  issueClarity: number
  defensiveness: number
  moveHistory: ConversationMove[]
  divergenceTurn?: number
}

export interface ConversationNode {
  id: string
  speaker: 'partner'
  text: string
  stateLabel: string
  stateKind:
    | 'original'
    | 'clarification'
    | 'challenge'
    | 'evidence'
    | 'drift'
    | 'meta'
    | 'loop'
    | 'terminal'
    | 'values'
  responses?: ConversationResponse[]
  terminalStatus?: ConversationStatus
  finalDisagreement?: string
  loopTargetNodeId?: string
}

export interface ConversationResponse {
  id: string
  text: string
  moveType: MoveType
  nextNodeId: string
  effects: Partial<ConversationMetrics>
  annotations?: {
    introducedClaim?: string
    resolvedClaim?: string
    introducedMetaDispute?: string
    returnsToClaim?: string
  }
  explanation?: string
}

export interface ConversationScenario {
  id: string
  title: string
  description: string
  proposition: string
  partner: {
    name: string
    position: string
  }
  initialNodeId: string
  nodes: Record<string, ConversationNode>
}

export const initialMetrics: ConversationMetrics = {
  issueClarity: 48,
  mutualUnderstanding: 45,
  defensiveness: 22,
  trust: 58,
  topicDrift: 10,
  loopRisk: 12
}
