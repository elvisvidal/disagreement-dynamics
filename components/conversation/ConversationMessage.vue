<script setup lang="ts">
import type { ConversationHistoryItem } from '~/domain/conversation'

defineProps<{
  message: ConversationHistoryItem
  partnerName: string
}>()
</script>

<template>
  <article
    class="grid gap-2 rounded-lg border px-4 py-3 shadow-sm"
    :class="message.speaker === 'user' ? 'ml-auto border-moss/30 bg-white max-w-[88%]' : 'mr-auto border-line bg-[#fbfaf6] max-w-[88%]'"
  >
    <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/55">
      <span>{{ message.speaker === 'user' ? 'You' : partnerName }}</span>
    </div>
    <p class="text-sm leading-6 text-ink/90 md:text-[15px]">{{ message.text }}</p>
  </article>
</template>
