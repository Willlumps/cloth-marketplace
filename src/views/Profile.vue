<template>
  <div id="profile">
    <Header />
    <h1>I'm a profile</h1>
    <button @click="goHome">Temp Home Button</button>
    <Gallery
      :galleryItems="itemsForSale"
      :location="location"
      title="For Sale"
      :isProfile="true"
    />
    <Gallery
      :galleryItems="itemsSold"
      :location="location"
      title="Items Sold"
      :isProfile="true"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { collection, onSnapshot, query } from "firebase/firestore";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getPersonalItems, getUserInfoById } from "../get-items";
import { Item } from "../datatypes";
import { db } from "../main";
import { getAuth, Auth, signOut, onAuthStateChanged } from "firebase/auth";

@Component({
  components: {
    Gallery,
    Header,
    AddItemModal,
  },
})
export default class Profile extends Vue {
  showAddItemModal = false;
  itemsForSale: Item[] = [];
  itemsSold: Item[] = [];
  emptySearch = false;
  location = "";
  username = "";
  auth: Auth | null = null;

  async mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let info = await getUserInfoById(user.uid);
        console.log(info);
        console.log(info![0]);
        console.log(info![1]);
        this.username = info![0];
        this.location = info![1];
        this.itemsForSale = await getPersonalItems(this.username, false);
        this.itemsSold = await getPersonalItems(this.username, true);
        this.itemListener(this.username);
      } else {
        this.$router.push({ name: "login" });
      }
    });
  }

  async itemListener(user: string) {
    let q = query(collection(db, "items"));
    onSnapshot(q, async () => {
      this.itemsForSale = await getPersonalItems(user, false);
      this.itemsSold = await getPersonalItems(user, true);
    });
  }

  async toggleAddItemModal() {
    this.showAddItemModal = !this.showAddItemModal;
  }

  goHome() {
    this.$router.push({ name: "home" });
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}

body {
  background-color: #ccf1ff;
}
</style>
