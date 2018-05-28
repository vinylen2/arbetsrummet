<template>
  <v-list two-line subheader>
    <v-subheader inset>{{ title }}</v-subheader>
    <v-list-tile v-for="assignment in assignments"
      :key="assignment.title"
      avatar
      :to="{ name: 'assignment', params: { id: assignment.id }}">
      <v-list-tile-avatar>
        <v-icon :class="hasColor(assignment)" :color="'white'">assignment</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ assignment.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ date(assignment.createdAt) }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn round color="grey lighten-2" icon ripple
          @click="chipPressed('grade', assignment.grades[0])">
          {{ assignment.grades[0].grade }}
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>

</template>

<script>
import moment from 'moment';
moment.locale('sv');

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
    chipPressed(type, data) {
      this.$emit('chipPressed', {
        data: data,
        type: type,
      });
    },
    date(dateObject) {
      return moment(dateObject.createdAt).format('D MMM YYYY');
    },
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
