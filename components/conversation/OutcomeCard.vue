<script setup lang="ts">
import type { ConversationScenario, ConversationState } from '~/domain/conversation'
import { metricLabels } from '~/domain/metrics'

const props = defineProps<{
  state: ConversationState
  scenario: ConversationScenario
  divergenceTurn?: number
}>()

const emit = defineEmits<{
  replay: [turn: number]
  restart: []
}>()

const outcomeLabel = computed(() => props.state.status.replace('-', ' ').toUpperCase())
const currentNode = computed(() => props.scenario.nodes[props.state.currentNodeId])
const divergenceMove = computed(() => {
  if (props.divergenceTurn === undefined) return undefined
  return props.state.completedPaths[0]?.moveHistory[props.divergenceTurn]
})
</script>

<template>
  <section class="rounded-lg border border-ink/15 bg-white p-6 shadow-soft">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Outcome</p>
    <h2 class="mt-2 font-serif text-3xl text-ink">{{ outcomeLabel }}</h2>
    <p class="mt-3 max-w-2xl text-sm leading-6 text-ink/75">
      <template v-if="state.status === 'clear-disagreement'">You did not reach agreement, but the disagreement became more precise.</template>
      <template v-else-if="state.status === 'loop'">The discussion is no longer mainly about the original question and has returned to a prior dispute state.</template>
      <template v-else-if="state.status === 'breakdown'">The discussion became primarily interpersonal or meta-conversational.</template>
      <template v-else>The path reached a legitimate conversational stopping point without treating agreement as the only success.</template>
    </p>
    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <div class="rounded-lg bg-paper p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">Original disagreement</p>
        <p class="mt-1 text-sm leading-5">{{ scenario.proposition }}</p>
      </div>
      <div class="rounded-lg bg-paper p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">Final disagreement</p>
        <p class="mt-1 text-sm leading-5">{{ currentNode?.finalDisagreement }}</p>
      </div>
    </div>
    <div class="mt-5 grid gap-2 sm:grid-cols-2">
      <div v-for="(value, key) in state.metrics" :key="key" class="flex items-center justify-between rounded-md border border-line px-3 py-2 text-sm">
        <span>{{ metricLabels[key] }}</span>
        <strong class="tabular-nums">{{ value }}</strong>
      </div>
    </div>

    <div v-if="divergenceMove" class="mt-6 rounded-lg border border-clay/25 bg-[#fbf4ef] p-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">First major divergence</p>
      <p class="mt-2 text-sm leading-6">Turn {{ divergenceMove.turn }}: “{{ divergenceMove.responseText }}”</p>
      <p class="mt-1 text-sm text-ink/65">This introduced {{ divergenceMove.moveType.replaceAll('_', ' ') }} and changed the path that followed.</p>
      <button class="mt-3 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/85" type="button" @click="emit('replay', divergenceTurn ?? 0)">
        Replay from here
      </button>
    </div>

    <button class="mt-4 rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold hover:bg-paper" type="button" @click="emit('restart')">
      Restart conversation
    </button>
  </section>
</template>
