<template>
  <div>
    <img :src="$store.state.profile.picture"
      class="profile-picture"/>
  </div>
</template>

<script>
export default {
  name: 'profile-button',
  data() {
    return {
    };
  },
  methods: {
    logOut() {
      gapi.auth2.getAuthInstance().signIn().then((result) => {
        this.$store.commit('setProfile', result.w3);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-picture {
  height: 32px;
  border-radius: 50%;
}

</style>
