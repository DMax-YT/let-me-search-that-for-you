<template>
  <SearchCursor :cursor="cursorType" />
  <div id="search">
    <header id="logo">
      <img src="../assets/Yandex_logo.svg" alt="Yandex Logo" />
    </header>
    <form id="search-form">
      <div id="input-bg">
        <TypeAnimation :text="query" ref="typeInput" />
      </div>
      <button @click.prevent ref="searchButton">Search</button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import SearchCursor from "../components/SearchCursor.vue";
import TypeAnimation from "../components/TypeAnimation.vue";
import { wait, moveTo } from "../util";

export default {
  data() {
    return {
      query: "",
      cursorType: "default",
    };
  },
  components: {
    SearchCursor,
    TypeAnimation,
  },
  setup() {
    const route = useRoute();
    const toast = useToast();
    toast.updateDefaults({
      timeout: 1500,
      pauseOnFocusLoss: false,
    });

    return { toast, route };
  },
  async mounted() {
    const query = this.route.query.q;
    if (!query) {
      this.$router.replace({ path: "/" });
    }
    this.query = query;

    const { typeInput, searchButton } = this.$refs;
    const mouseQuery = "#mouse";

    await moveTo(mouseQuery, { top: 100, left: 100 });

    const searchInputPosition = typeInput.getCoordinates();
    await moveTo(mouseQuery, {
      left: searchInputPosition.x + 20,
      top: searchInputPosition.y + 10,
      duration: 0.5,
    });

    this.cursorType = "beam";
    await wait(100);
    typeInput.focus();

    await moveTo(mouseQuery, {
      left: searchInputPosition.x + 200,
      top: searchInputPosition.y + 50,
      duration: 0.3,
    });

    this.cursorType = "default";
    await typeInput.animate();
    await wait(100);

    const searchButtonPos = searchButton.getBoundingClientRect();
    await moveTo(mouseQuery, {
      left: searchButtonPos.x + searchButtonPos.width / 2,
      top: searchButtonPos.y + searchButtonPos.height / 2,
      duration: 1,
    });

    this.cursorType = "pointer";
    searchButton.focus();

    this.toast.info("It was not so hard");
    await wait(100);
    this.toast.info("You are being redirected to yandex.com");
    await wait(1600);
    window.location.replace(`https://yandex.com/search/?text=${this.query}`);
  },
};
</script>

<style src="./Yandex.css"></style>
