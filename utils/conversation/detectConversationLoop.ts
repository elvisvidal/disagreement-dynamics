import type { ConversationScenario, ConversationState } from '~/domain/conversation'
import { calculateLoopRisk } from './calculateLoopRisk'

export function detectConversationLoop(state: ConversationState, scenario: ConversationScenario) {
  const currentNode = scenario.nodes[state.currentNodeId]
  const visitsToCurrent = state.visitedNodeIds.filter((id) => id === state.currentNodeId).length
  const recentNodes = state.visitedNodeIds.slice(-5).join('>')
  const priorPattern = state.visitedNodeIds.slice(0, -2).join('>')
  const hasPatternRepeat = state.visitedNodeIds.length >= 5 && priorPattern.includes(recentNodes.slice(0, Math.max(1, recentNodes.length - 3)))
  const risk = calculateLoopRisk(state)

  return Boolean(
    currentNode?.loopTargetNodeId ||
      visitsToCurrent >= 3 ||
      hasPatternRepeat ||
      (risk >= 86 && state.metaDisputes.length >= 2 && state.metrics.defensiveness >= 70)
  )
}
