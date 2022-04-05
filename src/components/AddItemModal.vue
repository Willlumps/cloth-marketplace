<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop="">
      <h1>List Item</h1>
      <div id="field">
        <div id="left"><h3>Item Name</h3></div>
        <input v-model="name" placeholder="Enter a name" />
      </div>
      <div id="field">
        <div id="left"><h3>Price</h3></div>
        <input v-model="price" type="tel" placeholder="0.00" />
      </div>
      <div id="field">
        <div id="left"><h3>Description</h3></div>
        <textarea v-model="description" rows="5" placeholder="Add a description..." />
      </div>
      <div id="field">
        <div id="left"><h3>Tags</h3></div>
        <input v-model="tags" placeholder="Enter, tags, comma, separated" />
      </div>
      <div id="field">
        <div id="left"><h3>Image</h3></div>
        <input id="image" type="file" ref="img" accept="image/*" />
      </div>
      <div id="btns">
        <button type="button" class="add-button" @click="addItemToGallery">Add Item!</button>
        <button type="button" class="cancel-button" @click="$emit('close-modal')">Cancel</button>
      </div>
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
        price: parseInt(this.price, 10).toFixed(2),
        tags: tagList,
      };

      // TODO: Get logged in user instead of "user1"
      const userDoc = doc(db, "users", "user1");
      updateDoc(userDoc, { items: arrayUnion(item) }).then(() => {
        console.log("Successfully Added Item");
        this.$emit("add-success");
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
  width: 550px;
  max-width: 551px;
  height: 325px;
  background-color: #9ee7ff;
  border-radius: 10px;
  margin-top: 10%;
  color: #555555;
  display: table;
  overflow-y: auto;
  border: solid 5px #eee;
}

#field {
  display: flex;
  margin-bottom: 10px;
}

#left {
  width: 25%;
}

#left h3 {
  text-align: left;
  margin-left: 15px;
}

#field input {
  margin-left: 10px;
  width: 68%;
  text-align: left;
  padding-left: 5px;
}

#field textarea {
  margin-left: 10px;
  margin-right: 15px;
  width: 375px;
  max-width: 375px;
  max-height: 700px;
  text-align: left;
  padding-left: 5px;
}

h1 {
  margin-bottom: 15px;
  border-bottom: solid 3px white;
}

#btns {
  display: flex;
  justify-content: space-around;
  width: 295px;
  float: right;
}

button {
  padding: 0.75rem 1.25rem;
  border-radius: 15px;
  color: #333;
  text-transform: uppercase;
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 125px;
  margin-right: 10px;
}

button:hover:before {
  width: 100%;
}

button:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 15px;
  z-index: -2;
}

button:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 100%;
  transition: all 0.3s;
  border-radius: 15px;
  z-index: -1;
}

.add-button:before {
  background-color: #b0ffd2;
}

.cancel-button:before {
  background-color: #ffb0b0;
}
</style>
