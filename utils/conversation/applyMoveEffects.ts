import type { ConversationMetrics } from '~/domain/conversation'
import { clampMetrics } from '~/domain/metrics'

export function applyMoveEffects(
  metrics: ConversationMetrics,
  effects: Partial<ConversationMetrics>
): ConversationMetrics {
  return clampMetrics({
    issueClarity: metrics.issueClarity + (effects.issueClarity ?? 0),
    mutualUnderstanding: metrics.mutualUnderstanding + (effects.mutualUnderstanding ?? 0),
    defensiveness: metrics.defensiveness + (effects.defensiveness ?? 0),
    trust: metrics.trust + (effects.trust ?? 0),
    topicDrift: metrics.topicDrift + (effects.topicDrift ?? 0),
    loopRisk: metrics.loopRisk + (effects.loopRisk ?? 0)
  })
}
