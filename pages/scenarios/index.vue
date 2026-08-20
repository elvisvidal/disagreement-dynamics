<script setup lang="ts">
import { scenarios } from '~/data/scenarios'
</script>

<template>
  <main class="min-h-screen px-6 py-8 md:px-10">
    <section class="mx-auto max-w-6xl">
      <NuxtLink class="text-sm font-medium text-ink/60 hover:text-ink" to="/">Back</NuxtLink>
      <div class="mt-10 max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.22em] text-moss">Scenario selection</p>
        <h1 class="mt-3 font-serif text-4xl leading-tight md:text-5xl">Choose a disagreement to explore</h1>
      </div>
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="scenario in scenarios"
          :key="scenario.id"
          :to="`/scenarios/${scenario.id}`"
          class="rounded-lg border border-line bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:border-moss/50"
        >
          <h2 class="font-serif text-2xl">{{ scenario.title }}</h2>
          <p class="mt-3 text-sm leading-6 text-ink/70">{{ scenario.proposition }}</p>
          <div class="mt-5 rounded-md bg-paper p-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">{{ scenario.partner.name }}</p>
            <p class="mt-1 text-sm leading-5 text-ink/75">{{ scenario.partner.position }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
