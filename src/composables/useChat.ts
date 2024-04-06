import { inject } from 'vue'
import { isAxiosError } from 'axios'
import useHelpers from './useHelpers'
import { useChatStore } from '@/stores/chat'



export default function useUser() {
  const { errorHelper } = useHelpers()
  const { setCurrentUser, setChatConversation, addChatConversation, replaceLastChatConversation } = useChatStore()

  async function getUserDetails() {
    const $client: any = inject("$client")
    try {
      const { data } = await $client.get('/api/me')
      if (data?.currentUser) {
        setCurrentUser(JSON.parse(data?.currentUser))
      }
    } catch (error) {
      if (isAxiosError(error)) {
        errorHelper(error)
      }
    }
  }
  async function getConversation() {
    const $client: any = inject("$client")
    try {
        const { data } = await $client.get('/api/conversation')
        if (data?.conversation) setChatConversation(JSON.parse(data?.conversation))
    } catch (error) {
      if (isAxiosError(error)) {
        errorHelper(error)
      }
    }
  }
  async function addConversation(conversation: any, client: any) {
    addChatConversation(conversation)
    try {
      const { data } = await client.post('/api/addMessage', conversation)
      if (data) replaceLastChatConversation(data)
    } catch (error) {
      if (isAxiosError(error)) {
        errorHelper(error)
      }
    }
  }

  return {
    getUserDetails,
    getConversation,
    addConversation
  }
}
