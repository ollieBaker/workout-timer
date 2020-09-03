<template>
  <div id="app">
    <amplify-authenticator>
      <router-view class="space-y-4" />
    </amplify-authenticator>
  </div>
</template>

<style>
#app {
  @apply text-gray-900 h-screen;
}
.page {
  @apply h-full;
}
.btn.oversize .inner,
.btn {
  @apply block rounded-md border-2 border-gray-400 px-4 py-2;
}
.btn.oversize {
  @apply border-0 p-4;
}
</style>
