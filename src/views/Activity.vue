<template>
  <div class="activity page">
    <section class="current relative">
      <h1 class="text-6xl text-center">
        {{ state === "active" ? currentReps : message }}
      </h1>
      <div class="rep-count absolute right-0 bottom-0 p-4">
        <p>{{ repCount }}</p>
      </div>
    </section>
    <section class="time flex-col">
      <TimeDisplay
        v-if="state === 'resting' || state === 'setComplete'"
        :time="restTime"
        class="rest-time text-4xl"
      />
      <TimeDisplay :time="time" class="text-3xl" />
    </section>
    <section class="actions">
      <button
        @click="handleAction"
        class="btn oversize uppercase text-2xl border-0"
      >
        <div class="inner">
          {{ primaryActionLabel }}
        </div>
      </button>
    </section>
  </div>
</template>

<script>
import timer from "@/modules/raf-timer.js";
import TimeDisplay from "@/components/TimeDisplay.vue";
export default {
  name: "ActivityTracker",
  components: {
    TimeDisplay,
  },
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      states: ["idle", "active", "resting", "setComplete", "ended"],
      state: "idle",
      routine: [5, 10, 15, 20],
      restDuration: 30 * 1000,
      repCount: 0,
      set: 0,
      repeat: 1,
      restTime: 0,
      time: 0,
    };
  },
  created() {
    this.timer = timer();
    this.restTimer = timer();
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
        case "setComplete":
          return "start";
        case "ended":
          return "home";
      }
      return "";
    },
    message() {
      switch (this.state) {
        case "idle":
          return "get ready";
        case "active":
          return "";
        case "resting":
          return "rest";
        case "setComplete":
          return "rest & go again";
        case "ended":
          return "finished!";
      }
      return "";
    },
  },
  methods: {
    handleAction() {
      switch (this.state) {
        case "idle":
          this.startTimer();
          this.state = "active";
          break;
        case "active":
          this.state = this.handleActiveStateChange(this.set, this.routine);
          break;
        case "resting":
          this.finishRestTimer();
          this.state = "active";
          break;
        case "setComplete":
          this.finishRestTimer();
          this.state = "active";
          break;
        case "ended":
          this.reset();
          this.$router.push({ name: "Home" });
          break;
      }
    },
    handleActiveStateChange(set, { length }) {
      this.repCount += this.routine[set];
      if (set === length - 1) {
        if (this.repeat) {
          this.repeat--;
          this.set = 0;
          this.startRestTimer();
          return "setComplete";
        }
        this.timer.stop();
        return "ended";
      } else {
        this.set++;
        this.startRestTimer();
        return "resting";
      }
    },
    startTimer() {
      this.timer.start(({ total }) => (this.time = total));
    },
    startRestTimer() {
      this.restTimer.start(({ total }) => {
        this.restTime = Math.max(this.restDuration - total, 0);
      });
    },
    finishRestTimer() {
      this.restTimer.stop();
      this.restTimer.reset();
      this.restTime = 0;
    },
    reset() {
      this.timer.reset();
      this.restTimer.reset();
      this.set = 0;
      this.repCount = 0;
      this.repeat = 1;
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
