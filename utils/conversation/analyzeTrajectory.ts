import type { ConversationMove } from '~/domain/conversation'
import type { TrajectorySummary } from '~/domain/research'
import { loopProneMoveTypes, moveMetadata, restorativeMoveTypes } from '~/domain/moves'

export function analyzeTrajectory(moveHistory: ConversationMove[]): TrajectorySummary {
  const moveCounts: TrajectorySummary['moveCounts'] = {}
  const transitionCounts: Record<string, number> = {}

  let loopProneMoves = 0
  let restorativeMoves = 0
  let metaMoves = 0
  let driftMoves = 0

  moveHistory.forEach((move, index) => {
    moveCounts[move.moveType] = (moveCounts[move.moveType] ?? 0) + 1

    if (loopProneMoveTypes.includes(move.moveType)) loopProneMoves += 1
    if (restorativeMoveTypes.includes(move.moveType)) restorativeMoves += 1

    const family = moveMetadata[move.moveType].family
    if (family === 'meta') metaMoves += 1
    if (family === 'drift') driftMoves += 1

    const next = moveHistory[index + 1]
    if (next) {
      const key = `${move.moveType}->${next.moveType}`
      transitionCounts[key] = (transitionCounts[key] ?? 0) + 1
    }
  })

  const turns = moveHistory.length
  return {
    turns,
    moveCounts,
    transitionCounts,
    loopProneMoves,
    restorativeMoves,
    metaMoves,
    driftMoves,
    loopProneRatio: turns === 0 ? 0 : loopProneMoves / turns,
    restorativeRatio: turns === 0 ? 0 : restorativeMoves / turns
  }
}

export function compareTrajectorySignals(first: ConversationMove[], second: ConversationMove[]) {
  const a = analyzeTrajectory(first)
  const b = analyzeTrajectory(second)

  return {
    loopProneRatioDelta: b.loopProneRatio - a.loopProneRatio,
    restorativeRatioDelta: b.restorativeRatio - a.restorativeRatio,
    metaMoveDelta: b.metaMoves - a.metaMoves,
    driftMoveDelta: b.driftMoves - a.driftMoves
  }
}
