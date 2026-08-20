import { describe, expect, it } from 'vitest'
import { scenarios } from '~/data/scenarios'
import { researchScenarios } from '~/data/scenarios/research-scenarios'
import type { CompletedPath, ConversationMove } from '~/domain/conversation'
import { moveMetadata, moveTypes } from '~/domain/moves'
import { buildPathResearchSummary, deriveCandidateHypotheses } from '~/utils/conversation/research'
import { useConversation } from '~/composables/useConversation'

function moves(types: ConversationMove['moveType'][]): ConversationMove[] {
  return types.map((moveType, index) => ({
    turn: index + 1,
    responseId: `response-${index}`,
    responseText: moveMetadata[moveType].label,
    moveType,
    fromNodeId: `node-${index}`,
    toNodeId: `node-${index + 1}`,
    effects: moveMetadata[moveType].typicalEffects
  }))
}

function path(label: string, outcome: CompletedPath['outcome'], sequence: ConversationMove['moveType'][]): CompletedPath {
  const moveHistory = moves(sequence)
  const loopish = outcome === 'loop' || outcome === 'breakdown'
  return {
    id: label,
    label,
    outcome,
    metrics: {
      issueClarity: loopish ? 30 : 84,
      mutualUnderstanding: loopish ? 28 : 82,
      defensiveness: loopish ? 88 : 24,
      trust: loopish ? 18 : 78,
      topicDrift: loopish ? 82 : 18,
      loopRisk: loopish ? 94 : 12
    },
    metaDisputeCount: loopish ? 4 : 0,
    issueClarity: loopish ? 30 : 84,
    defensiveness: loopish ? 88 : 24,
    moveHistory,
    research: buildPathResearchSummary(moveHistory)
  }
}

describe('research milestone content', () => {
  it('defines exactly 24 classified conversation moves', () => {
    expect(moveTypes).toHaveLength(24)
    expect(Object.values(moveMetadata).every((move) => move.family && move.loopAffinity)).toBe(true)
  })

  it('contains 13 scenarios with ten new research scenarios', () => {
    expect(researchScenarios).toHaveLength(10)
    expect(scenarios).toHaveLength(13)
    expect(new Set(scenarios.map((scenario) => scenario.id)).size).toBe(13)
  })

  it('keeps every response target inside its scenario graph', () => {
    for (const scenario of scenarios) {
      expect(scenario.researchFocus).toBeTruthy()
      expect(scenario.tags?.length).toBeGreaterThan(0)

      for (const node of Object.values(scenario.nodes)) {
        for (const response of node.responses ?? []) {
          expect(
            scenario.nodes[response.nextNodeId],
            `${scenario.id}:${node.id} points to missing ${response.nextNodeId}`
          ).toBeTruthy()
        }
      }
    }
  })

  it('gives every research scenario multiple legitimate endpoints plus breakdown', () => {
    const expected = new Set([
      'partial-agreement',
      'clear-disagreement',
      'evidence-impasse',
      'value-impasse',
      'mutual-curiosity',
      'breakdown'
    ])

    for (const scenario of researchScenarios) {
      const outcomes = new Set(
        Object.values(scenario.nodes)
          .map((node) => node.terminalStatus)
          .filter(Boolean)
      )

      for (const outcome of expected) {
        expect(outcomes.has(outcome as never), `${scenario.id} should include ${outcome}`).toBe(true)
      }
    }
  })
})

describe('replay research summaries', () => {
  it('records move families and adjacent transition pairs', () => {
    const summary = buildPathResearchSummary(
      moves(['position_exaggeration', 'interpretive_lock', 'meta_argument'])
    )

    expect(summary.highLoopMoves).toBe(3)
    expect(summary.transitionPairs).toEqual([
      'position_exaggeration → interpretive_lock',
      'interpretive_lock → meta_argument'
    ])
    expect(summary.familySequence).toEqual(['escalation', 'escalation', 'derailment'])
  })

  it('supports a loop path and a replayed clear-disagreement path in the same scenario', () => {
    const conversation = useConversation(researchScenarios[0])
    const select = (id: string) => {
      const item = conversation.responses.value.find((response) => response.id === id)
      expect(item, `missing ${id} at ${conversation.state.value.currentNodeId}`).toBeTruthy()
      conversation.selectResponse(item!)
    }

    select('start-exaggerate')
    select('correction-lock')
    select('locked-meta')
    select('meta-lock')

    expect(conversation.state.value.status).toBe('loop')
    expect(conversation.state.value.completedPaths).toHaveLength(1)

    conversation.replayFrom(0)
    select('start-curious')
    select('clarify-principle')
    select('principle-ack')
    select('tradeoff-reflect')
    select('common-scope')
    select('values-clear')

    expect(conversation.state.value.status).toBe('clear-disagreement')
    expect(conversation.state.value.completedPaths).toHaveLength(2)
    expect(deriveCandidateHypotheses(conversation.state.value.completedPaths).length).toBeGreaterThan(0)
  })

  it('derives testable candidate hypotheses only when loop and non-loop paths can be compared', () => {
    const loopPath = path('Loop path', 'loop', [
      'position_exaggeration',
      'interpretive_lock',
      'meta_argument',
      'interpretive_lock'
    ])
    const clearPath = path('Clear path', 'clear-disagreement', [
      'curiosity',
      'principle_probe',
      'reflective_listening',
      'scope_narrowing',
      'acknowledgement'
    ])

    const hypotheses = deriveCandidateHypotheses([loopPath, clearPath])

    expect(hypotheses.length).toBeGreaterThan(0)
    expect(hypotheses.every((item) => item.observable.length > 0)).toBe(true)
    expect(deriveCandidateHypotheses([loopPath])).toEqual([])
  })
})
