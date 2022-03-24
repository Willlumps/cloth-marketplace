<template>
  <div id="container">
    <h2>FEATURED ITEMS OR SOME SHIT IDK</h2>
    <div id="gallery">
      <div v-for="n in 10" v-bind:key="n" id="gallery-item">
        <a href="https://www.google.com">
          <img alt="Vue logo" src="../assets/logo.png" class="logo">
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Gallery extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#container {
  max-width: 1000px;
  /* padding: 10px; */
  margin: 0 auto;
  background: rgba(0,0,0,.2);
  margin-top: 20px;
  padding: 5px;

}

#gallery {
  /* border: 2px solid #cccccc; */
  display: table;
  width: 100%;
}

#gallery-item {
    float: left;
    background: #f9f9f9;
    width: 21%;
    margin: 1%;
    padding: 1%;
    box-shadow: 5px 5px 5px rgba(0,0,0,.2);
}

#galler-item img {
    width: 100%;
}

</style>
