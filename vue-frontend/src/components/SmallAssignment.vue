<template>
  <v-list-tile
    avatar
    @click="routerDirect()">
    <v-list-tile-avatar>
      <v-icon :class="hasColor" :color="'white'">assignment</v-icon>
    </v-list-tile-avatar>
    <v-list-tile slot="activator">
    </v-list-tile>
    <v-list-tile-content
      @click="routerDirect(assignment.id)">
      <v-list-tile-title>{{ assignment.title }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ date(assignment.createdAt) }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn round color="grey lighten-2" icon ripple
        v-if="hasGrade"
        @click="chipPressed('grade', assignment.grades[0])">
        {{ assignment.grades[0].grade }}
      </v-btn>
      <v-btn round color="grey lighten-2" icon ripple disabled
        v-else>
        -
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action>
      <v-btn round icon ripple>
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import assignmentHelpers from '@/assets/assignmentHelpers.js';

export default {
  name: 'small-assignment',
  mixins: [assignmentHelpers],
  props: ['assignment'],
  methods: {
    routerDirect() {
      this.$router.push(`/assignment/${this.assignment.id}`);
    },
    chipPressed(type, data) {
      this.$emit('chipPressed', {
        data: data,
        type: type,
      });
    },
  },
};
</script>
