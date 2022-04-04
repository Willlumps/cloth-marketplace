<template>
  <div class="header">
    <div id="left">
      <input type="search" id="search-site" placeholder="Search..." />
      <button id="search-btn">GO</button>
    </div>
    <div id="right">
      <button id="wishlist-btn">MY WISHLIST</button>
      <button id="wishlist-btn">MARKETPLACE</button>
      <button id="wishlist-btn" @click="$emit('add-item')">ADD ITEMS</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// TODO: Emit an event and have the parent handle the modal instead?
@Component({
  components: {},
})
export default class Header extends Vue {}
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

#search-btn {
  float: left;
  margin-left: 10px;
  padding: 17px 15px;
  border-radius: 5px;
  border: none;
}

#right button {
  margin-right: 15px;
  float: right;
  padding: 16px 15px;
  border-radius: 5px;
  border: none;
}

button {
  background-color: #86c6f4;
}

button:hover {
  background-color: #fff1ce;
  outline: 2px solid #88c6cf;
}
</style>
