<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <form class="modal" @submit.prevent="addItemToGallery" @click.stop="">
      <h1>Add Item</h1>
      <div id="field">
        <div id="left"><h3>Item Name</h3></div>
        <input
          name="name"
          v-model="name"
          placeholder="Enter a name"
          :class="{ invalid: isSubmitting && !name.trim() }"
        />
      </div>
      <div id="field">
        <div id="left"><h3>Price</h3></div>
        <input
          name="price"
          v-model="price"
          type="number"
          placeholder="0.00"
          :class="{ invalid: isSubmitting && !price }"
        />
      </div>
      <div id="field">
        <div id="left"><h3>Description</h3></div>
        <textarea
          name="description"
          v-model="description"
          rows="5"
          placeholder="Add a description..."
          :class="{ invalid: isSubmitting && !description.trim() }"
        />
      </div>
      <div id="field">
        <div id="left"><h3>Tags</h3></div>
        <input
          name="tags"
          v-model="tags"
          placeholder="Enter, tags, comma, separated"
          :class="{ invalid: isSubmitting && !tags.trim() }"
        />
      </div>
      <div id="field">
        <div id="left"><h3>Image</h3></div>
        <input name="image" id="image" type="file" ref="img" accept="image/*" />
      </div>
      <div id="btns">
        <button type="button" class="add-button" @click="addItemToGallery">
          Add Item
        </button>
        <button type="button" class="cancel-button" @click="closeModal">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { useUserStore } from "@/stores/user";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../main";
import { User } from "../datatypes";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  components: {},
})
export default class AddItemModal extends Vue {
  @Prop() username!: string;
  @Prop() location!: string;
  name = "";
  description = "";
  price = "";
  tags = "";
  isSubmitting = false;
  user: User | null = null;

  mounted() {
    this.user = useUserStore();
  }

  async addItemToGallery() {
    if (!this.validateInput()) {
      this.isSubmitting = true;
      return;
    }
    const file = (document.getElementById("image") as HTMLInputElement)
      .files![0];
    const uuid = uuidv4();
    const imgURL = await this.upload(file, uuid);
    const tagList = this.tags.split(", ");

    await setDoc(doc(db, "items", uuid.toString()), {
      description: this.description,
      img: imgURL,
      name: this.name,
      price: parseFloat(parseFloat(this.price).toFixed(2)),
      tags: tagList,
      user: this.user!.id,
      id: uuid,
      sold: false,
      location: this.location,
    }).then(() => {
      console.log("Successfully Added Item");
      this.$emit("close-modal");
      this.resetForm();
    });
  }

  validateInput() {
    return (
      this.name.length > 0 &&
      this.description.length > 0 &&
      this.price.length > 0 &&
      this.tags.length > 0 &&
      this.hasImage()
    );
  }

  closeModal() {
    this.isSubmitting = false;
    this.$emit("close-modal");
  }

  hasImage() {
    return (document.getElementById("image") as HTMLInputElement).value != "";
  }

  resetForm() {
    this.name = "";
    (this.description = ""), (this.price = "");
    this.tags = "";
    this.isSubmitting = false;
    let input = document.getElementById("image") as HTMLInputElement;
    input.value = "";
  }

  async upload(file: any, uuid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const metadata = {
        contentType: "image/jpeg",
      };

      const uploadRef = ref(storage, `${uuid}.jpeg`);
      const uploadTask = uploadBytesResumable(uploadRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log(error);
          reject();
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
            return downloadURL;
          });
        }
      );
    });
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
  width: 550px;
  max-width: 551px;
  height: 325px;
  background-color: #eee;
  border-radius: 10px;
  margin-top: 10%;
  color: #555555;
  display: table;
  overflow-y: auto;
  border: solid 5px grey;
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
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
  margin-left: 15px;
}

#field input {
  margin-left: 10px;
  width: 68%;
  text-align: left;
  padding-left: 5px;
  border-radius: 5px;
  height: 25px;
  font-size: 15px;
}

#field textarea {
  margin-left: 10px;
  margin-right: 15px;
  width: 375px;
  max-width: 375px;
  max-height: 700px;
  text-align: left;
  padding-left: 5px;
  border-radius: 5px;
  font-size: 15px;
  outline: 1px solid black;
}

h1 {
  margin-bottom: 15px;
  border-bottom: solid 3px grey;
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}

#btns {
  display: flex;
  justify-content: space-around;
  width: 295px;
  float: right;
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
</style>
