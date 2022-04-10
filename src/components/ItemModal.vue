<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop="">
      <div id="left">
        <div class="item-image">
          <img v-bind:src="item.img" />
        </div>
      </div>
      <div class="item-info">
        <div class="primary-info">
          <h1>{{ item.name }}</h1>
          <div class="location">
            <img src="../assets/money.png" />
            <h3>${{ item.price }}</h3>
          </div>
          <div class="location">
            <img src="../assets/globe.png" />
            <h3>{{ location }}</h3>
          </div>
        </div>
        <div class="price"></div>
        <div class="tags">
          <h2>Description</h2>
          <p>{{ item.description }}</p>
          <h2>Tags</h2>
          <ul v-for="(tag, n) in item.tags" :key="n">
            <li>{{ tag }}</li>
          </ul>
        </div>
      </div>
      <div class="buy-btn">
        <button @click="$emit('close-modal')">Buy Now!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "location"],
};
</script>

<style scoped>
div {
  float: left;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  width: 1000px;
  height: 575px;
  background-color: white;
  border-radius: 10px;
  margin-top: 10%;
  color: #555555;
}

#left {
  width: 600px;
  height: 650px;
}

.primary-info {
  width: 400px;
  height: 125px;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom: 2px solid grey;
}

.primary-info h1 {
  text-align: left;
  padding-left: 15px;
  padding-top: 5px;
  font-size: 325%;
}

.primary-info h2 {
  text-align: left;
  padding-bottom: 5px;
}

.location h3 {
  text-align: left;
}

.location {
  width: 400px;
  height: 25px;
  display: float;
}

.location img {
  width: 20px;
  height: 20px;
  float: left;
  padding-left: 15px;
  padding-right: 5px;
}

.item-image {
  width: 600px;
  height: 575px;
  background-color: #86c6f4;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.item-info {
  width: 400px;
  height: 500px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.item-info h2 {
  margin-left: 15px;
  text-align: left;
}

.item-info p {
  margin-left: 15px;
  margin-top: 10px;
  text-align: left;
}

.item-image img {
  width: 580px;
  height: 555px;
  margin-top: 10px;
}

ul {
  margin-left: 50px;
}

li {
  text-align: left;
  font-size: 18px;
}

.tags {
  padding-top: 25px;
}

p {
  font-size: 18px;
  margin: 20px 0;
}

.buy-btn {
  width: 400px;
}

button {
  background-color: #5bbffc;
  border-radius: 5px;
  width: 300px;
  height: 65px;
  font-size: 200%;
}

button:hover {
  background-color: #fff1ce;
  outline: 2px solid #88c6cf;
}
</style>
