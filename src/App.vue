<template>
  <div id="app">
    <transition name="shrink-explode">
      <router-view />
    </transition>
  </div>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
  text-align: center;
}

body {
  background-color: #86c6f4;
}
</style>
