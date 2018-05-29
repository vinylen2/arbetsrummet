<template>
  <div>
    <v-menu v-model="menu"
      :close-on-content-click="false"
      :nudge-left="5"
      left
      offset-x>
      <div slot="activator">
        <v-avatar class="avatar-button"
          :size="'36px'">
          <img :src="$store.state.profile.picture"
            :alt="$store.state.profile.firstName">
        </v-avatar>
      </div>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-avatar
                :size="'56px'">
                <img :src="$store.state.profile.picture"
                  :alt="$store.state.profile.firstName">
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ $store.state.profile.fullName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ $store.state.profile.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-btn
                @click="logOut">Logga ut
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'profile-button',
  data() {
    return {
      showProfile: false,
      menu: false,
    };
  },
  methods: {
    logOut() {
      gapi.auth2.getAuthInstance().signOut().then(() => {
        this.$store.commit('toggleLogin', false);
      });
    },
  }
}
</script>

<style scoped>
.avatar-button {
  cursor: pointer;
}
.profile {
  width: 200px;
}
</style>
