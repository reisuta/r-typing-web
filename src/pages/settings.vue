<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold text-center mb-8">
      設定
    </h1>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="mb-6">
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          ユーザー名
        </label>
        <input
          id="username"
          v-model="userName"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="あなたの名前を入力してください"
          maxlength="20"
        />
        <p class="mt-1 text-sm text-gray-500">
          ランキングに表示される名前です（最大20文字）
        </p>
      </div>
      
      <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">
          音量設定
        </h3>
        <div class="flex items-center gap-4">
          <label class="flex items-center">
            <input
              v-model="soundEnabled"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-700">効果音を有効にする</span>
          </label>
        </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 mb-2">
          表示設定
        </h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              v-model="showTimer"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-700">タイマーを表示する</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="showKeyboard"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-700">キーボードガイドを表示する</span>
          </label>
        </div>
      </div>
      
      <div class="flex justify-end gap-3">
        <button
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          @click="resetSettings"
        >
          初期設定に戻す
        </button>
        <button
          class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          @click="saveSettings"
        >
          保存
        </button>
      </div>
    </div>
    
    <div
      v-if="saveMessage"
      class="mt-4 p-4 rounded-md"
      :class="saveSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
    >
      {{ saveMessage }}
    </div>
    
    <div class="text-center mt-8">
      <NuxtLink
        to="/"
        class="text-blue-500 hover:text-blue-700 underline"
      >
        ホームに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '設定 - R-Typing',
})

const userName = ref('')
const soundEnabled = ref(true)
const showTimer = ref(true)
const showKeyboard = ref(true)
const saveMessage = ref('')
const saveSuccess = ref(false)

const loadSettings = () => {
  userName.value = localStorage.getItem('userName') || ''
  soundEnabled.value = localStorage.getItem('soundEnabled') !== 'false'
  showTimer.value = localStorage.getItem('showTimer') !== 'false'
  showKeyboard.value = localStorage.getItem('showKeyboard') !== 'false'
}

const saveSettings = () => {
  try {
    localStorage.setItem('userName', userName.value || 'Anonymous')
    localStorage.setItem('soundEnabled', soundEnabled.value.toString())
    localStorage.setItem('showTimer', showTimer.value.toString())
    localStorage.setItem('showKeyboard', showKeyboard.value.toString())
    
    saveMessage.value = '設定を保存しました'
    saveSuccess.value = true
    
    setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to save settings:', error)
    saveMessage.value = '設定の保存に失敗しました'
    saveSuccess.value = false
  }
}

const resetSettings = () => {
  userName.value = ''
  soundEnabled.value = true
  showTimer.value = true
  showKeyboard.value = true
}

onMounted(() => {
  loadSettings()
})
</script>