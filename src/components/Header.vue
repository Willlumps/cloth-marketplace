<template>
  <div class="header">
    <div id="left">
      <input v-model="searchinput" type="search" id="search-site" placeholder="Search..." />
      <button id="btn" @click="search">GO</button>
    </div>
    <div id="right">
      <button id="btn">MY WISHLIST</button>
      <button id="btn">MARKETPLACE</button>
      <button id="btn" @click="$emit('add-item')">ADD ITEMS</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Header extends Vue {
  searchinput = "";

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
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
}

#left,
#right {
  width: 50%;
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
  font-size: 25px;
  text-align: left;
  border-radius: 5px;
  float: left;
  padding: 10px 15px;
  border-color: #86c6f4;
}

#left #btn {
  float: left;
  margin-left: 10px;
  margin-top: 4px;
  padding: 17px 15px;
  border-radius: 5px;
  border: none;
  width: 75px;
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
  width: 150px;
  font-size: 12px;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in 0s;
  outline: 2px solid grey;
}

#btn:hover {
  background-color: #ccf1ff;
  border-radius: 60px;
  color: rgb(5, 5, 5) !important;
}

#left #btn:hover {
  background-color: #ccf1ff;
  border-radius: 60px;
  color: rgb(5, 5, 5) !important;
}


</style>
