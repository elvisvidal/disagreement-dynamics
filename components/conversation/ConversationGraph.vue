<script setup lang="ts">
import type { ConversationScenario, ConversationState } from '~/domain/conversation'

const props = defineProps<{
  state: ConversationState
  scenario: ConversationScenario
}>()

const kindClass: Record<string, string> = {
  original: 'fill-[#20201d]',
  clarification: 'fill-[#63715b]',
  challenge: 'fill-[#8f775f]',
  evidence: 'fill-[#4f7180]',
  drift: 'fill-[#9a654d]',
  meta: 'fill-[#a05252]',
  loop: 'fill-[#a05252]',
  terminal: 'fill-[#20201d]',
  values: 'fill-[#7b6f50]'
}

const points = computed(() =>
  props.state.visitedNodeIds.map((id, index) => {
    const node = props.scenario.nodes[id]
    return {
      id: `${id}-${index}`,
      nodeId: id,
      label: node?.stateLabel ?? id,
      kind: node?.stateKind ?? 'challenge',
      x: 30,
      y: 28 + index * 58,
      repeated: props.state.visitedNodeIds.indexOf(id) !== index
    }
  })
)

const height = computed(() => Math.max(220, points.value.length * 58 + 36))
const loopEdge = computed(() => {
  const last = points.value[points.value.length - 1]
  if (!last) return undefined
  const targetIndex = props.state.visitedNodeIds.findIndex((id, index) => id === last.nodeId && index < points.value.length - 1)
  if (targetIndex < 0) return undefined
  return { from: last, to: points.value[targetIndex] }
})
</script>

<template>
  <section class="rounded-lg border border-line bg-white p-4 shadow-sm" aria-labelledby="graph-title">
    <h2 id="graph-title" class="mb-3 text-sm font-semibold uppercase tracking-wide text-ink/60">Trajectory</h2>
    <svg class="w-full overflow-visible" :height="height" viewBox="0 0 260 520" preserveAspectRatio="xMinYMin meet" role="img" aria-label="Conversation trajectory map">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="#9a9489" />
        </marker>
        <marker id="loop-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="#9a654d" />
        </marker>
      </defs>
      <g v-for="(point, index) in points" :key="point.id">
        <line
          v-if="index > 0"
          x1="30"
          :y1="points[index - 1].y + 10"
          x2="30"
          :y2="point.y - 13"
          stroke="#c9c1b5"
          stroke-width="2"
          marker-end="url(#arrow)"
        />
        <circle :cx="point.x" :cy="point.y" r="10" :class="kindClass[point.kind]" />
        <circle v-if="point.repeated" :cx="point.x" :cy="point.y" r="15" fill="none" stroke="#9a654d" stroke-width="2" stroke-dasharray="3 3" />
        <text :x="point.x + 20" :y="point.y + 4" class="fill-ink text-[13px]">{{ point.label }}</text>
      </g>
      <path
        v-if="loopEdge"
        :d="`M ${loopEdge.from.x + 12} ${loopEdge.from.y} C 210 ${loopEdge.from.y}, 210 ${loopEdge.to.y}, ${loopEdge.to.x + 12} ${loopEdge.to.y}`"
        fill="none"
        stroke="#9a654d"
        stroke-width="3"
        stroke-dasharray="6 5"
        marker-end="url(#loop-arrow)"
      />
    </svg>
  </section>
</template>
