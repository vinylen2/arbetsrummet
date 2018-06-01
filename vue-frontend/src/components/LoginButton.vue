<template>
  <div>
    <v-btn color="error hidden-xs-only"
      @click="logIn">
      Logga in
    </v-btn>
    <v-btn icon color="error hidden-sm-and-up" ripple
      @click="logIn">
      <v-icon>mdi-google</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'login-button',
  methods: {
    logIn() {
      this.$getGapiClient().then(gapi => {
        gapi.auth2.getAuthInstance().signIn().then((result) => {
          this.$store.commit('setProfile', result.w3);
          this.$store.commit('setOauthToken', result.Zi.access_token);
          this.$store.commit('toggleLogin', true);
        });
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
