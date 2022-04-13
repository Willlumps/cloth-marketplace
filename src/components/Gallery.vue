<template>
  <div id="container">
    <h2>{{ title }}</h2>
    <h2 v-if="searchMatch">No results :(</h2>
    <div id="gallery">
      <template v-for="item in this.galleryItems">
        <div v-bind:key="item.img" id="gallery-item" @click="displayInfo(item)">
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
      :isProfile="Boolean(isProfile)"
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
  @Prop() searchMatch!: boolean;
  @Prop() title!: string;
  @Prop() isProfile!: boolean;
  showModal = false;
  modalItem = {};

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
  /* background: rgba(204, 241, 255, 0.8); */
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 15px;
  border: 2px solid grey;
}

#gallery {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

#gallery-item {
  float: left;
  /* background: #f9f9f9; */
  width: 13em;
  margin: 1%;
  padding: 10px;
  /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2); */
  cursor: pointer;
  border-radius: 7px;
}

#gallery-item:hover {
  transform: scale(1.05);
}

#gallery-item img {
  width: 95%;
  padding: 5px;
}

#gallery-item img {
  object-fit: scale-down;
  outline: 2px solid grey;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}
</style>
