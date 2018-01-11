<template>
<b-navbar toggleable="md" type="light" variant="info">
  <b-navbar-brand href="#">Arbetsrummet</b-navbar-brand>
  <b-navbar-nav class="ml-auto">
    <b-nav-form>
      <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
    <b-nav-item>
      <login-button v-if="!$store.state.isSignedIn"></login-button>
      <profile-button v-else></profile-button>
    </b-nav-item>
  </b-navbar-nav>

</b-navbar>
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
