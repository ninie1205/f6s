<script setup lang="ts">
import { ref, inject, toRaw } from 'vue'
import useChat from '@/composables/useChat'
import { useChatStore } from '@/stores/chat'

const { addConversation } = useChat()
const { getCurrentUser, getChatConversation } = useChatStore()

const textareaContent = ref()
const emitter: any = inject('emitter')
const $client: any = inject("$client")


const addNewContent = () => {
  addConversation({
    id: getChatConversation[getChatConversation.length-1].id + 1,
    from: getCurrentUser,
    message: toRaw(textareaContent.value.innerText),
    date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
  }, $client)
  textareaContent.value.innerText = ''
  emitter.emit('scrollToLast')
}

</script>
<template>
  <div class="compose-wrapper">
    <span ref="textareaContent" class="textarea" role="textbox" contenteditable @keydown.enter.prevent="addNewContent()"></span>
    <button @click="addNewContent">
      <svg width="84" height="72" viewBox="0 0 84 72" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.04 72L84 36L0.04 0L0 28L60 36L0 44L0.04 72Z"/>
      </svg>
    </button>
  </div>

</template>


<style lang="scss" scoped>
.compose-wrapper {
  padding: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  .textarea {
    flex-shrink: 0;
    width: calc(100% - 60px);
    padding: 8px;
    border: 1px solid grey;
    max-height: 90px;
    overflow-y: auto;
  }
  button {
    cursor: pointer;
    flex-shrink: 0;
    flex-grow: 0;
    width: 60px;
    font-size: 1rem;
    border: none;
    background-color: transparent;
    text-align: center;
    padding: 0;
    svg {
      display: inline-block;
      height: 24px;
      width: 24px;
      fill: #2c3e50;
    }
    &:hover {
      svg {
        fill: #0090E3;
      }
    }
  }
}
</style>
