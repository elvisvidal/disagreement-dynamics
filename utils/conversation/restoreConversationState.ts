import type { ConversationSnapshot, ConversationState } from '~/domain/conversation'

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function restoreConversationState(state: ConversationState, turn: number): ConversationState {
  const snapshot = state.snapshots[turn]
  if (!snapshot) {
    return state
  }

  return {
    ...state,
    ...cloneData(snapshot),
    snapshots: state.snapshots.slice(0, turn + 1).map((item) => cloneData(item)),
    completedPaths: state.completedPaths,
    replayingFromTurn: turn
  }
}

export function snapshotState(state: ConversationState): ConversationSnapshot {
  return cloneData({
    currentNodeId: state.currentNodeId,
    metrics: state.metrics,
    unresolvedClaims: state.unresolvedClaims,
    resolvedClaims: state.resolvedClaims,
    metaDisputes: state.metaDisputes,
    visitedNodeIds: state.visitedNodeIds,
    moveHistory: state.moveHistory,
    messageHistory: state.messageHistory,
    status: state.status,
    lastExplanation: state.lastExplanation
  })
}
