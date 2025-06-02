<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6">ランキング</h1>
    
    <div class="flex justify-center mb-6">
      <div class="bg-gray-200 rounded-lg p-1">
        <button 
          v-for="type in scoreTypes" 
          :key="type.value"
          @click="selectedType = type.value"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            selectedType === type.value 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ type.label }}
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 border-b">
        <h2 class="text-xl font-semibold">{{ getCurrentTypeLabel() }} - トップ 10</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <p>読み込み中...</p>
      </div>
      
      <div v-else-if="scores.length === 0" class="p-6 text-center">
        <p>まだスコアがありません</p>
      </div>
      
      <div v-else>
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">順位</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ユーザー名</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WPM</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">正確度</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(score, index) in scores" :key="score.id" :class="index < 3 ? 'bg-yellow-50' : ''">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span v-if="index === 0" class="text-2xl">🥇</span>
                  <span v-else-if="index === 1" class="text-2xl">🥈</span>
                  <span v-else-if="index === 2" class="text-2xl">🥉</span>
                  <span v-else class="text-sm font-medium text-gray-900">{{ index + 1 }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ score.user_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ score.wpm?.toFixed(1) || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ score.accuracy?.toFixed(1) || 'N/A' }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ score.time_taken?.toFixed(1) || 'N/A' }}s</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(score.completed_at) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center mt-6">
      <NuxtLink to="/" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        ホームに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'ランキング - R-Typing'
})

const selectedType = ref('quotes')
const scores = ref([])
const loading = ref(false)

const scoreTypes = [
  { value: 'quotes', label: '文学作品' },
  { value: 'kanjis', label: '漢字' },
  { value: 'jukugos', label: '熟語' }
]

const getCurrentTypeLabel = () => {
  const type = scoreTypes.find(t => t.value === selectedType.value)
  return type ? type.label : ''
}

const fetchLeaderboard = async () => {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:4000/api/v1/leaderboard/${selectedType.value}`)
    if (response.ok) {
      scores.value = await response.json()
    } else {
      console.error('Failed to fetch leaderboard:', response.statusText)
      scores.value = []
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    scores.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP')
}

watch(selectedType, () => {
  fetchLeaderboard()
})

onMounted(() => {
  fetchLeaderboard()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>