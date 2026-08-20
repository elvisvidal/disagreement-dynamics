import type {
  CandidateHypothesis,
  CompletedPath,
  ConversationMetrics,
  ConversationMove,
  ConversationStatus,
  PathResearchSummary
} from '~/domain/conversation'
import { moveMetadata } from '~/domain/moves'

export function buildPathResearchSummary(moves: ConversationMove[]): PathResearchSummary {
  const moveSequence = moves.map((move) => move.moveType)
  const familySequence = moveSequence.map((moveType) => moveMetadata[moveType].family)
  const transitionPairs = moveSequence.slice(1).map((moveType, index) => `${moveSequence[index]} → ${moveType}`)

  return {
    sequenceSignature: moveSequence.join(' → '),
    moveSequence,
    familySequence,
    transitionPairs,
    lowLoopMoves: moveSequence.filter((moveType) => moveMetadata[moveType].loopAffinity === 'low').length,
    highLoopMoves: moveSequence.filter((moveType) => moveMetadata[moveType].loopAffinity === 'high').length,
    inquiryMoves: familySequence.filter((family) => family === 'inquiry').length,
    repairMoves: familySequence.filter((family) => family === 'repair').length,
    derailmentMoves: familySequence.filter((family) => family === 'derailment').length,
    escalationMoves: familySequence.filter((family) => family === 'escalation').length
  }
}

function pairFrequency(paths: CompletedPath[]) {
  const counts = new Map<string, number>()
  for (const path of paths) {
    for (const pair of new Set(path.research.transitionPairs)) {
      counts.set(pair, (counts.get(pair) ?? 0) + 1)
    }
  }
  return counts
}

function average(paths: CompletedPath[], selector: (path: CompletedPath) => number) {
  if (!paths.length) return 0
  return paths.reduce((sum, path) => sum + selector(path), 0) / paths.length
}

export function deriveCandidateHypotheses(paths: CompletedPath[]): CandidateHypothesis[] {
  if (paths.length < 2) return []

  const loopPaths = paths.filter((path) => path.outcome === 'loop' || path.outcome === 'breakdown')
  const nonLoopPaths = paths.filter((path) => path.outcome !== 'loop' && path.outcome !== 'breakdown')
  if (!loopPaths.length || !nonLoopPaths.length) return []

  const hypotheses: CandidateHypothesis[] = []
  const loopPairs = pairFrequency(loopPaths)
  const nonLoopPairs = pairFrequency(nonLoopPaths)
  const distinctivePair = [...loopPairs.entries()]
    .filter(([pair]) => !nonLoopPairs.has(pair))
    .sort((a, b) => b[1] - a[1])[0]?.[0]

  if (distinctivePair) {
    hypotheses.push({
      id: `pair-${distinctivePair}`,
      title: 'Transition hypothesis',
      statement: `Sequences containing “${distinctivePair}” may be more likely to enter meta-conflict or a loop than comparison paths that avoid that transition.`,
      observable: 'Test across more runs by comparing loop frequency when this transition is present versus absent.'
    })
  }

  const loopHighAffinity = average(loopPaths, (path) => path.research.highLoopMoves)
  const stableHighAffinity = average(nonLoopPaths, (path) => path.research.highLoopMoves)
  if (loopHighAffinity > stableHighAffinity) {
    hypotheses.push({
      id: 'high-affinity-density',
      title: 'Escalation density hypothesis',
      statement: 'Paths with more high-loop-affinity moves may accumulate disagreement faster than they resolve claims.',
      observable: 'Compare high-loop-affinity move count with terminal outcome, topic drift, and unresolved claim count.'
    })
  }

  const loopRepairInquiry = average(loopPaths, (path) => path.research.repairMoves + path.research.inquiryMoves)
  const stableRepairInquiry = average(nonLoopPaths, (path) => path.research.repairMoves + path.research.inquiryMoves)
  if (stableRepairInquiry > loopRepairInquiry) {
    hypotheses.push({
      id: 'repair-inquiry',
      title: 'Repair and inquiry hypothesis',
      statement: 'Repair and inquiry moves may interrupt escalation sequences even when they do not produce agreement.',
      observable: 'Measure whether repair/inquiry moves predict lower loop frequency while allowing clear disagreement or value impasse.'
    })
  }

  const loopMeta = average(loopPaths, (path) => path.metaDisputeCount)
  const stableMeta = average(nonLoopPaths, (path) => path.metaDisputeCount)
  if (loopMeta > stableMeta) {
    hypotheses.push({
      id: 'meta-dispute-load',
      title: 'Meta-dispute load hypothesis',
      statement: 'Accumulating disputes about the conversation itself may be a stronger warning sign for looping than disagreement intensity alone.',
      observable: 'Compare meta-dispute count with final loop status while controlling for defensiveness.'
    })
  }

  return hypotheses.slice(0, 3)
}

export function createCompletedPathResearch(
  moveHistory: ConversationMove[],
  _outcome: ConversationStatus,
  _metrics: ConversationMetrics
) {
  return buildPathResearchSummary(moveHistory)
}
