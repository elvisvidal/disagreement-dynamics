<script setup lang="ts">
import type { MoveExplanation } from '~/domain/conversation'
import { metricLabels } from '~/domain/metrics'

defineProps<{
  explanation?: MoveExplanation
}>()

function arrow(value: number) {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'flat'
}
</script>

<template>
  <section v-if="explanation" class="rounded-lg border border-moss/25 bg-[#eef2ea] p-4" aria-live="polite">
    <h2 class="text-sm font-semibold text-ink">{{ explanation.label }}</h2>
    <p class="mt-1 text-sm leading-5 text-ink/75">{{ explanation.description }}</p>
    <div class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="(value, key) in explanation.effects"
        :key="key"
        class="rounded-full border border-moss/20 bg-white px-2.5 py-1 text-xs text-ink/70"
      >
        {{ metricLabels[key] }}
        <span aria-hidden="true">{{ arrow(value ?? 0) === 'up' ? '↑' : arrow(value ?? 0) === 'down' ? '↓' : '→' }}</span>
      </span>
    </div>
    <details class="mt-3">
      <summary class="cursor-pointer text-sm font-medium text-ink/75">Why?</summary>
      <p class="mt-2 text-sm leading-5 text-ink/70">{{ explanation.why }}</p>
    </details>
  </section>
</template>
