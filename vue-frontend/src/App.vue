<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Navbar from '@/components/Navbar';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial);

export default {
  components: {
    Navbar,
  },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
</style>
