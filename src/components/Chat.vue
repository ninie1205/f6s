<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import useChat from '@/composables/useChat'
import { onBeforeMount, toRefs } from 'vue'
import ConversationArea from '@/components/ConversationArea.vue'
import ComposeArea from '@/components/ComposeArea.vue'

const { getUserDetails, getConversation } = useChat()
const { chatConversation: chatConversation } = toRefs(useChatStore())

onBeforeMount(async () => {
  await Promise.allSettled[getUserDetails(), getConversation()]
})

</script>

<template>
  <div class="chat-wrapper">
    <div v-if="chatConversation?.length" class="chat">
      <ConversationArea :chat-conversation="chatConversation" />
      <ComposeArea />
    </div>
  </div>

</template>


<style scoped lang="scss">
.chat-wrapper {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  .chat {
    display: flex;
    flex-direction: column;
    border: 1px solid #b9b9b9;
    background-color: white;
    padding: 1rem 1rem 0;
    max-height: 100%;
    position: relative;
  }
}

</style>
