<template>
  ログインフォーム
  <br />
  <form
    method="POST"
    action="login_check.php"
  >
    ユーザ名<br />
    <input
      type="text"
      name="username"
    /><br />
    パスワード<br />
    <input
      type="password"
      name="pass"
    /><br />
    <br />
    <input
      type="submit"
      value="ログイン"
    />
  </form>
  <br />
  <a href="user_add.php">新規登録</a>
</template>

<script setup lang="ts">
useHead({
  title: 'ログイン画面',
})
</script>
