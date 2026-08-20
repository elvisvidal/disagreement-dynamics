<script setup lang="ts">
import ConversationGraph from '~/components/conversation/ConversationGraph.vue'
import ConversationMessage from '~/components/conversation/ConversationMessage.vue'
import ConversationMetrics from '~/components/conversation/ConversationMetrics.vue'
import ClaimTracker from '~/components/conversation/ClaimTracker.vue'
import MoveExplanation from '~/components/conversation/MoveExplanation.vue'
import OutcomeCard from '~/components/conversation/OutcomeCard.vue'
import PathComparison from '~/components/conversation/PathComparison.vue'
import ResponseCard from '~/components/conversation/ResponseCard.vue'
import { getScenario } from '~/data/scenarios'

const route = useRoute()
const scenario = getScenario(String(route.params.id))

if (!scenario) {
  throw createError({ statusCode: 404, statusMessage: 'Scenario not found' })
}

const {
  state,
  currentNode,
  responses,
  isTerminal,
  divergenceTurn,
  selectResponse,
  restartConversation,
  replayFrom
} = useConversation(scenario)
</script>

<template>
  <main class="min-h-screen px-4 py-5 md:px-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <NuxtLink class="text-sm font-medium text-ink/60 hover:text-ink" to="/scenarios">Back to scenarios</NuxtLink>
          <div v-if="scenario.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
            <span v-for="tag in scenario.tags" :key="tag" class="rounded-full bg-paper px-2 py-1 text-[11px] font-medium text-ink/55">{{ tag }}</span>
          </div>
          <h1 class="mt-3 font-serif text-3xl text-ink md:text-4xl">{{ scenario.title }}</h1>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-ink/70">{{ scenario.proposition }}</p>
        </div>
        <div class="max-w-sm rounded-lg border border-line bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-wide text-ink/50">{{ scenario.partner.name }}</p>
          <p class="mt-1 text-sm leading-5 text-ink/75">{{ scenario.partner.position }}</p>
        </div>
      </header>

      <PathComparison class="mb-5" :paths="state.completedPaths" />

      <div class="grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,1fr)]">
        <section class="rounded-lg border border-line bg-[#fbfaf6] p-4 shadow-sm md:p-6" aria-labelledby="conversation-title">
          <div class="mb-4 flex items-center justify-between gap-3">
            <h2 id="conversation-title" class="text-sm font-semibold uppercase tracking-wide text-ink/60">Conversation</h2>
            <span class="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink/60">Turn {{ state.moveHistory.length + 1 }}</span>
          </div>

          <div class="grid gap-3">
            <ConversationMessage
              v-for="message in state.messageHistory"
              :key="message.id"
              :message="message"
              :partner-name="scenario.partner.name"
            />
          </div>

          <MoveExplanation class="mt-5" :explanation="state.lastExplanation" />

          <OutcomeCard
            v-if="isTerminal"
            class="mt-5"
            :state="state"
            :scenario="scenario"
            :divergence-turn="divergenceTurn"
            @replay="replayFrom"
            @restart="restartConversation"
          />

          <div v-else class="mt-6">
            <p class="mb-3 text-sm font-semibold text-ink">What do you say?</p>
            <div class="grid gap-3">
              <ResponseCard
                v-for="response in responses"
                :key="response.id"
                :response="response"
                @select="selectResponse"
              />
            </div>
          </div>
        </section>

        <aside class="grid content-start gap-5">
          <ConversationMetrics :metrics="state.metrics" />
          <ClaimTracker
            :original-question="scenario.proposition"
            :unresolved-claims="state.unresolvedClaims"
            :resolved-claims="state.resolvedClaims"
            :meta-disputes="state.metaDisputes"
          />
          <ConversationGraph :state="state" :scenario="scenario" />
          <section v-if="scenario.researchFocus" class="rounded-lg border border-line bg-white p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Research focus</p>
            <p class="mt-2 text-xs leading-5 text-ink/65">{{ scenario.researchFocus }}</p>
          </section>
          <section class="rounded-lg border border-line bg-white p-4 text-xs leading-5 text-ink/60">
            Identity context is intentionally not modeled as a cause of beliefs or behavior. Future versions may represent identity context separately from beliefs, conversational style, emotional state, and personal stakes.
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>
