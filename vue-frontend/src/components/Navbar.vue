<template>
  <div class="navbar">
    <md-toolbar class="md-accent" color="#4b4b4b">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
          <h3 class="md-title">Arbetsrummet</h3>
        </div>
        <div class="md-toolbar-section-end">
          <md-button class="md-raised"
            @click="logIn">
            Logga in
          </md-button>
        </div>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
    };
  },
  // created() {
  //   let apiScript = document.createElement('script');
  //   apiScript.setAttribute('src', 'https://apis.google.com/js/api.js');
  //   document.head.appendChild(apiScript);
  // },
  mounted() {
    window.gapi.load('client:auth2');
  },
  methods: {
    logIn() {
      this.initClient();
    },
    initClient() {
      gapi.client.init({
        clientId: '60973883963-b9ofcjs3n6s8qf22d52fd7k67ecc0bap.apps.googleusercontent.com',
        apiKey: 'AIzaSyBa1UqnbaH8vmoDEaxprYTt0njc0S2C7aM',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'],
        scope: 'https://www.googleapis.com/auth/classroom.courses.readonly',
      }).then(() => {
          gapi.auth2.getAuthInstance().signIn();
        });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
