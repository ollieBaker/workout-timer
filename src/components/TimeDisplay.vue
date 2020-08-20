<template>
  <p class="font-mono">
    <slot name="minutes" v-bind="minutes"
      ><span class="minutes">{{ minutes | pad }}</span> :
    </slot>
    <slot name="minutes" v-bind="seconds">
      <span class="secconds">{{ seconds | pad }}</span> :
    </slot>
    <slot name="millis" v-bind="millis">
      <span class="millis">{{ millis | pad }}</span>
    </slot>
  </p>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    minutes() {
      return Math.floor(this.time / 60000);
    },
    seconds() {
      return Math.floor((this.time % 60000) / 1000).toFixed(0);
    },
    millis() {
      return Math.floor((this.time % 1000) / 10).toFixed(0);
    },
  },
  filters: {
    pad: function(input) {
      return input.toString().length < 2 ? `0${input}` : input;
    },
  },
};
</script>

<style scoped></style>
