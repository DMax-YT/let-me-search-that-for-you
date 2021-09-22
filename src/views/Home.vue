<template>
  <div class="home">
    <site-title />

    <div class="center" id="search-form">
      <input
        @keydown.enter="saveQuery"
        id="search-input"
        v-model="query"
        placeholder="Type your query here"
      />
      <button @click="saveQuery" id="search-button">Search</button>
    </div>

    <div v-if="generated" class="center" id="search-engines">
      <search-panel
        v-for="searchEngine of $options.searchEngines"
        :key="searchEngine[0]"
        :query="savedQuery"
        :searchEngine="searchEngine[0]"
        :logo="searchEngine[1]"
        @generateLink="copyLink"
      />
    </div>

    <site-footer />
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { copyToClipboard } from "../util";

import SiteTitle from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import SearchPanel from "../components/SearchPanel.vue";

import GoogleLogo from "../assets/Google_logo.svg";
import YandexLogo from "../assets/Yandex_logo.svg";
import DuckDuckGoLogo from "../assets/DuckDuckGo_logo.svg";

export default {
  name: "Home",

  searchEngines: [
    ["google", GoogleLogo],
    ["yandex", YandexLogo],
    ["duckduckgo", DuckDuckGoLogo],
  ],

  setup() {
    const toast = useToast();

    return { toast };
  },

  components: {
    SiteTitle,
    SiteFooter,
    SearchPanel,
  },

  data() {
    return {
      query: "",
      savedQuery: "",
      generated: false,
    };
  },
  methods: {
    async copyLink(link) {
      await copyToClipboard(link);
      this.toast.success("Link was successfully copied to clipboard.");
    },
    saveQuery() {
      if (this.query.length === 0) {
        this.toast.error("Query should be longer than 0");
        return;
      }

      if (this.savedQuery !== "" && this.savedQuery !== this.query) {
        this.toast.success("Link was updated");
      }

      this.savedQuery = this.query;
      this.generated = true;
    },
  },
};
</script>

<style src="./Home.css"></style>
