<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Startsida</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Kontakta {{appTitle}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <navbar @drawer="drawer = !drawer"></navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Navbar from '@/components/Navbar';
import Info from '@/stores/info';

import Vuetify from 'vuetify';
import('vuetify/dist/vuetify.min.css')
Vue.use(Vuetify);

export default {
  components: {
    Navbar,
  },
  name: 'app',
  data() {
    return {
      drawer: false,
      appTitle: Info.appTitle,
    };
  },
  methods: {
    hideSearch() {
      console.log('hej');
    },
  },
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
