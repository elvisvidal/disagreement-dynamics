<script setup lang="ts">
defineProps<{
  originalQuestion: string
  unresolvedClaims: string[]
  resolvedClaims: string[]
  metaDisputes: string[]
}>()
</script>

<template>
  <section class="rounded-lg border border-line bg-white p-4 shadow-sm" aria-labelledby="claims-title">
    <h2 id="claims-title" class="mb-3 text-sm font-semibold uppercase tracking-wide text-ink/60">Conversation state</h2>
    <div class="rounded-md bg-paper p-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">Original question</p>
      <p class="mt-1 text-sm leading-5 text-ink/85">{{ originalQuestion }}</p>
    </div>

    <div class="mt-3 grid grid-cols-3 gap-2 text-center">
      <div class="rounded-md border border-line p-2">
        <strong class="block text-lg">{{ unresolvedClaims.length }}</strong>
        <span class="text-xs text-ink/55">Unresolved</span>
      </div>
      <div class="rounded-md border border-line p-2">
        <strong class="block text-lg">{{ resolvedClaims.length }}</strong>
        <span class="text-xs text-ink/55">Resolved</span>
      </div>
      <div class="rounded-md border border-line p-2">
        <strong class="block text-lg">{{ metaDisputes.length }}</strong>
        <span class="text-xs text-ink/55">Meta</span>
      </div>
    </div>

    <details class="mt-3 rounded-md border border-line p-3">
      <summary class="cursor-pointer text-sm font-medium">Show lists</summary>
      <div class="mt-3 grid gap-3 text-sm leading-5 text-ink/75">
        <div>
          <p class="font-semibold text-ink">Unresolved</p>
          <ul class="mt-1 list-disc pl-5">
            <li v-for="claim in unresolvedClaims" :key="claim">{{ claim }}</li>
            <li v-if="unresolvedClaims.length === 0" class="list-none text-ink/50">None</li>
          </ul>
        </div>
        <div>
          <p class="font-semibold text-ink">Resolved</p>
          <ul class="mt-1 list-disc pl-5">
            <li v-for="claim in resolvedClaims" :key="claim">{{ claim }}</li>
            <li v-if="resolvedClaims.length === 0" class="list-none text-ink/50">None</li>
          </ul>
        </div>
        <div>
          <p class="font-semibold text-ink">Meta-disputes</p>
          <ul class="mt-1 list-disc pl-5">
            <li v-for="claim in metaDisputes" :key="claim">{{ claim }}</li>
            <li v-if="metaDisputes.length === 0" class="list-none text-ink/50">None</li>
          </ul>
        </div>
      </div>
    </details>
  </section>
</template>
