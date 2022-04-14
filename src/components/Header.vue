<template>
  <div class="header">
    <div id="left">
      <input
        v-if="Boolean(!isProfile)"
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
      <button id="btn" @click="logout">LOGOUT</button>
      <button v-if="Boolean(!isProfile)" id="btn" @click="goToProfile">
        PROFILE
      </button>
      <button v-if="Boolean(isProfile)" id="btn" @click="goHome">HOME</button>
      <button id="btn" @click="$emit('add-item')">ADD ITEMS</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Auth, getAuth, signOut } from "firebase/auth";

@Component({
  components: {},
})
export default class Header extends Vue {
  @Prop() auth!: Auth;
  @Prop() isProfile!: boolean;
  searchinput = "";

  mounted(): void {
    this.auth = getAuth();
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

#right {
  float: right;
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
}

#right button {
  margin-right: 15px;
  float: right;
  padding: 16px 15px;
  border-radius: 5px;
  border: none;
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
</style>
