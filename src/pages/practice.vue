<template>
  <div>
    <div class="text-center">
      <button
        class="px-4 py-2 my-3 bg-stone-300 border-rounded text-red-600"
        @click="restartGame"
      >
        RESTART
      </button>
    </div>
    <Timer @time-expired="gameOver" />

    <div class="text-center bg-blue-500 p-3">
      <div class="word-container">
        <span
          v-for="(character, index) in currentWord"
          :key="index"
          :class="[
            index < tmpIndex ? 'text-green-300' : 'text-white',
            'character'
          ]"
        >
          {{ character }}
        </span>
      </div>
    </div>

    <p class="mt-1 p-2 select-none text-center bg-gray-500 text-white japanese-text">
      {{ currentJa }}
    </p>

    <p class="text-center text-5xl">
      {{ result }}
    </p>
    <br />
    <div>
      <p
        v-if="isTargetVisible"
        :style="{ background: targetBackground }"
        tabindex="0"
        @keydown.prevent="handleKeyDown"
      >
        <input
          ref="userInputRef"
          :value="userInput"
          class="mb-5 mt-5 select-none text-3xl text-center bg-sky-500 text-white w-full rounded-none border-0"
          autofocus
          @input="updateUserInput"
        />
        <Keyboard />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuotes } from '~/composables/useQuotes'
import { useScores } from '~/composables/useScores'
useHead({
  title: 'タイピング画面',
})

const userInputRef = ref(null)
const startTime = ref(0)
const endTime = ref(0)

const words = ref<string[][]>([])
const isDataLoaded = ref(false)
const { fetchTypingQuotes } = useQuotes()

async function fetchData () {
  try {
    const data = await fetchTypingQuotes(20)
    if (data && data.length > 0) {
      words.value = data
    }
  } catch (error) {
    console.error('Fetch error:', error)
    // フォールバックデータ
    words.value = [['test', 'テスト']]
  } finally {
    isDataLoaded.value = true
    startGame()
  }
}

const soundFiles = {
  correct: '/audio/correctSound.mp3',
  incorrect: 'audio/incorrectSound.mp3',
  finish: 'audio/finish.mp3',
}

const playSound = (soundName) => {
  const audio = ref(new Audio())
  const audioElement = audio.value
  audioElement.src = soundFiles[soundName]
  audioElement.play()
}

const updateUserInput = () => {
  userInput.value = userInputRef.value.value
}

const isPlaying = ref(false)
const targetBackground = ref('white')

const changeBackground = (color) => {
  targetBackground.value = color
}

const userInput = ref('')
const result = ref('')
const currentWordIndex = ref(0)

const currentWord = computed(() => {
  if (!words.value || !words.value[currentWordIndex.value]) return ''
  return words.value[currentWordIndex.value][0] || ''
})

const currentJa = computed(() => {
  if (!words.value || !words.value[currentWordIndex.value]) return ''
  return words.value[currentWordIndex.value][1] || ''
})

const word = computed(() => {
  return currentWord.value.substring(userInput.value.length)
})

const isTargetVisible = computed(() => {
  return isPlaying.value && isDataLoaded.value && word.value.length > 0
})

const totalWords = computed(() => words.value.length)
const tmpIndex = ref(0)

const mistakesCount = ref(0)
const totalKeyPresses = ref(0)

const typingAccuracy = computed(() => {
  return totalKeyPresses.value > 0
    ? ((1 - mistakesCount.value / totalKeyPresses.value) * 100).toFixed(2)
    : 0
})

const gameOver = () => {
  playSound('finish')
  result.value = `時間切れです。間違いの数は、${mistakesCount.value}回です。正確度は、${typingAccuracy.value}%です。タイピングスピードを磨きましょう`
  isPlaying.value = false
}

const { createScore } = useScores()

const saveScore = async (totalTime: number) => {
  try {
    const wpm = (totalWords.value / (totalTime / 60000)) * 5 // Assuming 5 characters per word average
    const score = {
      user_name: localStorage.getItem('userName') || 'Anonymous',
      score_type: 'quotes' as const,
      wpm: wpm,
      accuracy: parseFloat(typingAccuracy.value.toString()),
      time_taken: totalTime / 1000,
      completed_at: new Date().toISOString(),
    }

    await createScore(score)
    console.log('Score saved successfully')
  } catch (e) {
    console.error('Failed to save score:', e)
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Shift') {
    return
  }
  totalKeyPresses.value += 1

  const nextChar = word.value[0]
  if (event.key === nextChar) {
    playSound('correct')
    changeBackground('skyblue')
    userInput.value += event.key
    tmpIndex.value += 1
  } else {
    playSound('incorrect')
    changeBackground('pink')
    mistakesCount.value += 1
  }

  if (userInput.value === currentWord.value) {
    if (currentWordIndex.value < totalWords.value - 1) {
      userInputRef.value.value = ''
      tmpIndex.value = 0
      currentWordIndex.value += 1
      userInput.value = ''
    } else {

      endTime.value = Date.now()
      const totalTime = endTime.value - startTime.value
      playSound('finish')
      result.value = `クリア Total Time: ${totalTime / 1000} seconds 間違いの数は、${mistakesCount.value}回です。正確度は、${typingAccuracy.value}%です。`
      isPlaying.value = false
      saveScore(totalTime)
    }
  }
}

const startGame = () => {
  if (!isDataLoaded.value || words.value.length === 0) return

  isPlaying.value = true
  currentWordIndex.value = 0
  userInput.value = ''
  result.value = ''
  startTime.value = Date.now()
}

const restartGame = () => {
  window.location.reload()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.word-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  max-width: 100%;
}

.character {
  font-size: 1.5rem;
  display: inline-block;
}

.japanese-text {
  font-size: 1.25rem;
  word-break: break-all;
  white-space: normal;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .character {
    font-size: 1.25rem;
  }
  .japanese-text {
    font-size: 1rem;
  }
}
</style>
