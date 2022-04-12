<template>
  <div id="profile">
    <Header/>
    <h1>I'm a profile</h1>
    <button @click="goHome">Temp Home Button</button>
    <Gallery :key="refreshSaleGallery" :galleryItems="itemsForSale" title="For Sale" />
    <Gallery :key="refreshSoldGallery" :galleryItems="itemsSold" title="Items Sold" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { collection, onSnapshot, query } from "firebase/firestore";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getAllItems, getPersonalItems } from "../get-items";
import { db } from "../myconfig";

@Component({
  components: {
    Gallery,
    Header,
    AddItemModal,
  },
})
export default class Profile extends Vue {
  showAddItemModal = false;
  refreshSaleGallery = 1;
  refreshSoldGallery = -1;
  itemsForSale: any[] = [];
  itemsSold: any[] = [];
  emptySearch = false;

  async mounted() {
    this.itemsForSale = await getPersonalItems("user1", false);
    this.itemsSold = await getPersonalItems("user1", true);
  }

  async itemListener() {
    let q = query(collection(db, "items"));
    const u = onSnapshot(q, async () => {
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
