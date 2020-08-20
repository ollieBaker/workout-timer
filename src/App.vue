<template>
  <div id="app">
    <router-view class="space-y-4" />
  </div>
</template>

<style>
#app {
  @apply text-gray-900 h-screen;
}
.page {
  @apply h-full;
}
.btn {
  @apply block rounded-md border-2 border-gray-400 px-4 py-2;
}
</style>
