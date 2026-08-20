import type { ConversationMetrics } from './conversation'

export const metricLabels: Record<keyof ConversationMetrics, string> = {
  issueClarity: 'Issue clarity',
  mutualUnderstanding: 'Mutual understanding',
  defensiveness: 'Defensiveness',
  trust: 'Trust',
  topicDrift: 'Topic drift',
  loopRisk: 'Loop risk'
}

export const metricDescriptions: Record<keyof ConversationMetrics, string> = {
  issueClarity: 'How clearly the actual disagreement is defined.',
  mutualUnderstanding: "How accurately each participant appears to understand the other's position.",
  defensiveness: 'How much the conversation has shifted toward defending identity, motives, intentions, or credibility.',
  trust: 'Whether participants treat each other as good-faith conversational partners.',
  topicDrift: 'How far the exchange has moved from the original proposition.',
  loopRisk: 'A heuristic estimate that the conversation is becoming self-reinforcing.'
}

export function clampMetric(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function clampMetrics(metrics: ConversationMetrics): ConversationMetrics {
  return {
    issueClarity: clampMetric(metrics.issueClarity),
    mutualUnderstanding: clampMetric(metrics.mutualUnderstanding),
    defensiveness: clampMetric(metrics.defensiveness),
    trust: clampMetric(metrics.trust),
    topicDrift: clampMetric(metrics.topicDrift),
    loopRisk: clampMetric(metrics.loopRisk)
  }
}
