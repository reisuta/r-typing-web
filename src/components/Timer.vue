<template>
  <div class="text-center bg-blue-200 p-3 mb-4">
    <p class="text-red-950 mb-4">
      残り時間: {{ timeLeft }}
    </p>
    <div class="flex justify-center space-x-2">
      <button
        class="px-4 py-2 border rounded bg-green-500 text-white"
        :disabled="isRunning"
        @click="startTimer"
      >
        Start
      </button>
      <button
        class="px-4 py-2 border rounded bg-green-500 text-white"
        :disabled="!isRunning"
        @click="stopTimer"
      >
        Stop
      </button>
      <button
        class="px-4 py-2 border rounded bg-green-500 text-white"
        @click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['timeExpired'])
const initialTime = 80 // ゲームの制限時間
const timeLeft = ref(initialTime) // タイマーの残り時間
const isRunning = ref(false) // タイマーが実行中かどうか

let timerId: ReturnType<typeof setInterval> | null = null // タイマー用のタイマーID

const startTimer = () => {
  if (!isRunning.value) {
    isRunning.value = true
    timerId = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        stopTimer()
      }
    }, 1000)
  }
}

const stopTimer = () => {
  if (isRunning.value) {
    isRunning.value = false
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
    emit('timeExpired')
  }
}

const resetTimer = () => {
  stopTimer()
  timeLeft.value = initialTime
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>
