<template>
  <div class="header">
    <div id="left">
      <input type="search" id="search-site" placeholder="Search...">
    </div>

    <div id="right">
      <a href="#about">PlaceMarket</a>
      <a href="#contact">Add Items</a>
    </div>
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #acadac;
}

#left, #right {
  width: 50%;
}

#left {
  float:left;
}

#right {
  float:right;
}

#right a {
  float: right;
  color: black;
  text-align: center;
  padding: 20px 5px;
  margin-right: 15px;
  text-decoration: none;
  font-size: 15px;
}

#search-site{
  margin-left: 10px;
  margin-top: 15px;
  width: 50%;
  font-size: 25px;
  text-align: left;
  border-radius: 5px;
  float:left;
}

</style>
