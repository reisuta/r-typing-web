<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          R-Typing
        </h1>
        <h2 class="text-xl text-gray-600">
          あなたのタイピングスピードを至高に
        </h2>
      </div>
      
      <div class="max-w-md mx-auto space-y-4">
        <button 
          class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          @click="challenge"
        >
          <span class="text-lg">📚 腕試しチャレンジ（文学作品）</span>
        </button>
        
        <button 
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          @click="kanjiPractice"
        >
          <span class="text-lg">🈲 漢字練習</span>
        </button>
        
        <button 
          class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          @click="jukugoPractice"
        >
          <span class="text-lg">🈴 熟語練習</span>
        </button>
        
        <button 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          @click="viewLeaderboard"
        >
          <span class="text-lg">🏆 ランキング</span>
        </button>
        
        <button 
          class="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          @click="viewSettings"
        >
          <span class="text-lg">⚙️ 設定</span>
        </button>
      </div>
      
      <div class="text-center mt-8">
        <p class="text-sm text-gray-500">
          ようこそ、{{ userName || 'ゲスト' }}さん
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'R-Typing',
})

const userName = ref('')

const challenge = () => {
  navigateTo('/skilltest1')
}

const kanjiPractice = () => {
  navigateTo('/kanji-practice')
}

const jukugoPractice = () => {
  navigateTo('/jukugo-practice')
}

const viewLeaderboard = () => {
  navigateTo('/leaderboard')
}

const viewSettings = () => {
  navigateTo('/settings')
}

onMounted(() => {
  userName.value = localStorage.getItem('userName') || ''
})
</script>

