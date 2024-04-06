import type { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { currentUser, conversation } from './mockapi.js'


export default {
  mocked(axiosClient: AxiosInstance) {
    const mock = new MockAdapter(axiosClient)
    const delay = 500
    mock.onGet("/api/me").reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, { currentUser: currentUser }]);
        }, delay)
      })
    })
    mock.onGet("/api/conversation").reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, { conversation: conversation }]);
        }, delay)
      })
    })
    mock.onPost("/api/addMessage").reply((config) => {
      const data = JSON.parse(config.data)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, data])
        }, delay)
      })
    })
  }
}
