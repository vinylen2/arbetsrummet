<template>
  <v-card>
    <v-card-title class="header white--text">
      {{ this.title }}
      <v-spacer></v-spacer>
        <v-text-field
          color="white"
          v-model="search"
          append-icon="search"
          label="Sök..."
      ></v-text-field>
      <v-icon @click="close"
        :color="'white'"
        class="cursor">clear</v-icon>
    </v-card-title>
    <course-table
      v-if="table === 'courses'">
    </course-table>
    <course-work-table
      v-if="table === 'courseworks'">
    </course-work-table>
  </v-card>
</template>

<script>
import gapiData from '@/stores/gapi';
import CourseTable from '@/components/CourseTable';
import CourseWorkTable from '@/components/CourseWorkTable';
import ShareAssignment from '@/components/ShareAssignment';
import ReuseCoursework from '@/components/ReuseCoursework';
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'course-picker',
  components: {
    CourseTable,
    CourseWorkTable,
    ShareAssignment,
    ReuseCoursework,
  },
  props: [
    'data',
    'options',
  ],
  data() {
    return {
      title: this.options.title,
      action: this.options.action,
      table: this.options.table,
      selected: [],
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};


</script>



<style scoped>
.header {
  background-color: #aed581;
}
</style>
