<template>
  <div class="frontpage">
    <div v-for="assignment in assignments">
      <span>{{assignment.title}}</span>
    </div>

  </div>
</template>

<script>
import Assignments from '@/api/services/assignments';

export default {
  name: 'frontpage',
  data() {
    return {
      assignments: [],
    };
  },
  created() {
    this.getAllAssignments();
  },
  methods: {
    getAllAssignments() {
      Assignments.getAll().then((result) => {
        this.assignments = result.data;
      });
    },
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
