<template>
  <div>
    <div class="text-center">
      <button class="px-4 py-2 my-3 bg-stone-300 border-rounded text-red-600" @click="restartGame">RESTART</button>
    </div>
    <Timer @timeExpired="gameOver" />

    <div class="text-center bg-blue-500 p-3">
      <span
        v-for="(character, index) in currentWord"
        :key="index"
        :class="[
          index < tmpIndex ? 'text-green-300' : 'text-white',
          'mt-2 text-3xl mb-3'
        ]"
      >
        {{ character }}
      </span>
    </div>
    <p class="mt-1 p-2 select-none text-2xl text-center bg-gray-500 text-white">{{ currentJa }}</p>
    <div>
    </div>
    <p class="text-center text-5xl">{{ result }}</p>
    <br>
    <div>
      <p
        v-if="isTargetVisible"
        :style="{ background: targetBackground }"
        @keydown.prevent="handleKeyDown"
        tabindex="0"
      >
        <input ref="userInputRef" @input="updateUserInput" :value="userInput" class="mb-5 mt-5 select-none text-3xl text-center bg-sky-500 text-white w-full rounded-none border-0" autofocus>
        <Keyboard />
      </p>
    </div>
  </div>

  <!-- TODO スコア登録データベース処理 -->
</template>

<script setup lang="ts">
import { WORDS } from "../consts/word.ts"
useHead({
    title: 'タイピング画面'
})

const userInputRef = ref(null)
const startTime = ref(0)
const endTime = ref(0)

// 音声ファイルのURL
const soundFiles = {
  correct: '/audio/correctSound.mp3',
  incorrect: 'audio/incorrectSound.mp3',
  finish: 'audio/finish.mp3',
};

// 音を再生する関数
const playSound = (soundName) => {
   const audio = ref(new Audio());
   const audioElement = audio.value;
   audioElement.src = soundFiles[soundName];
   audioElement.play();
};

// ユーザーの入力を監視してuserInputの値を更新
const updateUserInput = () => {
  userInput.value = userInputRef.value.value;
}
const isPlaying = ref(false)
const targetBackground = ref('white') // 初期の背景色
const words: string[][] = WORDS

const changeBackground = (color) => {
  targetBackground.value = color
}

const userInput = ref('')
const result = ref('')
const currentWordIndex = ref(0)

const currentWord = computed(() => {
  return words[currentWordIndex.value][0];
})
const currentJa = computed(() => {
  return words[currentWordIndex.value][1]
})

const word = computed(() => {
  return currentWord.value.substring(userInput.value);
})

const isTargetVisible = computed(() => {
  return isPlaying.value && word.value.length > 0;
})

const totalWords = computed(() => words.length)
const tmpIndex = ref(0)

const mistakesCount = ref(0)
const totalKeyPresses = ref(0)

// 間違ったキーの割合を使って正確度を計算
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

const saveScore = async (totalTime) => {
  const { data, error } = await useFetch('http://localhost:3000/results', {
    method: 'post',
    body: { score: totalTime }
  })
}

const handleKeyDown = (event) => {
  if (event.key === 'Shift') {
    return
  }
  totalKeyPresses.value += 1

  if (event.key === word.value[tmpIndex.value]) {
    playSound('correct')
    changeBackground('skyblue')
    userInput.value += event.key;
    tmpIndex.value += 1
  } else {
    playSound('incorrect')
    changeBackground('pink')
    mistakesCount.value += 1
  }

  if (userInput.value === currentWord.value) {
    if (currentWordIndex.value < totalWords.value - 1) {
      userInputRef.value.value = ""
      tmpIndex.value = 0
      currentWordIndex.value += 1; // 次の単語を表示
      userInput.value = "";
    } else {
      // 全ての単語を入力し終わったら "Success" を表示
      endTime.value = Date.now() // ゲーム終了時刻を記録
      const totalTime = endTime.value - startTime.value
      playSound('finish')
      result.value = `クリア Total Time: ${totalTime / 1000} seconds 間違いの数は、${mistakesCount.value}回です。正確度は、${typingAccuracy.value}%です。`
      isPlaying.value = false;
      saveScore(totalTime / 1000)
    }
  }
}

const startGame = () => {
  isPlaying.value = true
  currentWordIndex.value = 0
  userInput.value = ""
  result.value = ""
  startTime.value = Date.now() // ゲーム開始時刻を記録
}

const restartGame = () => {
  window.location.reload()
}

onMounted(() => {
  startGame()
})
</script>
