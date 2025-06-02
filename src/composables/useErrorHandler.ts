interface ErrorNotification {
  id: string
  message: string
  type: 'error' | 'warning' | 'info'
  timeout?: number
}

export const useErrorHandler = () => {
  const notifications = ref<ErrorNotification[]>([])

  const showError = (message: string, timeout = 5000) => {
    const id = Date.now().toString()
    notifications.value.push({
      id,
      message,
      type: 'error',
      timeout,
    })
    
    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
  }

  const showWarning = (message: string, timeout = 4000) => {
    const id = Date.now().toString()
    notifications.value.push({
      id,
      message,
      type: 'warning',
      timeout,
    })
    
    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
  }

  const showInfo = (message: string, timeout = 3000) => {
    const id = Date.now().toString()
    notifications.value.push({
      id,
      message,
      type: 'info',
      timeout,
    })
    
    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const handleApiError = (error: Error & { response?: { status: number; data?: { message?: string }; statusText: string }; request?: unknown }) => {
    console.error('API Error:', error)
    
    if (error.response) {
      // Server responded with error
      const status = error.response.status
      const message = error.response.data?.message || error.response.statusText
      
      switch (status) {
      case 400:
        showError(`リクエストエラー: ${message}`)
        break
      case 401:
        showError('認証が必要です')
        break
      case 403:
        showError('アクセスが拒否されました')
        break
      case 404:
        showError('リソースが見つかりません')
        break
      case 429:
        showError('リクエストが多すぎます。しばらくお待ちください')
        break
      case 500:
        showError('サーバーエラーが発生しました')
        break
      default:
        showError(`エラーが発生しました: ${message}`)
      }
    } else if (error.request) {
      // Request made but no response
      showError('サーバーに接続できません。ネットワーク接続を確認してください')
    } else {
      // Something else happened
      showError(`予期しないエラーが発生しました: ${error.message}`)
    }
  }

  return {
    notifications: readonly(notifications),
    showError,
    showWarning,
    showInfo,
    removeNotification,
    handleApiError,
  }
}