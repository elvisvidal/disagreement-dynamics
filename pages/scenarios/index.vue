<script setup lang="ts">
import { scenarios } from '~/data/scenarios'
</script>

<template>
  <main class="min-h-screen px-6 py-8 md:px-10">
    <section class="mx-auto max-w-6xl">
      <NuxtLink class="text-sm font-medium text-ink/60 hover:text-ink" to="/">Back</NuxtLink>
      <div class="mt-10 flex flex-wrap items-end justify-between gap-5">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-moss">Scenario library</p>
          <h1 class="mt-3 font-serif text-4xl leading-tight md:text-5xl">Choose a disagreement to explore</h1>
          <p class="mt-4 max-w-2xl text-sm leading-6 text-ink/65">
            The library mixes high-stakes disputes with lower-temperature control topics so the same conversation moves can be compared across different subject matter.
          </p>
        </div>
        <div class="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink/65">
          {{ scenarios.length }} scenarios
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="scenario in scenarios"
          :key="scenario.id"
          :to="`/scenarios/${scenario.id}`"
          class="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-moss/50"
        >
          <div v-if="scenario.tags?.length" class="mb-3 flex flex-wrap gap-1.5">
            <span
              v-for="tag in scenario.tags"
              :key="tag"
              class="rounded-full bg-paper px-2 py-1 text-[11px] font-medium text-ink/55"
            >
              {{ tag }}
            </span>
          </div>
          <h2 class="font-serif text-2xl group-hover:text-moss">{{ scenario.title }}</h2>
          <p class="mt-3 text-sm leading-6 text-ink/70">{{ scenario.proposition }}</p>
          <div class="mt-5 rounded-md bg-paper p-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">{{ scenario.partner.name }}</p>
            <p class="mt-1 text-sm leading-5 text-ink/75">{{ scenario.partner.position }}</p>
          </div>
          <p v-if="scenario.researchFocus" class="mt-4 border-t border-line pt-3 text-xs leading-5 text-ink/50">
            <span class="font-semibold">Research focus:</span> {{ scenario.researchFocus }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
