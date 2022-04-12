<template>
  <div id="login">
    <div id="title">
      <img id="img" alt="save the planet" src="../assets/login-logo.webp">
      <h1>Company Name</h1>
    </div>
    <div id="logo">
      <h1>Login to view the site</h1>
      <h4>(Or not, I'm not a cop)</h4>
    </div>

    <div class="container">
      <div class="flip-card">
        <div id="loginpanel">
          <div id="login-header">
            <h2>Login</h2>
          </div>
          <div id=login-input>
            <input name="email" v-model="email" type="text" placeholder="Email...">
            <input name="password" v-model="password" type="text" placeholder="Password...">
          </div>
          <div id=login-buttons>
            <button>Login</button>
            <p>- or -</p>
            <button @click="flipContainer" id="reg">Register</button>
          </div>
        </div>
        <div id="registerpanel">
          <div id="login-header">
            <h2>Register</h2>
          </div>
          <div id=login-input>
            <input name="email" v-model="email" type="text" placeholder="Email...">
            <input name="password" v-model="password" type="text" placeholder="Password...">
          </div>
          <div id=login-buttons>
            <button>Register</button>
            <p>- or -</p>
            <button @click="flipContainer">Go Back</button>
          </div>
        </div>
      </div>
    </div>
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
  shouldRegister = false;
  password = "";
  email = "";

  flipContainer() {
    const card = document.querySelector(".container");
    card?.classList.toggle('flip');
  }

  login() {
    this.$router.push({ name: "home" });
  }
}
</script>

<style>
#login {
  max-width: 750px;
  margin: 0 auto;
  font-family: "Open Sans", sans-serif;
}

.container {
  width: 350px;
  height: 350px;
  perspective: 1000px;
  margin: 0 auto;
  margin-bottom: 25px;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.container.flip .flip-card {
  transform: rotateY(180deg);
}

#loginpanel, #registerpanel {
  width: 350px;
  height: 350px;
  border: 2px solid grey;
  border-radius: 15px;
  background-color: #f9f9f9;
  position: absolute;
  backface-visibility: hidden;
}

#registerpanel {
  transform: rotateY(180deg);
}

#img {
  width: 75px;
  height: 75px;
  margin-right: 15px;
}

#login-header {
  padding: 5px;
  font-size: 30px;
  background-color: white;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-bottom: 2px solid grey;
}

#login-input {
  margin-top: 25px;
}

#title {
  margin-top: 25px;
  margin-bottom: 25px;
  height: 75px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 170%;
  font-family: "Dancing Script", cursive;
}

#logo {
  margin-bottom: 25px;
}

#login-buttons {
  margin-top: 25px;
}

#login-buttons button {
  width: 65%;
  height: 35px;
  margin: 5px;
  border-radius: 5px;
  transition: all 0.5s ease-in 0s;
}

#login-buttons button:hover {
  background-color: #ccf1ff;
  border-radius: 60px;
  color: rgb(5, 5, 5) !important;
  transition: all 0.5s ease-in 0s;
}

#login-input input {
  height: 35px;
  width: 85%;
  font-size: 15px;
  margin: 5px;
  border-radius: 5px;
}

body {
  background-color: #ccf1ff;
}
</style>
