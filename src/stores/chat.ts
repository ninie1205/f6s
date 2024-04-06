import { ref, computed } from 'vue'
import { defineStore, type StateTree } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatCurrentUser: {} as any,
    chatConversation: [] as any[],
  }),
  getters: {
    getCurrentUser: (state: StateTree) => state.chatCurrentUser,
    getChatConversation: (state: StateTree) => state.chatConversation,
  },
  actions: {
    setCurrentUser(n: any) {
      this.chatCurrentUser = n
    },
    setChatConversation(n: any) {
      this.chatConversation = n
    },
    addChatConversation(n: any) {
      this.chatConversation.push(n)
    },
    replaceLastChatConversation(n: any) {
      if (this.chatConversation.length) this.chatConversation[this.chatConversation.length - 1] = n
    },
  }
})
