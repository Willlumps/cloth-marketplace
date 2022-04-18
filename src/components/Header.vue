<template>
  <div class="header">
    <div id="left">
      <input
        v-if="Boolean(!isProfile)"
        v-on:keyup.enter="search"
        v-model="searchinput"
        type="search"
        id="search-site"
        placeholder="Search..."
      />
      <button v-if="Boolean(!isProfile)" id="btn" @click="search">GO</button>
    </div>
    <div id="center">
      <h1>Cloth Marketplace</h1>
    </div>
    <div id="right">
      <Dropdown
        id="dropdown"
        title="MENU"
        @logout="logout"
        @go-home="goHome"
        @go-profile="goToProfile"
        @add-item="addItem"
        @add-funds="toggleModal"
      />
      <div id="balance">
        <h2>Available Balance</h2>
        <h2>${{ balance }}</h2>
      </div>
    </div>
    <Funds v-show="showFundsModal" @close-modal="toggleModal" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Auth, getAuth, signOut } from "firebase/auth";
import Dropdown from "./Dropdown.vue";
import Funds from "./Funds.vue";

@Component({
  components: {
    Dropdown,
    Funds,
  },
})
export default class Header extends Vue {
  @Prop() auth!: Auth;
  @Prop() isProfile!: boolean;
  @Prop() balance!: string;
  searchinput = "";
  showFundsModal = false;

  mounted(): void {
    this.auth = getAuth();
  }

  addItem() {
    this.$emit("add-item");
  }

  toggleModal() {
    this.showFundsModal = !this.showFundsModal;
  }

  goToProfile() {
    this.$router.push({ name: "profile" });
  }

  goHome() {
    this.$router.push({ name: "home" });
  }

  async logout() {
    await signOut(this.auth!);
    this.$router.push({ name: "login" });
  }

  search() {
    this.$emit("search-term", this.searchinput);
  }

  @Watch("searchinput")
  refreshGallery() {
    if (this.searchinput === "") {
      this.$emit("refresh-gallery");
    }
  }
}
</script>

<style scoped>
#balance h2:first-child {
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}

.header {
  width: 100%;
  height: 75px;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
}

#center {
  font-size: min(2vw, 170%);
  font-family: "Dancing Script", cursive;
  text-underline-offset: 5px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}

#left,
#center,
#right {
  width: 33%;
}

#left {
  float: left;
}

#dropdown {
  position: relative;
}

#right {
  position: relative;
}

#search-site {
  margin-left: 15px;
  width: 50%;
  max-width: 500px;
  font-size: 25px;
  text-align: left;
  border-radius: 5px;
  float: left;
  padding: 10px 15px;
  outline: 1px solid #ccc;
  border: none;
}

#left #btn {
  float: left;
  margin-left: 10px;
  margin-top: 4px;
  padding: 17px 15px;
  border-radius: 5px;
  border: none;
  width: 15%;
  max-width: 55px;
}

#btn {
  height: 45px;
  width: 20%;
  max-width: 175px;
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: white;
  cursor: pointer;
  transition: all 0.01s ease-in 0s;
  outline: 1px solid #ccc;
  border: none;
  font-style: italic;
}

#btn:hover {
  box-shadow: 4px 4px 4px #ffa94d;
  white-space: normal;
  overflow: visible;
}

#balance {
  display: block;
  float: right;
  bottom: 1%;
}

#balance h2 {
  font-family: "Dancing Script", cursive;
}
</style>
