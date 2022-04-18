<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <button id="btn">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          class="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path class="line line2" d="M 20,50 H 80" />
        <path
          class="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
    <div class="sub-menu" v-if="isOpen">
      <a href="#" @click="goHome">HOME</a>
      <a href="#" @click="goToProfile">PROFILE</a>
      <a href="#" @click="addItem">ADD ITEMS</a>
      <a href="#" @click="funds">ADD / WITHDRAWAL FUNDS</a>
      <a href="#" @click="logout">LOGOUT</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Dropdown extends Vue {
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

  funds() {
    this.$emit("add-funds");
  }

  logout() {
    this.$emit("logout");
  }
}
</script>

<style scoped>
.menu-item {
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
  cursor: pointer;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  width: 100px;
  align-items: center;
  justify-content: right;
}

#btn:hover {
  white-space: normal;
  overflow: visible;
}

svg {
  padding-left: 10px;
  width: 40px;
  height: 50%;
}

.line {
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
</style>
