<template>
  <div id="container">
    <h2>FEATURED ITEMS OR SOME SHIT IDK</h2>
    <h2 v-if="searchMatch">No results :(</h2>
    <div id="gallery">
      <template v-for="item in this.galleryItems">
        <div
          v-bind:key="item.img"
          id="gallery-item"
          @click="displayInfo(item)"
        >
          <img
            width="200px"
            height="200px"
            v-bind:src="item.img"
            class="logo"
          />
        </div>
      </template>
    </div>
    <ItemModal
      v-show="showModal"
      @close-modal="toggleModal"
      v-bind:item="this.modalItem"
      v-bind:location="this.location"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ItemModal from "./ItemModal.vue";

@Component({
  components: {
    ItemModal,
  },
})
export default class Gallery extends Vue {
  @Prop() galleryItems!: object[];
  @Prop() location!: string;
  @Prop() searchMatch!: boolean;
  showModal = false;
  modalItem = {};

  mounted() {
    // delete me
  }

  displayInfo(item: object) {
    this.modalItem = item;
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
</script>

<style scoped>
#container {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  padding: 5px;
}

#gallery {
  display: table;
  width: 100%;
}

#gallery-item {
  float: left;
  background: #f9f9f9;
  width: 21%;
  margin: 1%;
  padding: 1%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

#gallery-item:hover {
  box-shadow: 5px 5px 5px #d29d2b;
}

#galler-item img {
  width: 100%;
}
</style>
