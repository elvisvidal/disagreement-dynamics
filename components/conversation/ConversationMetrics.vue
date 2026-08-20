<script setup lang="ts">
import type { ConversationMetrics } from '~/domain/conversation'
import { metricDescriptions, metricLabels } from '~/domain/metrics'

defineProps<{
  metrics: ConversationMetrics
}>()

const keys = Object.keys(metricLabels) as Array<keyof ConversationMetrics>
</script>

<template>
  <section class="rounded-lg border border-line bg-white p-4 shadow-sm" aria-labelledby="metrics-title">
    <div class="mb-3 flex items-start justify-between gap-3">
      <h2 id="metrics-title" class="text-sm font-semibold uppercase tracking-wide text-ink/60">Conversation health</h2>
      <span
        class="cursor-help rounded-full border border-line px-2 py-0.5 text-xs text-ink/60"
        title="Experimental heuristic used to visualize conversation structure. It is not a psychological assessment."
      >
        heuristic
      </span>
    </div>
    <div class="grid gap-3">
      <div v-for="key in keys" :key="key">
        <div class="mb-1 flex items-center justify-between gap-3 text-sm">
          <span class="text-ink/75" :title="metricDescriptions[key]">{{ metricLabels[key] }}</span>
          <strong class="tabular-nums text-ink">{{ metrics[key] }}</strong>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-mist" aria-hidden="true">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="key === 'defensiveness' || key === 'topicDrift' || key === 'loopRisk' ? 'bg-clay' : 'bg-moss'"
            :style="{ width: `${metrics[key]}%` }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
