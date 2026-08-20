<script setup lang="ts">
import { computed } from 'vue'
import type { CompletedPath } from '~/domain/conversation'
import { moveMetadata } from '~/domain/moves'
import { deriveCandidateHypotheses } from '~/utils/conversation/research'

const props = defineProps<{
  paths: CompletedPath[]
}>()

const visiblePaths = computed(() => props.paths.slice(-4))
const hypotheses = computed(() => deriveCandidateHypotheses(props.paths))

function outcomeLabel(outcome: CompletedPath['outcome']) {
  return outcome.replaceAll('-', ' ')
}
</script>

<template>
  <section v-if="paths.length >= 2" class="rounded-lg border border-moss/25 bg-[#eef2ea] p-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Replay comparison</p>
        <h2 class="mt-1 font-serif text-2xl">Same disagreement. Different conversation.</h2>
      </div>
      <p class="text-xs text-ink/55">Showing up to the 4 most recent completed paths.</p>
    </div>

    <div class="mt-4 grid gap-4 lg:grid-cols-2">
      <article v-for="path in visiblePaths" :key="path.id" class="rounded-lg border border-line bg-white p-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">{{ path.label }}</p>
            <p class="mt-1 text-sm font-semibold capitalize">{{ outcomeLabel(path.outcome) }}</p>
          </div>
          <span class="rounded-full border border-line px-2.5 py-1 text-xs text-ink/60">
            {{ path.moveHistory.length }} moves
          </span>
        </div>

        <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div class="flex justify-between gap-3"><dt>Issue clarity</dt><dd class="font-semibold">{{ path.issueClarity }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Defensiveness</dt><dd class="font-semibold">{{ path.defensiveness }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Meta-disputes</dt><dd class="font-semibold">{{ path.metaDisputeCount }}</dd></div>
          <div class="flex justify-between gap-3"><dt>High-loop moves</dt><dd class="font-semibold">{{ path.research.highLoopMoves }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Inquiry moves</dt><dd class="font-semibold">{{ path.research.inquiryMoves }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Repair moves</dt><dd class="font-semibold">{{ path.research.repairMoves }}</dd></div>
        </dl>

        <div class="mt-4 border-t border-line pt-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-ink/45">Move sequence</p>
          <div class="mt-2 flex flex-wrap gap-1.5">
            <span
              v-for="(move, index) in path.research.moveSequence"
              :key="`${path.id}-${index}-${move}`"
              class="rounded-full bg-paper px-2 py-1 text-[11px] leading-none text-ink/70"
              :title="moveMetadata[move].description"
            >
              {{ moveMetadata[move].label }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="hypotheses.length" class="mt-5 rounded-lg border border-moss/20 bg-white/70 p-4">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-moss">Candidate hypotheses from these replays</p>
      <p class="mt-2 max-w-3xl text-xs leading-5 text-ink/60">
        These are prompts for future testing inside the simulator, not validated findings about real conversations.
      </p>
      <div class="mt-3 grid gap-3">
        <article v-for="hypothesis in hypotheses" :key="hypothesis.id" class="rounded-md border border-line bg-white p-3">
          <h3 class="text-sm font-semibold">{{ hypothesis.title }}</h3>
          <p class="mt-1 text-sm leading-5 text-ink/75">{{ hypothesis.statement }}</p>
          <p class="mt-2 text-xs leading-5 text-ink/55"><span class="font-semibold">Test:</span> {{ hypothesis.observable }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
