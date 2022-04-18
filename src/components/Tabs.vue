<template>
  <div id="tab-wrapper">
    <ul class="tab-header">
      <li
        :class="{ tab__selected: index == selectedIndex }"
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Gallery from "./Gallery.vue";

@Component({
  components: {
    Gallery,
  },
})
export default class Tabs extends Vue {
  selectedIndex = 0;
  tabs: Gallery[] = [];

  mounted() {
    this.selectTab(0);
  }

  created() {
    this.tabs = this.$children as Gallery[];
  }

  selectTab(i: number) {
    this.selectedIndex = i;
    this.tabs.forEach((tab, index) => {
      tab.isActive = index === i;
    });
  }
}
</script>

<style scoped>
#tab-wrapper {
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  border: 2px solid black;
  box-shadow: 4px 4px 4px grey;
  margin-top: 20px;
  border-radius: 15px;
  border-radius: 15px;
}

.tab-header {
  border-bottom: 2px solid black;
}

ul.tab-header {
  display: block;
  list-style: none;
}

ul.tab-header > li {
  padding: 15px 30px;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
  color: #555;
  font-family: "Dancing Script", cursive;
  font-size: 125%;
}

ul.tab-header > li:hover {
  transform: scale(1.05);
}

ul.tab-header > li.tab__selected {
  font-weight: bold;
  color: #000;
  font-size: 155%;
  text-underline-offset: 5px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
}
</style>
