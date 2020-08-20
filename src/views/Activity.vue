<template>
  <div class="activity page">
    <section class="current">
      <h1 class="text-6xl">
        {{ state === "active" ? currentReps : "rest" }}
      </h1>
    </section>
    <section class="time flex-col">
      <p v-if="state === 'resting'" class="rest-time text-4xl">
        <span class="minutes">{{ minutes }}</span> :
        <span class="secconds">{{ secconds }}</span> :
        <span class="millis">{{ millis }}</span>
      </p>
      <p class="text-3xl">
        <span class="minutes">{{ minutes }}</span> :
        <span class="secconds">{{ secconds }}</span> :
        <span class="millis">{{ millis }}</span>
      </p>
    </section>
    <section class="actions">
      <button @click="handleAction" class="btn uppercase text-2xl">
        {{ primaryActionLabel }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: "ActivityTracker",
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      states: ["idle", "active", "resting", "ended"],
      state: "idle",
      routine: [5, 10, 15, 20],
      set: 0,
      repeat: 1,
      time: {
        minutes: 0,
        secconds: 0,
        millis: 0,
      },
    };
  },
  computed: {
    currentReps() {
      return this.routine[this.set];
    },
    primaryActionLabel() {
      switch (this.state) {
        case "idle":
          return "start";
        case "active":
          return "done";
        case "resting":
          return "next";
        case "ended":
          return "finish";
      }
      return "";
    },
    minutes() {
      return this.time.minutes;
    },
    secconds() {
      return this.time.secconds;
    },
    millis() {
      return this.time.millis;
    },
  },
  methods: {
    handleAction() {
      switch (this.state) {
        case "idle":
          this.state = "active";
          break;
        case "active":
          this.state = this.handleActiveStateChange(this.set, this.routine);
          break;
        case "resting":
          this.state = "active";
          break;
        case "ended":
          this.set = 0;
          this.repeat = 1;
          this.state = "idle";
          break;
      }
    },
    handleActiveStateChange(set, { length }) {
      if (set === length - 1) {
        if (this.repeat) {
          this.repeat--;
          this.set = 0;
          return "resting";
        }
        return "ended";
      } else {
        this.set++;
        return "resting";
      }
    },
  },
};
</script>

<style scoped>
.page {
  @apply flex flex-col;
}
section {
  @apply flex justify-center items-center bg-red-100 flex-1;
}
</style>
