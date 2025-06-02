<template>
  <div>
    <h1 class="text-3xl m-3 font-bold">AT-typing！</h1>
    <h2 class="m-2">
      あなたのタイピングスピードを至高に
    </h2>
    <div class="flex flex-col items-center space-y-4">
      <button class="bg-gray-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded"
        @click="challenge"
      >
        腕試しチャレンジ（文学作品）
      </button>
      
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 rounded"
        @click="kanjiPractice"
      >
        漢字練習
      </button>
      
      <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold m-2 py-2 px-4 rounded"
        @click="jukugoPractice"
      >
        熟語練習
      </button>
      
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded"
        @click="viewLeaderboard"
      >
        ランキング
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
    title: 'R-Typing'
})

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
</script>

<style>
#title {
  font-size:large;
  background-color: black;
  color: white;
  text-align: center;
 }
 
 #ques{
   margin-top: 40px;
   font-size: 20px;
 }

 .font {
   float: left;
   font-size: 15px;
   background-color:silver;
   color: white;
   width: max-content;
   border-radius: 5%;
   margin: 0;
 }

 input{
   float: left;
   margin-left: 1px;
   /* color: black; */
 }

 .a_tag{
   text-decoration: none;
   background-color: skyblue;
   color:black;
   font-weight: bold;
   font-size: large;
   border-radius: 10%;
 }

 #typ a{

  text-decoration: none;
  background-color: black;
  color: white;
  font-size: 30px;
  border-radius: 5%;
  border: 1px solid #3c7fb1;
  padding: 1em;
  cursor: pointer;
 }

 #start{
   text-align: center;
 }
</style>

