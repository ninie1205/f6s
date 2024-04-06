import { ref, reactive, inject } from 'vue'
import { isAxiosError } from 'axios'
import useHelpers from './useHelpers'

const chatCurrentUser = ref()
const chatConversation = reactive<any[]>([])

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
        const { data } = await $client.get('/api/conversation')
        if (data?.conversation) chatConversation.push(...JSON.parse(data?.conversation))
    } catch (error) {
      if (isAxiosError(error)) {
        errorHelper(error)
      }
    }
  }
  async function addConversation(conversation: any, client: any) {
    console.log("🚀 ~ addConversation ~ conversation:", conversation)
    chatConversation.push(conversation)
    try {
      const { data } = await client.post('/api/addMessage', conversation)
      console.log("🚀 ~ addConversation ~ data:", data)
      if (data) chatConversation[chatConversation.length - 1] = data
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
