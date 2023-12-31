// import { createApp } from "vue";
import * as Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

// createApp(App).use(store).use(router).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
