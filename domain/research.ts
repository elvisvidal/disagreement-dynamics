import type { ConversationStatus } from './conversation'
import type { MoveType } from './moves'

export interface ConversationHypothesis {
  id: string
  statement: string
  expectedLoopMoves: MoveType[]
  expectedRepairMoves: MoveType[]
}

export interface PhrasingVariant {
  text: string
  moveType: MoveType
}

export interface PhrasingPair {
  id: string
  label: string
  sameUnderlyingConcern: string
  higherLoopRisk: PhrasingVariant
  lowerLoopRisk: PhrasingVariant
}

export interface ScenarioResearchMetadata {
  domain: string
  hypotheses: ConversationHypothesis[]
  phrasingPairs: PhrasingPair[]
  expectedProductiveOutcomes: ConversationStatus[]
  expectedLoopSignature: MoveType[]
}
