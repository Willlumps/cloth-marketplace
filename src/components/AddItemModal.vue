<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop="">
      <h1>Add Item</h1>
      <input v-model="name" placeholder="Enter a name" />
      <input v-model="description" placeholder="Add a description..." />
      <input v-model="price" type="number" placeholder="Enter a price..." />
      <input v-model="tags" placeholder="Enter tags..." />
      <input type="file" id="image" ref="img" accept="image/*" />
      <button @click="addItemToGallery">BUTTON</button>
    </div>
  </div>
</template>

<script>
import { upload } from "../get-items";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../myconfig";

export default {
  data: function () {
    return {
      name: "",
      description: "",
      price: 0,
      tags: "",
    };
  },
  methods: {
    async addItemToGallery() {
      const file = document.getElementById("image").files[0];
      const imgURL = await upload(file);
      const tagList = this.tags.split(", ");

      const item = {
        description: this.description,
        img: imgURL,
        name: this.name,
        price: this.price,
        tags: tagList,
      };

      // TODO: Get logged in user instead of "user1"
      const userDoc = doc(db, "users", "user1");
      updateDoc(userDoc, { items: arrayUnion(item) }).then(() => {
        console.log("Successfully Added Item");
        this.$emit("close-modal");
      });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  width: 600px;
  height: 575px;
  background-color: white;
  border-radius: 10px;
  margin-top: 10%;
  color: #555555;
}
</style>
