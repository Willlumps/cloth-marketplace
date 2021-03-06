<template>
  <div id="login">
    <div id="title">
      <img id="img" alt="save the planet" src="../assets/login-logo.webp" />
      <h1>Cloth Marketplace</h1>
    </div>
    <div id="logo">
      <h1>Please Login or Register to view the site.</h1>
    </div>
    <div id="msgbox">
      <span v-show="message.length > 0">{{ message }}</span>
    </div>
    <div class="container">
      <div class="flip-card">
        <div id="loginpanel">
          <div id="login-header">
            <h2>Login</h2>
          </div>
          <div id="login-input">
            <input
              name="email"
              v-model="email"
              type="text"
              placeholder="Email"
            />
            <input
              name="password"
              v-model="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div id="login-buttons">
            <button :disabled="!validateLogin" @click="signInUser">
              Login
            </button>
            <p>- or -</p>
            <button @click="flipContainer" id="reg">Register</button>
          </div>
        </div>
        <div id="registerpanel">
          <div id="login-header">
            <h2>Register</h2>
          </div>
          <div id="login-input">
            <input
              name="email"
              v-model="email"
              type="text"
              placeholder="Email"
            />
            <input
              name="username"
              v-model="username"
              type="text"
              placeholder="Username"
            />
            <input
              name="password"
              v-model="password"
              type="password"
              placeholder="Password"
            />
            <input
              name="location"
              v-model="location"
              type="text"
              placeholder="Location"
            />
          </div>
          <div id="login-buttons">
            <button :disabled="!validateRegistration" @click="register">
              Register
            </button>
            <p>- or -</p>
            <button @click="flipContainer">Go Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { refreshStore } from "../store-helper";
import { db } from "../main";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  Auth,
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  username = "";
  location = "";
  message = "";
  auth: Auth | null = null;

  get validateRegistration(): boolean {
    return (
      this.email.length > 0 &&
      this.password.length > 0 &&
      this.location.length > 0 &&
      this.username.length > 0
    );
  }

  get validateLogin(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }

  mounted(): void {
    this.auth = getAuth();
  }

  flipContainer() {
    const card = document.querySelector(".container");
    card?.classList.toggle("flip");
  }

  async addUser(uid: string) {
    await setDoc(doc(db, "users", uid), {
      name: this.username.toLocaleLowerCase(),
      location: this.location,
      balance: 25.0,
      id: uid,
    });
    console.log();
  }

  async userExists(): Promise<boolean> {
    let res = false;
    const users = collection(db, "users");
    await getDocs(users).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        if (qd.data().name === this.username.toLocaleLowerCase()) {
          res = true;
        }
      });
    });
    return res;
  }

  async register() {
    const exists = await this.userExists();
    if (exists) {
      this.showMessage("Username already exists");
      return;
    }
    createUserWithEmailAndPassword(this.auth!, this.email, this.password)
      .then(async (cr: UserCredential) => {
        // TODO: Email verification?
        await this.addUser(cr.user.uid);
        await signOut(this.auth!);
        this.flipContainer();
        this.resetForm();
        this.showMessage(
          "Account successfully created. Please login to continue"
        );
      })
      .catch((err) => {
        const message = err.message;
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            this.showMessage("Email/Username already in use");
            break;
          case "auth/weak-password":
            this.showMessage("Error: Password is not strong enough");
            break;
          default:
            this.showMessage(message);
        }
      });
  }

  signInUser(): void {
    signInWithEmailAndPassword(this.auth!, this.email, this.password)
      .then(async (cr: UserCredential) => {
        await refreshStore(cr.user.uid);
        this.$router.push({ name: "home" });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
            this.showMessage("Invalid email/password");
            break;
          case "auth/user-disabled":
            this.showMessage("Error: Account Disabled");
            break;
        }
      });
  }

  showMessage(txt: string) {
    this.message = txt;
    // The message will automatically disappear after 5 seconds
    setTimeout(() => {
      this.message = "";
    }, 5000);
  }

  resetForm() {
    this.email = "";
    this.password = "";
    this.location = "";
    this.username = "";
  }
}
</script>

<style>
#msgbox {
  height: 25px;
}
#msgbox span {
  padding: 5px;
  border-radius: 5px;
  border: solid 1px red;
}

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
  margin-top: 15px;
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

#loginpanel,
#registerpanel {
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
  height: 450px;
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

#login-header h2 {
  text-underline-offset: 2px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
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
  text-underline-offset: 5px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #ffa94d;
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
  border: none;
  outline: 2px solid #ccc;
}

#login-buttons button:hover {
  box-shadow: 4px 4px 4px #ffa94d;
}

#login-input input {
  height: 35px;
  width: 85%;
  font-size: 15px;
  margin: 5px;
  border-radius: 5px;
}
</style>
