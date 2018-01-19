<template>
  <div>
    <v-btn color="error"
      @click="logIn">
      Logga in
    </v-btn>
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
  methods: {
    handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        this.$store.commit('setOauthToken', authResult.access_token);
      }
    },
    onAuthApiLoad() {
      window.gapi.auth.authorize({
        client_id: gapiData.clientId,
        scope: gapiData.scopes.drive,
        immediate: false,
      },
      this.handleAuthResult);
    },
    logIn() {
      window.gapi.load('client:auth2', this.initClient);
      window.gapi.load('auth', {'callback': this.onAuthApiLoad});
      // gapi.auth2.getAuthInstance().signIn().then((result) => {
      //   this.$store.commit('setProfile', result.w3);
      // });
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
