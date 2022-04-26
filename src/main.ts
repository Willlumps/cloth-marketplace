import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./myconfig";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseMessaging from 'firebase/messaging';

Vue.config.productionTip = false;
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const storage = getStorage(app);
//const messaging = getMessaging(app);

//messaging.getToken({vapidKey: "BLzVh5nIm3f7TjPOZqq2K1-peaqGFF4Lg2yIF0DYmsupcEju8Oj2hnRV7aNfgSumMOyOpISZoKIaim8kzUofL4k"});

Vue.prototype.$messaging = firebaseMessaging;

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");

export { db, storage, getMessaging };
