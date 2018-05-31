<template>
  <v-list two-line subheader>
    <v-subheader inset>{{ title }}</v-subheader>
    <v-divider inset></v-divider>
    <small-assignment v-for="(assignment, index) in shortAssignments"
      :assignment="assignment"
      :key="index">
    </small-assignment>
  </v-list>
</template>

<script>
import SmallAssignment from '@/components/SmallAssignment';
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'assignment-list',
  components: {
    SmallAssignment,
  },
  props: [
    'title',
    'assignments',
  ],
  computed: {
    shortAssignments() {
      return this.assignments.slice(0, 4);
    },
  },
};

</script>
