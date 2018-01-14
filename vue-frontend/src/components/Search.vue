<template>
<v-container grid-list-md text-xs-left>
  <v-layout row wrap>
    <v-flex xs6>
      <v-text-field
        light
        solo
        placeholder="Search"
        style="max-width: 500px; min-width: 128px border-radius: 25%">
      </v-text-field>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script

export default {
  name: 'search',
  data() {
    return {
    };
  },
  methods: {
  },
}
</script>

<style scoped>
</style>
