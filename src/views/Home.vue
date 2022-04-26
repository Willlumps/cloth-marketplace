<template>
  <div id="app">
    <div id="header">
      <Header
        @add-item="toggleAddItemModal"
        @search-term="searchItem"
        @refresh-gallery="refreshItems"
        :auth="auth"
        :balance="user.balance"
        v-if="user !== null"
      />
    </div>
    <div id="user" v-if="user !== null">
      <h1>Welcome back,&nbsp;</h1>
      <h1>{{ user.name }}!</h1>
    </div>
    <div>
      <Gallery
        :galleryItems="items"
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
import { Item, User } from "../datatypes";
import { useUserStore } from "@/stores/user";
import { refreshStore } from "../store-helper";
import { db } from "../main";
import {
  collection,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  query,
  where,
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
  user: User | null = null;
  items: Item[] = [];
  showAddItemModal = false;
  emptySearch = false;
  location = "";
  username = "";

  async mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await refreshStore(user.uid);
        this.user = useUserStore();
        this.username = this.user!.name;
        this.location = this.user!.location;
        this.items = await this.getAllItems();
        this.itemListener();
        this.balanceListener();
      } else {
        this.$router.push({ name: "login" });
      }
    });
  }

  async itemListener() {
    let q = query(collection(db, "items"));
    onSnapshot(q, async () => {
      this.items = await this.getAllItems();
    });
  }

  async balanceListener() {
    let q = query(collection(db, "users"), where("id", "==", this.user!.id));
    onSnapshot(q, async (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.user!.balance = doc.data().balance;
      });
    });
  }

  async toggleAddItemModal() {
    this.showAddItemModal = !this.showAddItemModal;
  }

  async refreshItems() {
    this.items = await this.getAllItems();
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

  async getAllItems() {
    const items: Item[] = [];
    const itemCollection = collection(db, "items");

    await getDocs(itemCollection).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        if (qd.data().sold === false) {
          items.push(qd.data() as Item);
        }
      });
    });

    return items;
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}

#header {
  box-shadow: 4px 4px 4px grey;
}
#user {
  margin: 0 auto;
  max-width: 400px;
  margin-top: 25px;
  border: 2px solid black;
  border-radius: 15px;
  padding: 5px;
  font-family: "Dancing Script", cursive;
  box-shadow: 4px 4px 4px grey;
}

#user h1 {
  display: inline-block;
}

#user h1:nth-child(2) {
  text-underline-offset: 2px;
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}
</style>
