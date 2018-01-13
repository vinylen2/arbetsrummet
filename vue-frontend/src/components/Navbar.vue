<template>
<v-toolbar dark color="primary">
  <v-toolbar-side-icon></v-toolbar-side-icon>
  <v-toolbar-title class="white--text">Arbetsrummet</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-btn icon>
    <v-icon>search</v-icon>
  </v-btn>
  <v-btn icon>
    <v-icon>apps</v-icon>
  </v-btn>
  <v-btn icon>
    <v-icon>refresh</v-icon>
  </v-btn>
  <v-btn icon>
    <v-icon>more_vert</v-icon>
  </v-btn>
  <login-button v-if="!$store.state.isSignedIn"></login-button>
  <profile-button v-else></profile-button>
</v-toolbar>
</template>

<script>
import LoginButton from '@/components/LoginButton';
import ProfileButton from '@/components/ProfileButton';

export default {
  name: 'navbar',
  components: {
    LoginButton,
    ProfileButton,
  },
  data() {
    return {
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
