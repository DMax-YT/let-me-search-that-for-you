<template>
  <SearchCursor :cursor="cursorType" />
  <div id="search">
    <header id="logo">
      <img src="../assets/Google_logo.svg" alt="Google Logo" />
    </header>
    <form>
      <div id="search-form">
        <GoogleSearchIcon />
        <TypeAnimation :text="query" ref="typeInput" />
      </div>

      <button @click.prevent class="search-button" ref="searchButton">
        Google Search
      </button>
      <button @click.prevent class="search-button">I'm Feeling Lucky</button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import SearchCursor from "../components/SearchCursor.vue";
import GoogleSearchIcon from "../components/GoogleSearchIcon.vue";
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
    GoogleSearchIcon,
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
    this.query = decodeURIComponent(query);

    const { typeInput, searchButton } = this.$refs;
    const mouseQuery = "#mouse";

    await moveTo(mouseQuery, {
      left: 100,
      top: 100,
    });

    const searchInputPosition = typeInput.getCoordinates();
    await moveTo(mouseQuery, {
      left: searchInputPosition.x,
      top: searchInputPosition.y + 10,
      duration: 0.5,
    });

    this.cursorType = "beam";
    await wait(100);
    typeInput.focus();

    await moveTo(mouseQuery, {
      left: searchInputPosition.x + 20,
      top: searchInputPosition.y + 50,
      duration: 0.2,
    });

    this.cursorType = "default";
    await typeInput.animate();
    await wait(100);

    const searchButtonPos = searchButton.getBoundingClientRect();
    await moveTo(mouseQuery, {
      left: searchButtonPos.x + searchButtonPos.width / 2,
      top: searchButtonPos.y + searchButtonPos.height / 2,
    });

    this.cursorType = "pointer";
    searchButton.focus();

    this.toast.info("It was not so hard");
    await wait(100);
    this.toast.info("You are being redirected to google.com");
    await wait(1600);
    window.location.replace(`https://google.com/search?q=${query}`);
  },
};
</script>

<style src="./Google.css"></style>
