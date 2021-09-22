<template>
  <SearchCursor :cursor="cursorType" />
  <div id="search">
    <header id="logo">
      <img :src="$options.GoogleLogo" alt="Google Logo" />
    </header>
    <form>
      <div id="search-form">
        <GoogleSearchIcon />
        <input v-model="typing" ref="searchInput" />
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
import GoogleLogo from "../assets/Google_logo.svg";
import SearchCursor from "../components/SearchCursor.vue";
import GoogleSearchIcon from "../components/GoogleSearchIcon.vue";
import { wait, moveTo } from "../util";

export default {
  GoogleLogo,

  data() {
    return {
      query: "",
      typing: "",
      cursorType: "default",
    };
  },
  components: {
    GoogleSearchIcon,
    SearchCursor,
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

    const { searchInput, searchButton } = this.$refs;
    const mouseQuery = "#mouse";

    await moveTo(mouseQuery, {
      left: 100,
      top: 100,
    });

    const searchInputPosition = searchInput.getBoundingClientRect();
    await moveTo(mouseQuery, {
      left: searchInputPosition.x,
      top: searchInputPosition.y + 10,
      duration: 0.5,
    });

    this.cursorType = "beam";
    await wait(100);
    searchInput.focus();

    await moveTo(mouseQuery, {
      left: searchInputPosition.x + 20,
      top: searchInputPosition.y + 50,
      duration: 0.2,
    });

    this.cursorType = "default";
    await this.typeQuery();
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
    window.location.replace(`https://google.com/search?q=${this.query}`);
  },
  methods: {
    async typeQuery() {
      const TYPE_DELAY = 150;
      let i = 0;
      while (i < this.query.length) {
        this.typing += this.query.substr(i, 1);
        await wait(TYPE_DELAY);
        i += 1;
      }
    },
  },
};
</script>

<style src="./Google.css"></style>
