<template>
  <div>
    <md-avatar>
      <img :src="$store.state.profile.picture"
        v-tippy="tippyOptions"/>
    </md-avatar>
    <div id="profile-menu2"
      v-tippy-html>
      <div class="md-layout">
        <div class="md-layout-item md-size-45">
          <img :src="$store.state.profile.picture"
            class="profile-picture-large"/>
        </div>
        <div class="md-layout-item md-size-55">
          <p>{{ $store.state.profile.fullName }}</p>
          <p>{{ $store.state.profile.email }}</p>
          <md-button class="logout-button"
            @click="logOut">Logga ut</md-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueTippy from 'vue-tippy';

Vue.use(VueTippy);

export default {
  name: 'profile-button',
  data() {
    return {
      tippyOptions: {
        html: '#profile-menu2',
        interactive: 'true',
        reactive: 'true',
        placement: 'bottom-end',
        trigger: 'click',
        theme: 'light',
      },
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
p {
  text-align: left;
  margin: 2px 0;
}

.logout-button {
  margin-right: 30px;
  margin-top: 20px;
}

.button-frame {
  background-color: #f5f5f5
}

.profile-picture {
  height: 32px;
  border-radius: 50%;
}

.profile-picture-large {
  height: 96px;
  width: 100px;
  border-radius: 50%;
}

</style>
<style>

.tippy-content {
  width: 318px;
  height: 150px;
  padding-top: 20px;
}

.light-theme {
  border-radius: 0;
  border: 1px solid #ccc;
  padding: 0;
}
</style>
