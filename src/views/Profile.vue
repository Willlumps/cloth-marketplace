<template>
  <div id="profile">
    <Header/>
    <h1>I'm a profile</h1>
    <button @click="goHome">Temp Home Button</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Gallery from "../components/Gallery.vue";
import Header from "../components/Header.vue";
import AddItemModal from "../components/AddItemModal.vue";
import { getAllItems } from "../get-items";

@Component({
  components: {
    Gallery,
    Header,
    AddItemModal,
  },
})
export default class Profile extends Vue {
  showAddItemModal = false;
  refreshGallery = 0;
  items: any[] = [];
  emptySearch = false;

  async mounted() {
    this.items = await getAllItems();
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
