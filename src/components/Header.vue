<template>
  <header class="bg-gray-200">
    <div class="header-brand">
      <h1
        class="header-logo-wrapper"
      >
        <NuxtLink 
          to="/"
          class="header-logoWrap"
        >
          ホーム
        </NuxtLink>
      </h1>
    </div>
    <div class="header-content">
      <div class="header-upper">
        <div class="header-upper-left">
          <p class="header-tagline">
            タイピングスピードを研鑽するタイピングゲーム
          </p>
        </div>
        <div class="header-upper-right">
          <NuxtLink to="/practice">基礎練習</NuxtLink>
        </div>

        <div class="header-upper-right">
          <NuxtLink to="/diary">日記</NuxtLink>
        </div>

        <div class="header-upper-right">
          <NuxtLink to="/skilltest1">腕試しチャレンジ</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style>
.header {
  width: 100%;
  display: flex;
  /* max-width: calc(var(--max-window) + 144px); */
  max-width: calc(1920px + 144px);
  margin: 0 auto;
}
.header-brand {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 144px;
  padding: 20px 16px 0 32px;
}
.header-content {
  padding: 0 20px;
  flex: 1;
}
.header-upper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 0 8px;
}
.header-tagline {
  font-size: 12px;
  color: #777;
}
.header-lower {
  padding: 0 0 0 8px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ccc;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.header-lower::-webkit-scrollbar {
  display: none;
}
.header-logo-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header-logoWrap {
  display: block;
}
@media (--breakpoint-tablet) {
  .header-logo {
    height: 64px;
  }
  .header-upper {
    align-items: center;
    padding: 24px 24px 12px;
  }
  .header-upper-right {
    display: flex;
    align-items: center;
  }
  .header-upper-right > * {
    margin: 0 16px 0 0;
  }
  .header-upper-right > *:last-child {
    margin: 0;
  }
}
</style>
