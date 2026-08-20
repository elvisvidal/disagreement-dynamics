<script setup lang="ts">
import type { ConversationResponse } from '~/domain/conversation'

defineProps<{
  response: ConversationResponse
}>()

const emit = defineEmits<{
  select: [response: ConversationResponse]
}>()
</script>

<template>
  <button
    type="button"
    class="group w-full rounded-lg border border-line bg-white p-4 text-left text-sm leading-6 text-ink/90 shadow-sm hover:-translate-y-0.5 hover:border-moss/50 hover:bg-[#fcfbf7] focus-visible:bg-white"
    @click="emit('select', response)"
  >
    {{ response.text }}
  </button>
</template>
