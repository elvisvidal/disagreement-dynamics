<template>
  <main class="min-h-screen px-6 py-6 md:px-10">
    <section class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-center">
      <div class="max-w-3xl">
        <p class="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-moss">Disagreement dynamics</p>
        <h1 class="font-serif text-5xl leading-tight text-ink md:text-7xl">Can a disagreement get trapped in a loop?</h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
          Explore how small changes in phrasing can make the same conversation converge, drift, escalate, or repeat itself.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <NuxtLink class="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/85" to="/scenarios">
            Start a conversation
          </NuxtLink>
          <a class="rounded-md border border-line bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-[#fbfaf6]" href="#how-it-works">
            How it works
          </a>
        </div>
      </div>
      <div id="how-it-works" class="mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
        <article class="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-ink/60">Choose</h2>
          <p class="mt-3 text-sm leading-6 text-ink/70">Enter a fictional disagreement and respond as the conversation unfolds.</p>
        </article>
        <article class="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-ink/60">Observe</h2>
          <p class="mt-3 text-sm leading-6 text-ink/70">See conversational moves classified after you choose, with short structural explanations.</p>
        </article>
        <article class="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-ink/60">Replay</h2>
          <p class="mt-3 text-sm leading-6 text-ink/70">Return to a divergence point and compare two paths through the same issue.</p>
        </article>
      </div>
    </section>
  </main>
</template>
