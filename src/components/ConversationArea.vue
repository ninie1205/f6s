<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import MessageEntry from '@/components/MessageEntry.vue'
import useChat from '@/composables/useChat'

const emitter: any = inject('emitter')

const { chatCurrentUser } = useChat()
const chatInner = ref()

defineProps(['chatConversation'])
const isMine = (id: number) => {
  return id === chatCurrentUser.value?.id
}

onMounted(() => {
  emitter.on('scrollToLast', () => {
    setTimeout(() => {
      chatInner.value.scrollTop = chatInner.value?.scrollHeight
    }, 200)
  })
})

</script>
<template>
  <div ref="chatInner" class="chat-inner">
    <div v-for="messageEntry in chatConversation" :key="messageEntry.id" class="entry" :class="{'is-mine': isMine(messageEntry.from?.id), 'is-theirs': !isMine(messageEntry.from?.id)}">
      <MessageEntry :message-entry="messageEntry" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-inner {
  overflow-y: auto;
}
.entry {
  margin-top: 1.75rem;
  &:first-child {
    margin-top: 0;
  }
}
</style>
