<template>
<v-card class="height">
  <v-layout row wrap align-center text-xs-left class="height">
    <v-flex xs12 text-xs-center>
        <h1 class="headline pa-1">Ett ögonblick...</h1>
    </v-flex>
    <v-flex xs1></v-flex>
    <v-flex xs4 class="pl-2">
      <v-progress-circular :size="70" indeterminate color="green"></v-progress-circular>
    </v-flex>
    <v-flex xs7 class="pl-2">
      <h2 class="subheading align">{{ message }}</h2>
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

.align {
  line-height: 100%;
}

</style>
