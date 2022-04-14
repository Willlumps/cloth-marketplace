<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop="">
      <div id="left">
        <img v-bind:src="item.img" class="scale" />
      </div>
      <div class="item-info">
        <div class="primary-info">
          <h1>{{ item.name }}</h1>
          <div class="location">
            <img src="../assets/money.png" />
            <h3>${{ item.price }}</h3>
          </div>
          <div class="location">
            <img src="../assets/globe.png" />
            <h3>{{ item.location }}</h3>
          </div>
        </div>
        <div class="price"></div>
        <div class="tags">
          <h2>Description</h2>
          <p>{{ item.description }}</p>
          <h2>Tags</h2>
          <ul v-for="(tag, n) in item.tags" :key="n">
            <li>{{ tag }}</li>
          </ul>
        </div>
      </div>
      <div v-if="!isProfile" class="btns">
        <button @click="$emit('close-modal')">Close</button>
        <button :disabled="isSelf"  @click="buy">Buy Now!</button>
      </div>
      <div v-if="isProfile" class="btns">
        <button @click="$emit('close-modal')">Close</button>
        <button @click="removeListing">Remove</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { useUserStore } from "@/stores/user";
import { removeItem } from "../get-items";
import { Item, User } from "../datatypes";
import { db, storage } from "../main";
import {
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";

@Component({
  components: {
    ItemModal,
  },
})
export default class ItemModal extends Vue {
  @Prop() item!: Item;
  @Prop() isProfile!: boolean;
  @Prop() isSelf!: boolean;
  user: User | null = null;

  mounted() {
    this.user = useUserStore();
  }

  async buy() {
    await this.buyItem(this.item.id);
    this.$emit("close-modal");
  }

  async buyItem(id: string) {
    const ref = doc(db, "items", id);
    const item = await getDoc(ref);
    if (item.data()!.price > this.user!.balance) {
      // NO BUY FOR YOU
      // TODO: Alert them?
      return;
    }
    this.creditSeller(item.data()!.user, item.data()!.price);
    this.removeFunds(this.user!.id, item.data()!.price);
    await updateDoc(ref, {
      sold: true,
    });
  }

  async creditSeller(id: string, price: number) {
    const ref = doc(db, "users", id);
    const user = await getDoc(ref);

    if (user.exists()) {
      const newBalance = parseFloat(user.data().balance) + price;
      await updateDoc(ref, {
        balance: newBalance,
      });
    }
  }

  async removeFunds(id: string, price: number) {
    const ref = doc(db, "users", id);
    const user = await getDoc(ref);

    if (user.exists()) {
      const newBalance = parseFloat(user.data().balance) - price;
      await updateDoc(ref, {
        balance: newBalance,
      });
    }
  }

  async removeListing() {
    await removeItem(this.item.id);
    this.$emit("close-modal");
  }
}
</script>

<style scoped>
div {
  float: left;
}

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
  width: 70%;
  max-width: 1000px;
  height: 45%;
  background-color: #eee;
  border-radius: 10px;
  margin-top: 10%;
  color: #555555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#left {
  width: 60%;
  height: 100%;
}

.item-info {
  width: 39%;
  height: 85%;
  border-left: 2px solid black;
  background-color: white;
}

.item-info h2 {
  margin-left: 15px;
  text-align: left;
}

.item-info p {
  margin-left: 15px;
  margin-top: 10px;
  text-align: left;
  overflow: visible;
  white-space: normal;
}

.primary-info {
  width: 100%;
  height: auto;
  border-top-right-radius: 10px;
  border-bottom: 2px solid grey;
}

h1,
h2 {
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
  font-style: italic;
}
.primary-info h1 {
  text-align: left;
  padding-left: 15px;
  padding-top: 5px;
  font-size: 325%;
}

.primary-info h2 {
  text-align: left;
  padding-bottom: 5px;
}

.location h3 {
  text-align: left;
}

.location {
  width: 100%;
  height: 25px;
  display: float;
}

.location img {
  width: 20px;
  height: 20px;
  float: left;
  padding-left: 15px;
  padding-right: 15px;
}

img {
  object-fit: scale-down;
}

.scale {
  border: 1px solid grey;
  border-radius: 7px;
  width: 80%;
  height: 79%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  padding: 2%;
}

#left img {
  margin-top: 10px;
  width: 92%;
  height: 92%;
}

ul {
  margin-left: 50px;
}

li {
  text-align: left;
  font-size: 18px;
}

.tags {
  padding-top: 15px;
}

p {
  font-size: 18px;
  margin: 20px 0;
}

.btns {
  width: 39%;
  height: 20%;
  border-left: 2px solid black;
  background-color: white;
}

button {
  border: none;
  outline: 2px solid #ccc;
}

.btns button {
  width: 45%;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
  font-family: "Open Sans", sans-serif;
}

.btns button {
  background-color: transparent;
  border-radius: 5px;
  font-size: 200%;
  cursor: pointer;
  outline: 1px solid grey;
}

.btns button:hover {
  box-shadow: 4px 4px 4px #ffa94d;
}
</style>
