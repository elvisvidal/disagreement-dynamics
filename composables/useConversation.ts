import { computed, ref } from 'vue'
import type {
  CompletedPath,
  ConversationHistoryItem,
  ConversationResponse,
  ConversationScenario,
  ConversationState
} from '~/domain/conversation'
import { initialMetrics } from '~/domain/conversation'
import { moveMetadata } from '~/domain/moves'
import { applyMoveEffects } from '~/utils/conversation/applyMoveEffects'
import { calculateLoopRisk } from '~/utils/conversation/calculateLoopRisk'
import { detectConversationLoop } from '~/utils/conversation/detectConversationLoop'
import { restoreConversationState, snapshotState } from '~/utils/conversation/restoreConversationState'

function uniqPush(items: string[], value?: string) {
  if (value && !items.includes(value)) {
    items.push(value)
  }
}

function removeItem(items: string[], value?: string) {
  if (!value) return items
  return items.filter((item) => item !== value)
}

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function createInitialState(scenario: ConversationScenario): ConversationState {
  const node = scenario.nodes[scenario.initialNodeId]
  const base = {
    scenarioId: scenario.id,
    currentNodeId: scenario.initialNodeId,
    metrics: { ...initialMetrics },
    unresolvedClaims: [scenario.proposition],
    resolvedClaims: [],
    metaDisputes: [],
    visitedNodeIds: [scenario.initialNodeId],
    moveHistory: [],
    messageHistory: [
      {
        id: `${node.id}-message`,
        speaker: 'partner' as const,
        text: node.text,
        nodeId: node.id
      }
    ],
    status: 'active' as const,
    snapshots: [],
    completedPaths: []
  }

  return {
    ...base,
    snapshots: [
      structuredClone({
        currentNodeId: base.currentNodeId,
        metrics: base.metrics,
        unresolvedClaims: base.unresolvedClaims,
        resolvedClaims: base.resolvedClaims,
        metaDisputes: base.metaDisputes,
        visitedNodeIds: base.visitedNodeIds,
        moveHistory: base.moveHistory,
        messageHistory: base.messageHistory,
        status: base.status
      })
    ]
  }
}

export function useConversation(scenario: ConversationScenario) {
  const state = ref<ConversationState>(createInitialState(scenario))

  const currentNode = computed(() => scenario.nodes[state.value.currentNodeId])
  const responses = computed(() => currentNode.value?.responses ?? [])
  const isTerminal = computed(() => state.value.status !== 'active')

  function completedLabel() {
    return state.value.completedPaths.length === 0 ? 'First path' : 'Second path'
  }

  function recordCompletedPath(divergenceTurn?: number) {
    const existingReplay = state.value.replayingFromTurn
    const path: CompletedPath = {
      id: `${Date.now()}-${state.value.completedPaths.length}`,
      label: completedLabel(),
      outcome: state.value.status,
      metrics: cloneData(state.value.metrics),
      metaDisputeCount: state.value.metaDisputes.length,
      issueClarity: state.value.metrics.issueClarity,
      defensiveness: state.value.metrics.defensiveness,
      moveHistory: cloneData(state.value.moveHistory),
      divergenceTurn: divergenceTurn ?? existingReplay
    }
    state.value.completedPaths.push(path)
  }

  function selectResponse(response: ConversationResponse) {
    if (state.value.status !== 'active') return

    const fromNode = currentNode.value
    const nextNode = scenario.nodes[response.nextNodeId]
    if (!fromNode || !nextNode) return

    const move = {
      turn: state.value.moveHistory.length + 1,
      responseId: response.id,
      responseText: response.text,
      moveType: response.moveType,
      fromNodeId: fromNode.id,
      toNodeId: response.nextNodeId,
      effects: response.effects
    }

    const userMessage: ConversationHistoryItem = {
      id: `${response.id}-user-${move.turn}`,
      speaker: 'user',
      text: response.text,
      moveType: response.moveType
    }
    const partnerMessage: ConversationHistoryItem = {
      id: `${nextNode.id}-partner-${move.turn}`,
      speaker: 'partner',
      text: nextNode.text,
      nodeId: nextNode.id
    }

    const nextMetrics = applyMoveEffects(state.value.metrics, response.effects)
    const unresolvedClaims = removeItem([...state.value.unresolvedClaims], response.annotations?.resolvedClaim)
    uniqPush(unresolvedClaims, response.annotations?.introducedClaim)
    uniqPush(unresolvedClaims, response.annotations?.returnsToClaim)

    const resolvedClaims = [...state.value.resolvedClaims]
    uniqPush(resolvedClaims, response.annotations?.resolvedClaim)

    const metaDisputes = [...state.value.metaDisputes]
    uniqPush(metaDisputes, response.annotations?.introducedMetaDispute)

    const metadata = moveMetadata[response.moveType]
    const updated: ConversationState = {
      ...state.value,
      currentNodeId: nextNode.id,
      metrics: nextMetrics,
      unresolvedClaims,
      resolvedClaims,
      metaDisputes,
      visitedNodeIds: [...state.value.visitedNodeIds, nextNode.id],
      moveHistory: [...state.value.moveHistory, move],
      messageHistory: [...state.value.messageHistory, userMessage, partnerMessage],
      lastExplanation: {
        label: metadata.label,
        description: metadata.description,
        effects: response.effects,
        why: response.explanation ?? metadata.description
      }
    }

    updated.metrics = { ...updated.metrics, loopRisk: calculateLoopRisk(updated) }
    const loopDetected = detectConversationLoop(updated, scenario)
    updated.status = nextNode.terminalStatus ?? (loopDetected ? 'loop' : 'active')
    if (updated.status === 'loop') {
      updated.metrics.loopRisk = Math.max(updated.metrics.loopRisk, 90)
    }

    state.value = updated
    state.value.snapshots.push(snapshotState(state.value))

    if (state.value.status !== 'active') {
      recordCompletedPath()
    }
  }

  function restartConversation() {
    const completedPaths = state.value.completedPaths
    state.value = createInitialState(scenario)
    state.value.completedPaths = completedPaths
  }

  function replayFrom(turn: number) {
    state.value = restoreConversationState(state.value, turn)
  }

  const divergenceTurn = computed(() => {
    const first = state.value.completedPaths[0]
    if (!first) return undefined
    const unproductiveIndex = first.moveHistory.findIndex((move) =>
      ['position_exaggeration', 'motive_attribution', 'interpretive_lock', 'meta_argument', 'presuppositional_accusation', 'epistemic_invalidation', 'sarcasm'].includes(move.moveType)
    )
    return unproductiveIndex >= 0 ? unproductiveIndex : Math.max(0, Math.floor(first.moveHistory.length / 2) - 1)
  })

  return {
    state,
    currentNode,
    responses,
    isTerminal,
    divergenceTurn,
    selectResponse,
    restartConversation,
    replayFrom
  }
}
