<template>
  <h1 id="h1">
    あなたの日記を作りましょう!
  </h1><br />
  <p class="p_tag">
    実際に、文章を書くことによって、バックスペースや日本語入力変換などの、<br />
    タイピングゲームでは身につかないタイピングスキルを磨くことができます。
  </p>
  <br /><br />
  <a href="continue.php">前回の続きから書く</a>
  <a href="diary_list.php">今まで書いた日記を見る</a>
  <br />
  <br />
  <form
    method="POST"
    action="diary.php"
  >
    <input
      name="date"
      type="date"
    /><br /><br />
    <p id="inlength">
      現在の文字数:0文字
    </p>
    <textarea
      name="textarea"
      style="width: 800px; height: 200px;"
      @keyup="handleTextChange($event)"
    ></textarea>
    <br />
    <input
      id="submit"
      type="submit"
      value="保存"
    />
  </form>

  <!-- ストップウォッチを出して、カウント。
  保存するタイミングで、打った文字数と速さを計算WPM -->
  <NuxtLink to="/">
    ホーム
  </NuxtLink>
</template>

<script setup lang="ts">
useHead({
  title: '日記でタイピング！',
})

function handleTextChange (event: Event) {
  const target = event.target as HTMLTextAreaElement
  const element = document.getElementById('inlength')
  if (element) {
    element.innerHTML = '現在の文字数:' + target.value.length + '文字'
  }
}

onMounted(() => {
  const timer = document.getElementById('timer')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')

  let startTime
  let timeoutId
  let elapsedtime = 0

  function initial (){
    stop.classList.add('inactive')
    reset.classList.add('inactive')
    start.classList.remove('inactive')
  }

  function running (){
    stop.classList.remove('inactive')
    start.classList.add('inactive')
    reset.classList.add('inactive')

  }

  function stopped (){
    stop.classList.add('inactive')
    reset.classList.remove('inactive')
    start.classList.remove('inactive')
  }

  initial()



  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true){
      return
    }

    startTime = Date.now()
    running()

    function countUp (){


      const d = new Date(Date.now() - startTime + elapsedtime)
      const m = String(d.getMinutes()).padStart(2, '0')
      const s = String(d.getSeconds()).padStart(2, '0')
      const ms = String(d.getUTCMilliseconds()).padStart(3, '0')


      timer.textContent = `${m}:${s}.${ms}`



    }


    timeoutId = setInterval(countUp, 10)
  })



  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true){
      return
    }


    stopped()


    clearTimeout(timeoutId)
    elapsedtime += Date.now() - startTime


  })




  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true){
      return
    }

    initial()
    timer.textContent = '00:00.000'

    elapsedtime = 0
  })
})

</script>

<style>
#h1{
  background-color: blanchedalmond;
  border-radius: 5%;
  width: max-content;
  margin: 0;
}

p{
  margin: 0;
}
/* #inlength{
  text-align: center;
} */

.p_tag{
  background-color: gray;
  color: white;
  width: max-content;
  margin: 0;
  border-radius: 7%;
}
</style>
