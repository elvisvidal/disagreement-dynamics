import { describe, expect, it } from 'vitest'
import { scenarios } from '~/data/scenarios'
import type { ConversationMove } from '~/domain/conversation'
import { loopProneMoveTypes, moveMetadata, restorativeMoveTypes } from '~/domain/moves'
import { analyzeTrajectory, compareTrajectorySignals } from '~/utils/conversation/analyzeTrajectory'

function move(turn: number, moveType: ConversationMove['moveType']): ConversationMove {
  return {
    turn,
    responseId: `${turn}`,
    responseText: moveType,
    moveType,
    fromNodeId: `n${turn}`,
    toNodeId: `n${turn + 1}`,
    effects: {}
  }
}

describe('research milestone corpus', () => {
  it('contains 12 scenarios', () => {
    expect(scenarios).toHaveLength(12)
  })

  it('defines a 24-move taxonomy with metadata for every move', () => {
    expect(Object.keys(moveMetadata)).toHaveLength(24)
    expect(new Set(Object.keys(moveMetadata))).toHaveLength(24)
  })

  it('keeps loop-prone and restorative research sets distinct', () => {
    expect(loopProneMoveTypes.length).toBeGreaterThanOrEqual(10)
    expect(restorativeMoveTypes.length).toBeGreaterThanOrEqual(8)
    expect(loopProneMoveTypes.some((item) => restorativeMoveTypes.includes(item))).toBe(false)
  })

  it('gives every new research scenario hypotheses, phrasing pairs, and a loop path', () => {
    const researchScenarios = scenarios.filter((scenario) => scenario.research)
    expect(researchScenarios).toHaveLength(9)

    for (const scenario of researchScenarios) {
      expect(scenario.research?.hypotheses.length).toBeGreaterThanOrEqual(2)
      expect(scenario.research?.phrasingPairs.length).toBeGreaterThanOrEqual(2)
      expect(Object.values(scenario.nodes).some((node) => node.terminalStatus === 'loop')).toBe(true)
      expect(Object.values(scenario.nodes).some((node) => node.terminalStatus === 'clear-disagreement')).toBe(true)
      expect(Object.values(scenario.nodes).some((node) => node.terminalStatus === 'evidence-impasse')).toBe(true)
      expect(Object.values(scenario.nodes).some((node) => node.terminalStatus === 'value-impasse')).toBe(true)
    }
  })
})

describe('trajectory analysis', () => {
  it('counts moves and transition pairs', () => {
    const summary = analyzeTrajectory([
      move(1, 'position_exaggeration'),
      move(2, 'interpretive_lock'),
      move(3, 'meta_argument')
    ])

    expect(summary.turns).toBe(3)
    expect(summary.loopProneMoves).toBe(3)
    expect(summary.metaMoves).toBe(2)
    expect(summary.transitionCounts['position_exaggeration->interpretive_lock']).toBe(1)
    expect(summary.transitionCounts['interpretive_lock->meta_argument']).toBe(1)
    expect(summary.loopProneRatio).toBe(1)
  })

  it('distinguishes a loop-prone trajectory from a repair trajectory', () => {
    const loopPath = [
      move(1, 'position_exaggeration'),
      move(2, 'interpretive_lock'),
      move(3, 'meta_argument')
    ]
    const repairPath = [
      move(1, 'clarification'),
      move(2, 'respectful_challenge'),
      move(3, 'repair')
    ]

    const delta = compareTrajectorySignals(loopPath, repairPath)
    expect(delta.loopProneRatioDelta).toBeLessThan(0)
    expect(delta.restorativeRatioDelta).toBeGreaterThan(0)
    expect(delta.metaMoveDelta).toBeLessThan(0)
  })
})
