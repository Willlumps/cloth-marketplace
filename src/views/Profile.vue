<template>
  <div id="profile">
    <Header/>
    <h1>I'm a profile</h1>
    <button @click="goHome">Temp Home Button</button>
    <Gallery :galleryItems="itemsForSale" :location="location" title="For Sale" :isProfile="true" />
    <Gallery :galleryItems="itemsSold" :location="location" title="Items Sold" :isProfile="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { collection, onSnapshot, query } from "firebase/firestore";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getPersonalItems } from "../get-items";
import { Item } from "../datatypes";
import { db } from "../main";

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

  async mounted() {
    this.itemsForSale = await getPersonalItems("user1", false);
    this.itemsSold = await getPersonalItems("user1", true);
    this.location = "Grand Rapids";
    this.itemListener();
  }

  async itemListener() {
    let q = query(collection(db, "items"));
    onSnapshot(q, async () => {
      this.itemsForSale = await getPersonalItems("user1", false);
      this.itemsSold = await getPersonalItems("user1", true);
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
