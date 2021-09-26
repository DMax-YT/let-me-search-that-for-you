<template>
  <SearchCursor :cursor="cursorType" />
  <div id="search">
    <img
      src="../assets/DuckDuckGo_logo.svg"
      height="50"
      alt="DuckDuckGo Logo"
    />
    <form>
      <TypeAnimation :text="query" ref="typeInput" />
      <button @click.prevent ref="searchButton">
        <fa-icon icon="search" />
      </button>
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
  components: {
    SearchCursor,
    TypeAnimation,
  },
  data() {
    return {
      query: "",
      cursorType: "default",
    };
  },
  setup() {
    const toast = useToast();
    const route = useRoute();
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
    this.query = decodeURIComponent(query);

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
    this.toast.info("You are being redirected to fuckfuckgoogle.com");
    await wait(1600);
    window.location.replace(`https://duckduckgo.com/?q=${query}`);
  },
};
</script>

<style src="./DuckDuckGo.css"></style>
