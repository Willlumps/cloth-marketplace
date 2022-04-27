<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <form class="modal" @submit.prevent="addItemToGallery" @click.stop="">
      <h1>Balance Manager</h1>
      <div id="field">
        <div id="left"><h3>Action</h3></div>
        <select
          v-model="selected"
          :class="{ invalid: isSubmitting && !selected }"
        >
          <option>Add Funds</option>
          <option>Remove Funds</option>
        </select>
      </div>
      <div id="field">
        <div id="left"><h3>Amount</h3></div>
        <input
          name="price"
          v-model="price"
          type="number"
          placeholder="0.00"
          :class="{ invalid: isSubmitting && !price }"
        />
      </div>
      <div id="btns">
        <button type="button" class="add-button" @click="addItemToGallery">
          Submit
        </button>
        <button type="button" class="cancel-button" @click="closeModal">
          Cancel
        </button>
      </div>
      <span v-show="message.length > 0">{{ message }}</span>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { useUserStore } from "@/stores/user";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../main";
import { User } from "../datatypes";

@Component({
  components: {},
})
export default class Funds extends Vue {
  user: User | null = null;
  price = "";
  isSubmitting = false;
  selected = "";
  message = "";

  mounted() {
    this.user = useUserStore();
  }

  async addItemToGallery() {
    if (!this.validateInput()) {
      this.isSubmitting = true;
      return;
    }
    const id = this.user!.id;
    const price = parseFloat(this.price);

    const ref = doc(db, "users", id);
    const user = await getDoc(ref);

    if (user.exists()) {
      const currentBalance = parseFloat(parseFloat(user.data().balance).toFixed(2));
      const newBalance =
        this.selected === "Add Funds"
          ? currentBalance + price
          : currentBalance - price;

      if (newBalance >= 0) {
        await updateDoc(ref, {
          balance: newBalance,
        });
        this.$emit("close-modal");
      } else {
        this.showMessage("Insufficient Funds");
      }
    }
  }

  validateInput() {
    return this.price.length > 0 && this.selected.length > 0;
  }

  closeModal() {
    this.isSubmitting = false;
    this.$emit("close-modal");
  }

  resetForm() {
    this.price = "";
    this.isSubmitting = false;
  }

  showMessage(txt: string) {
    this.message = txt;
    // The message will automatically disappear after 5 seconds
    setTimeout(() => {
      this.message = "";
    }, 5000);
  }
}
</script>

<style scoped>
.invalid {
  border: solid 2px red;
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
  font-style: italic;
  width: 250px;
  max-width: 551px;
  height: 225px;
  background-color: #eee;
  border-radius: 10px;
  margin-top: 10%;
  color: #555555;
  display: table;
  overflow-y: auto;
  border: solid 5px grey;
  margin-top: 225px;
}

#field {
  display: flex;
  margin-bottom: 10px;
}

#left {
  width: 25%;
  margin-right: 10px;
}

#left h3 {
  text-align: left;
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
  margin-left: 15px;
}

#field select {
  width: 59%;
}

#field input,
#field select {
  margin-left: 10px;
  text-align: left;
  padding-left: 5px;
  border-radius: 5px;
  height: 25px;
  font-size: 15px;
}

#field textarea {
  margin-left: 10px;
  margin-right: 15px;
  max-width: 375px;
  max-height: 700px;
  text-align: left;
  padding-left: 5px;
  border-radius: 5px;
  font-size: 15px;
  outline: 1px solid black;
}

h1 {
  height: 40px;
  margin-bottom: 15px;
  border-bottom: solid 3px grey;
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}

#btns {
  display: flex;
  justify-content: center;
  width: 295px;
  margin-bottom: 5px;
}

button {
  background-color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 15px;
  color: #333;
  text-transform: uppercase;
  font-size: 1rem;
  font-style: italic;
  transition: all 0.1s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: 125px;
  margin-right: 10px;
  margin-bottom: 10px;
  outline: 1px solid #ccc;
  border: none;
}

button:hover {
  box-shadow: 4px 4px 4px #ffa94d;
  white-space: normal;
  overflow: visible;
}

span {
  padding: 5px;
  border-radius: 5px;
  border: dotted 1px pink;
}
</style>
