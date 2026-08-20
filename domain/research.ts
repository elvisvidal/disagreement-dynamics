import type { ConversationStatus } from './conversation'
import type { MoveType } from './moves'

export interface ConversationHypothesis {
  id: string
  statement: string
  expectedLoopMoves: MoveType[]
  expectedRepairMoves: MoveType[]
}

export interface PhrasingPair {
  id: string
  label: string
  sameUnderlyingConcern: string
  higherLoopRiskMove: MoveType
  lowerLoopRiskMove: MoveType
}

export interface ScenarioResearchMetadata {
  domain: string
  hypotheses: ConversationHypothesis[]
  phrasingPairs: PhrasingPair[]
  expectedProductiveOutcomes: ConversationStatus[]
  expectedLoopSignature: MoveType[]
}

export interface TrajectorySummary {
  turns: number
  moveCounts: Partial<Record<MoveType, number>>
  transitionCounts: Record<string, number>
  loopProneMoves: number
  restorativeMoves: number
  metaMoves: number
  driftMoves: number
  loopProneRatio: number
  restorativeRatio: number
}
