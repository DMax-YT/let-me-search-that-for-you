<template>
  <img id="mouse" :src="cursorImage" :alt="`Cursor ${this.cursor}`" />
</template>

<script>
import arrow from "../assets/default-cursor.png";
import beam from "../assets/beam.png";
import pointer from "../assets/pointer.png";

export default {
  props: {
    cursor: {
      type: String,
      required: true,
      default: "default",
    },
  },
  computed: {
    cursorImage() {
      const sources = {
        default: arrow,
        pointer: pointer,
        beam: beam,
      };
      return sources[this.cursor];
    },
  },
};
</script>

<style scoped>
#mouse {
  position: absolute;
  max-height: 21px;
  top: 100px;
  left: 100px;
}
</style>
