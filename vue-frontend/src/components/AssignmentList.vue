<template>
  <v-list two-line subheader>
    <v-subheader inset>{{ title }}</v-subheader>
    <v-list-tile v-for="assignment in assignments"
      :key="assignment.title"
      avatar
      @click="routerDirect">
      <v-list-tile-avatar>
        <v-icon :class="hasColor(assignment)" :color="'white'">assignment</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ assignment.title }}</v-list-tile-title>
        <v-list-tile-subtitle>{{ assignment.grades[0].grade }}</v-list-tile-subtitle>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">info</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>

</template>

<script>
export default {
  name: 'assignment-list',
  props: [
  'title',
  'assignments',
  ],
  data() {
    return {
    };
  },
  methods: {
    hasSubject(assignment) {
      return (( _.has(assignment, 'subjects') && assignment.subjects.length > 0 ) ? assignment.subjects[0] : null);
    },
    hasColor(assignment) {
      if (this.hasSubject(assignment)) {
        return assignment.subjects[0].color;
      }
      return 'grey';
    },
    routerDirect() {

    },
  },
};

</script>
