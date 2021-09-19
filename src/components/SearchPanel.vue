<template>
  <div @click="generateLink" class="search-panel">
    <img :src="logo" />
  </div>
</template>

<script>
export default {
  name: "SearchPanel",

  props: {
    logo: {
      type: String,
      required: true,
    },
    searchEngine: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  emits: {
    generateLink: null,
  },

  methods: {
    generateLink() {
      const encodedQuery = encodeURI(this.query);
      const link = `${window.location.href}${this.searchEngine}?q=${encodedQuery}`;
      this.$emit("generateLink", link);
    },
  },
};
</script>
