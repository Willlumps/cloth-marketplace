<template>
  <div id="app">
    <div>
      <Header @add-item="toggleAddItemModal" />
    </div>
    <div>
      <Gallery :key="refreshGallery" />
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

  async toggleAddItemModal() {
    this.showAddItemModal = !this.showAddItemModal;
  }

  refresh() {
    this.showAddItemModal = !this.showAddItemModal;
    this.refreshGallery++;
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
  background-color: #86c6f4;
}
</style>
