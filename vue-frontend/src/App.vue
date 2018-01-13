<template>
  <div id="app">
    <v-app>
      <navbar></navbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue';
import Navbar from '@/components/Navbar';

import Vuetify from 'vuetify';
import('vuetify/dist/vuetify.min.css')
Vue.use(Vuetify);

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
