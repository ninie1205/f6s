import type { AxiosError } from 'axios'
import type { ErrorDetail } from '@/types/error'

export default function useHelpers() {
  function errorHelper(error: AxiosError) {
    if (typeof error === 'string') {
      throw new Error(error)
    } else if (Array.isArray(error)) {
      if (error.length) {
        throw new Error(error[0].msg)
      }
    } else if (typeof error === 'object' && error !== null) {
      if ('message' in error) {
        throw new Error(error.message)
      }
    }
  }
  return {
    errorHelper
  }
}
