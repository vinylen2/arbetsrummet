<template>
  <v-app id="app" footer>
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
    <v-toolbar fixed app color="green">
      <navbar @drawer="drawer = !drawer"></navbar>
    </v-toolbar>
    <v-content>
      <v-progress-linear class="ma-0" :color="'green lighten-2'"
        :indeterminate="true"
        v-if="$store.state.isLoading">
      </v-progress-linear>
      <router-view></router-view>
      <v-snackbar
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        v-model="snackbar.status">
        <div v-if="!snackbar.hasLink">
          {{snackbar.value}}
        </div>
        <div v-else>
          <a target="_blank"
            class="white--text"
            :href="snackbar.linkUrl">{{snackbar.value}}
          </a>
        </div>
        <v-btn dark flat @click.native="$store.commit('hideSnackbar')">Stäng</v-btn>
      </v-snackbar>
    </v-content>
    <v-footer height="auto" class="mt-4">
      <footer-content></footer-content>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Navbar from '@/components/Navbar';
import FooterContent from '@/components/FooterContent';
import Info from '@/stores/info';
import { mapGetters } from 'vuex';

import Vuetify from 'vuetify';
import('vuetify/dist/vuetify.min.css');
import('mdi/css/materialdesignicons.min.css');
Vue.use(Vuetify);

import VueGAPI from 'vue-gapi';
import gapiConfig from '@/stores/gapiConfig.js';
Vue.use(VueGAPI, gapiConfig);

export default {
  components: {
    Navbar,
    FooterContent,
  },
  name: 'app',
  data() {
    return {
      drawer: false,
      appTitle: Info.appTitle,
    };
  },
  computed: {
    ...mapGetters([
      'snackbar',
    ]),
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

.cursor {
  cursor: pointer;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.margin-top {
  margin-top: 70px;
}
</style>
