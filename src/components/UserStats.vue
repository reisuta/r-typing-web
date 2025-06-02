<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div
      v-if="loading"
      class="text-center py-4"
    >
      <p class="text-gray-500">
        統計を読み込み中...
      </p>
    </div>
    
    <div
      v-else-if="error"
      class="text-center py-4"
    >
      <p class="text-red-500">
        {{ error }}
      </p>
    </div>
    
    <div
      v-else-if="stats"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-500 mb-1">
          総プレイ回数
        </h3>
        <p class="text-2xl font-bold text-gray-900">
          {{ stats.total_games }}
        </p>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-500 mb-1">
          平均WPM
        </h3>
        <p class="text-2xl font-bold text-gray-900">
          {{ stats.average_wpm?.toFixed(1) || '0.0' }}
        </p>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-gray-500 mb-1">
          平均正確性
        </h3>
        <p class="text-2xl font-bold text-gray-900">
          {{ stats.average_accuracy?.toFixed(1) || '0.0' }}%
        </p>
      </div>
      
      <div class="bg-blue-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-blue-600 mb-1">
          最高WPM
        </h3>
        <p class="text-2xl font-bold text-blue-700">
          {{ stats.best_wpm?.toFixed(1) || '0.0' }}
        </p>
      </div>
      
      <div class="bg-green-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-green-600 mb-1">
          最高正確性
        </h3>
        <p class="text-2xl font-bold text-green-700">
          {{ stats.best_accuracy?.toFixed(1) || '0.0' }}%
        </p>
      </div>
      
      <div class="bg-purple-50 rounded-lg p-4">
        <h3 class="text-sm font-medium text-purple-600 mb-1">
          最近のスコア
        </h3>
        <p class="text-2xl font-bold text-purple-700">
          {{ stats.recent_scores?.length || 0 }}
        </p>
      </div>
    </div>
    
    <div
      v-else
      class="text-center py-4"
    >
      <p class="text-gray-500">
        まだ統計データがありません
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScores } from '~/composables/useScores'

interface Props {
  userName: string
  scoreType?: 'quotes' | 'kanjis' | 'jukugos'
}

const props = defineProps<Props>()

interface UserStatsData {
  total_games: number
  average_wpm: number
  average_accuracy: number
  best_wpm: number
  best_accuracy: number
  recent_scores: Array<{
    id?: number
    user_name?: string
    score_type?: string
    wpm: number
    accuracy: number
    time_taken?: number
    completed_at: string
  }>
}

const stats = ref<UserStatsData | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const { fetchUserStats } = useScores()

const loadStats = async () => {
  if (!props.userName) return
  
  loading.value = true
  error.value = null
  
  try {
    stats.value = await fetchUserStats(props.userName)
  } catch (e) {
    console.error('Failed to load user stats:', e)
    error.value = '統計データの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}

watch(() => props.userName, () => {
  loadStats()
}, { immediate: true })
</script>