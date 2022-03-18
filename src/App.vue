<template>
  <div id="app">
    <div>
      <Topnav/>
    </div>
    <div>
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Topnav from './components/Topnav.vue';

@Component({
  components: {
    HelloWorld,
    Topnav,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  font-family: Inconsolata;
  text-align: center;
}

body {
  background-color: #50b4c3;
}

</style>
