<template>
  <div id="app">
    <div>
      <Header/>
    </div>
    <div>
      <Gallery/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Gallery from './components/Gallery.vue';
import Header from './components/Header.vue';

@Component({
  components: {
    Gallery,
    Header,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}

body {
  background-color: #5bbffc;
}

</style>
