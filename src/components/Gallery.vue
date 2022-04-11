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
  border-radius: 15px;
}

#gallery {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#gallery-item {
  float: left;
  background: #f9f9f9;
  width: 13em;
  margin: 1%;
  padding: 1%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 7px;
}

#gallery-item:hover {
  transform: scale(1.05);
}

#gallery-item img {
  width: 100%;
}

#gallery-item img {
  object-fit: scale-down;
  outline: 2px solid black;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}
</style>
