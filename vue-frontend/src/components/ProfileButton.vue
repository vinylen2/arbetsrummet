<template>
  <div>
    <v-avatar class="avatar-button"
      :size="'36px'">
      <img :src="$store.state.profile.picture"
        :alt="$store.state.profile.firstName"
        @click="showProfile = !showProfile">
    </v-avatar>
    <v-tooltip v-model="showProfile" bottom
      class="profile">
      <v-layout row wrap>
        <v-flex xs5>
          <v-avatar
            :size="'90px'">
            <img :src="$store.state.profile.picture"
              :alt="$store.state.profile.firstName">
          </v-avatar>
        </v-flex>
        <v-flex xs7>
          <p>{{ $store.state.profile.fullName }}</p>
          <p>{{ $store.state.profile.email }}</p>
          <v-btn class="text-xs-right"
            @click="logOut">Logga ut
          </v-btn>
        </v-flex>
      </v-layout>
    </v-tooltip>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'profile-button',
  data() {
    return {
      showProfile: false,
    };
  },
  methods: {
    logOut() {
      gapi.auth2.getAuthInstance().signOut();
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
