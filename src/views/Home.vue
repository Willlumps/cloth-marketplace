<template>
  <div id="app">
    <div>
      <Header
        @add-item="toggleAddItemModal"
        @search-term="searchItem"
        @refresh-gallery="refreshItems"
        :auth="auth"
      />
    </div>
    <div>
      <Gallery
        :galleryItems="items"
        :location="location"
        :searchMatch="emptySearch"
        :isProfile="false"
      />
    </div>
    <AddItemModal
      v-show="showAddItemModal"
      @close-modal="toggleAddItemModal"
      :username="username"
      :location="location"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getAllItems, getUserInfoById } from "../get-items";
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
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth";

@Component({
  components: {
    Gallery,
    Header,
    AddItemModal,
  },
})
export default class Home extends Vue {
  auth: Auth | null = null;
  showAddItemModal = false;
  items: Item[] = [];
  location = "";
  username = "";
  emptySearch = false;

  async mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.items = await getAllItems();
        let info = await getUserInfoById(user.uid);
        this.username = info![0];
        this.location = info![1];
        this.itemListener();
      } else {
        this.$router.push({ name: "login" });
      }
    });
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
    const filteredItems = itemList.filter((data) =>
      data.tags.some((r: string) => searchTerms.includes(r))
    );
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
</style>
