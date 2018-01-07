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
  methods: {
    logIn() {

    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
