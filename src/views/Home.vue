<template>
  <div id="app">
    <div>
      <Header @add-item="toggleAddItemModal" @search-term="searchItem" @refresh-gallery="refreshItems" />
    </div>
    <div>
      <Gallery :key="refreshGallery" :galleryItems="items" :location="location" :searchMatch="emptySearch" />
    </div>
    <AddItemModal
      v-show="showAddItemModal"
      @close-modal="toggleAddItemModal"
      @add-success="refresh"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getAllItems } from "../get-items";
import { db } from "../myconfig";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

@Component({
  components: {
    Gallery,
    Header,
    AddItemModal,
  },
})
export default class Home extends Vue {
  showAddItemModal = false;
  refreshGallery = 0;
  items: any[] = [];
  location = "";
  emptySearch = false;

  async mounted() {
    this.items = await getAllItems();
    // TODO: Get location from user after authentication
    this.location = "Grand Rapids";
  }

  async toggleAddItemModal() {
    this.showAddItemModal = !this.showAddItemModal;
  }

  async refresh() {
    this.items = await getAllItems();
    this.showAddItemModal = !this.showAddItemModal;
    this.refreshGallery++;
  }

  async refreshItems() {
    this.items = await getAllItems();
    this.emptySearch = false;
  }

  async searchItem(value: string) {
    const searchTerms = value.split(" ");
    const itemList: any[] = [];

    const itemCollection = collection(db, "items");
    await getDocs(itemCollection).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        itemList.push(qd.data());
      });
    });
    const filteredItems = itemList.filter((data) => data.tags.some((r: string) => searchTerms.includes(r)));
    if (filteredItems.length == 0) {
      this.emptySearch = true;
    } else {
      this.emptySearch = false;
    }
    this.items = filteredItems;
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
