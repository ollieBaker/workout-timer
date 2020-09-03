<template>
  <div class="home page flex flex-col items-center">
    <section class="top section flex items-center justify-center">
      <button class="btn" @click="startActivity">
        START
      </button>
    </section>
    <section class="bottom section p-4">
      <div class="config bg-gray-400 m-4 h-32"></div>
      <amplify-sign-out></amplify-sign-out>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    startActivity() {
      if (!location.href.includes("localhost")) {
        document.documentElement.requestFullscreen();
      }
      this.$router.push({ name: "Activity" });
    }
  }
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
