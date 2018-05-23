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
