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
      :isSelf="Boolean(isSelf)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { useUserStore } from "@/stores/user";
import ItemModal from "./ItemModal.vue";
import { Item } from "../datatypes";

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
  user: any;
  isSelf = false;
  showModal = false;
  modalItem = {};

  mounted() {
    this.user = useUserStore();
  }

  displayInfo(item: Item) {
    this.isSelf = (this.user.name === item.user) ? true : false;
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
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 15px;
  border: 2px solid black;
}

#container h2:first-child {
  text-underline-offset: 2px;
  font-style: italic;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}

#gallery {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

#gallery-item {
  float: left;
  width: 13em;
  margin: 1%;
  padding: 10px;
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
  outline: 1px solid black;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
}
</style>
