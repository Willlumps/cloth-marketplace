<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <button id="btn">{{ title }}</button>
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <a href="#" @click="goHome">HOME</a>
        <a href="#" @click="goToProfile">PROFILE</a>
        <a href="#" @click="addItem">ADD ITEMS</a>
        <a href="#" @click="logout">LOGOUT</a>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Dropdown extends Vue {
  @Prop() title!: string;
  isOpen = false;

  goToProfile() {
    this.$emit("go-profile");
  }

  goHome() {
    this.$emit("go-home");
  }

  addItem() {
    this.$emit("add-item");
  }

  logout() {
    this.$emit("logout");
  }
}
</script>

<style scoped>
.menu-item {
  margin-right: 15px;
  height: 45px;
  width: 100px;
  float: right;
}

.sub-menu {
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border: 2px solid grey;
  border-radius: 5px;
}
.sub-menu a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 200px;
  border-bottom: solid 1px grey;
  text-align: right;
}

.sub-menu a:hover {
  background-color: #f1f1f1;
  text-underline-offset: 1px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}

#btn {
  border-radius: 5px;
  height: 45px;
  width: 100px;
  font-size: 12px;
  font-weight: 600;
  background: white;
  cursor: pointer;
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
