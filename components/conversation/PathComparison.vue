<script setup lang="ts">
import type { CompletedPath } from '~/domain/conversation'

defineProps<{
  paths: CompletedPath[]
}>()
</script>

<template>
  <section v-if="paths.length >= 2" class="rounded-lg border border-moss/25 bg-[#eef2ea] p-5">
    <h2 class="font-serif text-2xl">Same disagreement. Different conversation.</h2>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <article v-for="path in paths.slice(0, 2)" :key="path.id" class="rounded-lg border border-line bg-white p-4">
        <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">{{ path.label }}</p>
        <dl class="mt-3 grid gap-2 text-sm">
          <div class="flex justify-between gap-3"><dt>Outcome</dt><dd class="font-semibold">{{ path.outcome.replace('-', ' ') }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Issue clarity</dt><dd class="font-semibold">{{ path.issueClarity }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Defensiveness</dt><dd class="font-semibold">{{ path.defensiveness }}</dd></div>
          <div class="flex justify-between gap-3"><dt>Meta-disputes</dt><dd class="font-semibold">{{ path.metaDisputeCount }}</dd></div>
        </dl>
      </article>
    </div>
  </section>
</template>
