import type { ConversationState } from '~/domain/conversation'

export function calculateLoopRisk(state: ConversationState) {
  const recent = state.moveHistory.slice(-4)
  const repeatedMoves = recent.length >= 3 && new Set(recent.map((move) => move.moveType)).size <= 2
  const revisits = state.visitedNodeIds.length - new Set(state.visitedNodeIds).size
  const metaPressure = state.metaDisputes.length * 5
  const highFriction = state.metrics.defensiveness > 68 && state.metrics.topicDrift > 48 ? 16 : 0
  const clarityPenalty = state.metrics.issueClarity < 38 ? 10 : 0

  return Math.max(
    state.metrics.loopRisk,
    Math.min(100, state.metrics.loopRisk + revisits * 8 + metaPressure + highFriction + clarityPenalty + (repeatedMoves ? 12 : 0))
  )
}
