import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia, PiniaVuePlugin } from "pinia";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./myconfig";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

Vue.config.productionTip = false;
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const storage = getStorage(app);

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");

export { db, storage };
