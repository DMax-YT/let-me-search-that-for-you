import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import store from "./store";

const app = createApp(App);

app.use(router);
app.use(Toast);

library.add(faSearch);
app.component("fa-icon", FontAwesomeIcon);
// app.use(store);

app.mount("#app");
