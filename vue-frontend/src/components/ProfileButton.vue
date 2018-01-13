<template>
  <div>
    <!-- <b-img rounded="circle"
      v-tippy="tippyOptions"
      width="42"
      :src="$store.state.profile.picture"></b-img>
    <div id="profile-menu2"
      v-tippy-html>
      <b-container>
          <b-row>
            <b-col>
              <b-img rounded="circle"
                width="60"
                :src="$store.state.profile.picture"></b-img>
            </b-col>
            <b-col>
              <p>{{ $store.state.profile.fullName }}</p>
              <p>{{ $store.state.profile.email }}</p>
              <b-button @click="logOut">Logga ut</b-button>
            </b-col>
          </b-row>
      </b-container>
    </div> -->
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
