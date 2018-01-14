<template>
<v-container grid-list-md text-xs-left>
  <v-layout row wrap>
      {{ id }}
  </v-layout>
</v-container>
</template>

<script>
import Assignments from '@/api/services/Assignments';
export default {
  name: 'assignment',
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  created() {
    this.getAssignment();
  },
  methods: {
    getAssignment() {
      Assignments.get(this.id).then((result) => {
        console.log(result);
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
