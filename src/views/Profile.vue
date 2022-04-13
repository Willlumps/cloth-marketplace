<template>
  <div id="profile">
    <Header @add-item="toggleAddItemModal" :auth="auth" :isProfile="true" />
    <Gallery :galleryItems="itemsForSale" title="For Sale" :isProfile="true" />
    <Gallery :galleryItems="itemsSold" title="Items Sold" :isProfile="true" />
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
import { useUserStore } from "@/stores/user";
import { collection, onSnapshot, query } from "firebase/firestore";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getPersonalItems } from "../get-items";
import { Item } from "../datatypes";
import { db } from "../main";
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth";

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
  user: any;

  async mounted() {
    this.user = useUserStore();
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.username = this.user.name;
        this.location = this.user.location;
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

  toggleAddItemModal() {
    this.showAddItemModal = !this.showAddItemModal;
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
