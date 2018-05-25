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
            <v-list-tile-title>Kontakt</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Om</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app color="light-green">
      <navbar @drawer="drawer = !drawer"></navbar>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Navbar from '@/components/Navbar';
import Info from '@/stores/info';

import Vuetify from 'vuetify';
import('vuetify/dist/vuetify.min.css');
import('mdi/css/materialdesignicons.min.css');
Vue.use(Vuetify);

import VueGAPI from 'vue-gapi';
import gapiData from '@/stores/gapi';
Vue.use(VueGAPI, gapiData.apiConfig);


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
  created() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.$store.commit('isMobile', true);
    }
  },
  methods: {
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

.margin-top {
  margin-top: 70px;
}
</style>
