<template>
  <div id="profile">
    <div id="header">
      <Header @add-item="toggleAddItemModal" :auth="auth" :isProfile="true" />
    </div>
    <div id="user">
      <h2>Available Balance: ${{ user.balance }}</h2>
    </div>
    <Tabs>
      <Gallery
        :galleryItems="itemsForSale"
        title="Items Listed"
        :isProfile="true"
      />
      <Gallery :galleryItems="itemsSold" title="Items Sold" :isProfile="true" />
      <Gallery
        :galleryItems="itemsPurchased"
        title="Items Purchased"
        :isProfile="true"
      />
    </Tabs>
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
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import Tabs from "../components/Tabs.vue";
import { refreshStore } from "../store-helper";
import { Item, User } from "../datatypes";
import { db } from "../main";
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth";

@Component({
  components: {
    Gallery,
    Header,
    AddItemModal,
    Tabs,
  },
})
export default class Profile extends Vue {
  showAddItemModal = false;
  itemsForSale: Item[] = [];
  itemsSold: Item[] = [];
  itemsPurchased: Item[] = [];
  emptySearch = false;
  location = "";
  username = "";
  id = "";
  auth: Auth | null = null;
  user: User | null = null;

  async mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await refreshStore(user.uid);
        this.user = useUserStore();
        this.username = this.user!.name;
        this.location = this.user!.location;
        this.id = this.user!.id;
        this.itemsForSale = await this.getPersonalItems(this.id, false);
        this.itemsSold = await this.getPersonalItems(this.id, true);
        this.itemsPurchased = await this.getPurchasedItems(this.id);
        this.itemListener(this.id);
        this.balanceListener();
      } else {
        this.$router.push({ name: "login" });
      }
    });
  }

  async itemListener(user: string) {
    let q = query(collection(db, "items"));
    onSnapshot(q, async () => {
      this.itemsForSale = await this.getPersonalItems(user, false);
      this.itemsSold = await this.getPersonalItems(user, true);
      this.itemsPurchased = await this.getPurchasedItems(user);
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

  async getPersonalItems(uid: string, sold: boolean) {
    const items: Item[] = [];
    const itemCollection = collection(db, "items");

    await getDocs(itemCollection).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        if (qd.data().sold === sold && qd.data().user === uid) {
          items.push(qd.data() as Item);
        }
      });
    });

    return items;
  }

  async getPurchasedItems(uid: string) {
    const items: Item[] = [];
    const itemCollection = collection(db, "items");

    await getDocs(itemCollection).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        if (qd.data().sold === true && qd.data().buyer === uid) {
          items.push(qd.data() as Item);
        }
      });
    });

    return items;
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
</style>
