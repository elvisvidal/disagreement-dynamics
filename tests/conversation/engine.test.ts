import { describe, expect, it } from 'vitest'
import { religionPublicSchools } from '~/data/scenarios/religion-public-schools'
import type { ConversationState } from '~/domain/conversation'
import { initialMetrics } from '~/domain/conversation'
import { applyMoveEffects } from '~/utils/conversation/applyMoveEffects'
import { detectConversationLoop } from '~/utils/conversation/detectConversationLoop'
import { restoreConversationState, snapshotState } from '~/utils/conversation/restoreConversationState'
import { useConversation } from '~/composables/useConversation'

function choose(text: string) {
  const conversation = useConversation(religionPublicSchools)
  const response = conversation.responses.value.find((item) => item.text === text)
  expect(response).toBeTruthy()
  conversation.selectResponse(response!)
  return conversation
}

describe('conversation metrics', () => {
  it('keeps metrics between 0 and 100', () => {
    const metrics = applyMoveEffects(initialMetrics, {
      issueClarity: 200,
      mutualUnderstanding: -200,
      defensiveness: 1000,
      trust: -1000,
      topicDrift: 120,
      loopRisk: -120
    })

    expect(Object.values(metrics).every((value) => value >= 0 && value <= 100)).toBe(true)
  })

  it('applies expected move effects', () => {
    const metrics = applyMoveEffects(initialMetrics, { defensiveness: 15, trust: -10 })

    expect(metrics.defensiveness).toBe(37)
    expect(metrics.trust).toBe(48)
  })
})

describe('conversation navigation and history', () => {
  it('selecting a response advances to the intended node', () => {
    const conversation = choose('What part of the ban feels discriminatory to you?')

    expect(conversation.state.value.currentNodeId).toBe('neutral-rule')
    expect(conversation.currentNode.value.text).toContain("doesn't affect everyone equally")
  })

  it('preserves previous states and message history', () => {
    const conversation = choose('So you want religion pushed onto children?')

    expect(conversation.state.value.snapshots).toHaveLength(2)
    expect(conversation.state.value.messageHistory).toHaveLength(3)
    expect(conversation.state.value.moveHistory[0].moveType).toBe('position_exaggeration')
  })

  it('ending nodes return the correct outcome', () => {
    const conversation = useConversation(religionPublicSchools)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'start-c')!)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'neutral-a')!)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'sep-a')!)

    expect(conversation.state.value.status).toBe('clear-disagreement')
    expect(conversation.state.value.completedPaths[0].outcome).toBe('clear-disagreement')
  })
})

describe('replay restore', () => {
  it('restores metrics, claims, meta-disputes, visited nodes, and history', () => {
    const conversation = useConversation(religionPublicSchools)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'start-b')!)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'said-b')!)

    const beforeRestore = JSON.parse(JSON.stringify(conversation.state.value.snapshots[1]))
    conversation.replayFrom(1)

    expect(conversation.state.value.metrics).toEqual(beforeRestore.metrics)
    expect(conversation.state.value.unresolvedClaims).toEqual(beforeRestore.unresolvedClaims)
    expect(conversation.state.value.metaDisputes).toEqual(beforeRestore.metaDisputes)
    expect(conversation.state.value.visitedNodeIds).toEqual(beforeRestore.visitedNodeIds)
    expect(conversation.state.value.messageHistory).toEqual(beforeRestore.messageHistory)
  })

  it('restore helper returns the requested snapshot', () => {
    const conversation = useConversation(religionPublicSchools)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'start-c')!)
    const restored = restoreConversationState(conversation.state.value, 0)

    expect(restored.currentNodeId).toBe('start')
    expect(restored.moveHistory).toHaveLength(0)
  })
})

describe('loop detection', () => {
  it('detects a repeated A to B to C to B to C pattern', () => {
    const state: ConversationState = {
      scenarioId: religionPublicSchools.id,
      currentNodeId: 'same-argument',
      metrics: { ...initialMetrics, defensiveness: 74, topicDrift: 62, loopRisk: 76 },
      unresolvedClaims: ['A claim'],
      resolvedClaims: [],
      metaDisputes: ['meta one', 'meta two'],
      visitedNodeIds: ['start', 'not-what-i-said', 'same-argument', 'not-what-i-said', 'same-argument'],
      moveHistory: [
        { turn: 1, responseId: '1', responseText: 'a', moveType: 'position_exaggeration', fromNodeId: 'start', toNodeId: 'not-what-i-said', effects: {} },
        { turn: 2, responseId: '2', responseText: 'b', moveType: 'interpretive_lock', fromNodeId: 'not-what-i-said', toNodeId: 'same-argument', effects: {} },
        { turn: 3, responseId: '3', responseText: 'c', moveType: 'meta_argument', fromNodeId: 'same-argument', toNodeId: 'not-what-i-said', effects: {} },
        { turn: 4, responseId: '4', responseText: 'd', moveType: 'interpretive_lock', fromNodeId: 'not-what-i-said', toNodeId: 'same-argument', effects: {} }
      ],
      messageHistory: [],
      status: 'active',
      snapshots: [],
      completedPaths: []
    }

    expect(detectConversationLoop(state, religionPublicSchools)).toBe(true)
  })

  it('snapshotState preserves history for later replay', () => {
    const conversation = useConversation(religionPublicSchools)
    conversation.selectResponse(conversation.responses.value.find((item) => item.id === 'start-d')!)
    const snapshot = snapshotState(conversation.state.value)

    expect(snapshot.visitedNodeIds).toEqual(['start', 'principle'])
    expect(snapshot.messageHistory).toHaveLength(3)
  })
})
