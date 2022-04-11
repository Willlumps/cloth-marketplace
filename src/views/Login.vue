<template>
  <div id="login">
    <h1>You must Register/Login to view the site</h1>
    <h4>(Or not, I'm not a cop)</h4>
    <button @click="login">Click Me</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class Login extends Vue {
  login() {
    this.$router.push({ name: "home", params: { byWayOf: "Email" } });
  }
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}

body {
  background-color: #ccf1ff;
}
</style>
