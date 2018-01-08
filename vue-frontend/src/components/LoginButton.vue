<template>
  <div>
    <md-button class="md-raised"
      @click="logIn">
      Logga in
    </md-button>
  </div>
</template>

<script>
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
        clientId: '60973883963-b9ofcjs3n6s8qf22d52fd7k67ecc0bap.apps.googleusercontent.com',
        apiKey: 'AIzaSyBa1UqnbaH8vmoDEaxprYTt0njc0S2C7aM',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'],
        scope: 'https://www.googleapis.com/auth/classroom.courses.readonly',
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
