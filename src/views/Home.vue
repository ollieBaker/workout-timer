<template>
  <div class="home page flex flex-col items-center">
    <section class="top section flex items-center justify-center">
      <button class="btn" @click="$router.push({ name: 'Activity' })">
        START
      </button>
    </section>
    <section class="bottom section p-4">
      <div class="config bg-gray-400 m-4 h-32"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
.section {
  @apply w-full;
}
.top.section {
  height: 60%;
}
</style>
