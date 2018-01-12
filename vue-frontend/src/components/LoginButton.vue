<template>
  <div>
    <b-button class="md-raised"
      @click="logIn">
      Logga in
    </b-button>
  </div>
</template>

<script>
import gapiData from '@/stores/gapi';

export default {
  name: 'login-button',
  data() {
    return {
    };
  },
  mounted() {
    window.gapi.load('client:auth2', this.initClient);
  },
  methods: {
    logIn() {
      gapi.auth2.getAuthInstance().signIn().then((result) => {
        this.$store.commit('setProfile', result.w3);
      });
    },
    updateSigninStatus(state) {
      this.$store.commit('toggleLogin', state);
      if (state) {
        gapi.auth2.getAuthInstance().then((result) => {
          this.$store.commit('setProfile', result.currentUser.Ab.w3);
        });
      }
    },
    initClient() {
      gapi.client.init({
        clientId: gapiData.clientId,
        apiKey: gapiData.apiKey,
        discoveryDocs: gapiData.classroom,
        scope: gapiData.scopes.classroom,
      }).then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
