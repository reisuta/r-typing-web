<template>
  <h1 id="title">腕試しをしてみよう！</h1>
  <hr>
  <br><br>
  <div id="parent">
  <p>腕試しタイピング</p>
  </div>
  <br>
  <br>
  <div id="start">
    <!-- NuxtLinkだと遷移時に再描画されずにinputタグのautofocusが有効にならないためaタグにする -->
    <a href="/practice">Start</a>
  </div>
  <br>
  <div id="home">
  <br><br>
    <NuxtLink to="/">ホーム画面に戻る</NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Start!'
})
</script>

<style>
#title {
 font-size: medium;
}

#parent{
  font-size: 40px;
  display: flex;
  justify-content: center; 
  align-items: center;
  
}

input{
  background-color: black;
  color: white;
  font-size: large;
  border-radius: 10%;
  cursor: pointer;

}

#start{

  text-align    : center;
}

#start a{
  text-decoration: none;
  background-color: black;
  color: white;
  font-size: large;
  border-radius: 5%;
  border: 1px solid #3c7fb1;
  padding: 1em;
  cursor: pointer;
}

#home{
  text-align: center;
}


</style>
