<template>
<v-card class="height">
  <v-layout row wrap text-xs-left class="height">
    <v-flex xs12 text-xs-center>
      <h1>Vänta</h1>
    </v-flex>
    <v-flex xs4>
      <v-progress-circular :size="70" indeterminate color="green"></v-progress-circular>
    </v-flex>
    <v-flex xs8>
      <h2>{{message}}...</h2>
    </v-flex>
    <v-flex xs12 text-xs-center>
      <v-btn @click="$emit('cancel')"
        flat>Avbryt
      </v-btn>
    </v-flex>
  </v-layout>
</v-card>
</template>

<script>
export default {
  name: 'progress-dialog',
  props: [
    'message',
  ],
};

</script>

<style scoped>
.height {
  height: 250px;
}

</style>
