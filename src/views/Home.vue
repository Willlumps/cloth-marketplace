<template>
  <div id="app">
    <div>
      <Header @add-item="toggleAddItemModal" @search-term="searchItem" @refresh-gallery="refreshItems" />
    </div>
    <div>
      <Gallery :galleryItems="items" :location="location" :searchMatch="emptySearch" :isProfile="false" />
    </div>
    <AddItemModal
      v-show="showAddItemModal"
      @close-modal="toggleAddItemModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getAllItems } from "../get-items";
import { Item } from "../datatypes";
import { db } from "../main";
import {
  collection,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  query,
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
  items: Item[] = [];
  location = "";
  emptySearch = false;

  async mounted() {
    this.items = await getAllItems();
    // TODO: Get location from user after authentication
    this.location = "Grand Rapids";
    this.itemListener();
  }

  async itemListener() {
    let q = query(collection(db, "items"));
    onSnapshot(q, async () => {
      this.items = await getAllItems();
    });
  }

  async toggleAddItemModal() {
    this.showAddItemModal = !this.showAddItemModal;
  }

  async refreshItems() {
    this.items = await getAllItems();
    this.emptySearch = false;
  }

  async searchItem(value: string) {
    const searchTerms = value.split(" ");
    const itemList: Item[] = [];

    const itemCollection = collection(db, "items");
    await getDocs(itemCollection).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        itemList.push(qd.data() as Item);
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
