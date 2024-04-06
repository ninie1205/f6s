import { ref, inject } from 'vue'
import { isAxiosError } from 'axios'
import useHelpers from './useHelpers'

const chatCurrentUser = ref()
const chatConversation = ref()

export default function useUser() {
  const { errorHelper } = useHelpers()

  async function getUserDetails() {
    const $client: any = inject("$client")
    try {
      const { data } = await $client.get('/api/me')
      if (data?.currentUser) {
        chatCurrentUser.value = JSON.parse(data?.currentUser)
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
        const { data } = await $client.get('/api/conversations')
        if (data?.conversation) chatConversation.value = JSON.parse(data?.conversation)
    } catch (error) {
      if (isAxiosError(error)) {
        errorHelper(error)
      }
    }
  }
  async function addConversation(conversation: any, client: any) {
    try {
      const { data } = await client.post('/api/addMessage', conversation)
      if (data) chatConversation.value.push(data)
    } catch (error) {
      if (isAxiosError(error)) {
        errorHelper(error)
      }
    }
  }

  return {
    chatCurrentUser,
    chatConversation,
    getUserDetails,
    getConversation,
    addConversation
  }
}
