<template>
<v-toolbar dark color="primary">
  <v-toolbar-side-icon @click="drawer"></v-toolbar-side-icon>
  <v-toolbar-title class="white--text">{{ appTitle }}</v-toolbar-title>
  <div v-if="showSearch">
    <v-toolbar-title slot="extension">
      <search></search>
    </v-toolbar-title>
  </div>
  <v-spacer></v-spacer>
  <v-btn icon>
    <v-icon>refresh</v-icon>
  </v-btn>
  <login-button v-if="!$store.state.isSignedIn"></login-button>
  <profile-button v-else></profile-button>
</v-toolbar>
</template>

<script>
import LoginButton from '@/components/LoginButton';
import ProfileButton from '@/components/ProfileButton';
import Info from '@/stores/info';

export default {
  name: 'navbar',
  components: {
    LoginButton,
    ProfileButton,
  },
  data() {
    return {
      appTitle: Info.appTitle,
      showSearch: false,
    };
  },
  methods: {
    drawer() {
      this.$emit('drawer');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
