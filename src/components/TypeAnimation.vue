<template>
  <input v-model="typing" ref="input" />
</template>

<script>
import { wait } from "../util";

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
      default: 1500,
    },
  },
  data() {
    return {
      typing: "",
    };
  },
  methods: {
    async animate() {
      this.typing = "";
      const TYPE_DELAY =
        this.text.length < 10 ? 150 : this.duration / this.text.length;
      let i = 0;
      while (i < this.text.length) {
        this.typing += this.text.substr(i, 1);
        await wait(TYPE_DELAY);
        i += 1;
      }
    },
    focus() {
      this.$refs.input.focus();
    },
    getCoordinates() {
      return this.$refs.input.getBoundingClientRect();
    },
  },
};
</script>
