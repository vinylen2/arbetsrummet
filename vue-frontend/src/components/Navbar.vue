<template>
<v-toolbar flat dark color="light-green">
  <v-toolbar-side-icon @click="drawer"></v-toolbar-side-icon>
  <v-toolbar-title class="white--text hover"
    @click="$router.push('/')">{{ appTitle }}
  </v-toolbar-title>
  <v-btn icon v-if="isFrontpage" class="ml-4"
    @click="$store.commit('toggleSearch')">
    <v-icon>search</v-icon>
    <v-icon v-if="!$store.state.showSearch">keyboard_arrow_down</v-icon>
    <v-icon v-if="$store.state.showSearch">keyboard_arrow_up</v-icon>
  </v-btn>
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
  computed: {
    isFrontpage() {
      if (this.$route.name === 'frontpage') {
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      appTitle: Info.appTitle,
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
.hover {
  cursor: pointer;
}
</style>
