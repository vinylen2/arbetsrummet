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
      v-if="table === 'courses'"
      @selected="coursePicked">
    </course-table>
    <div v-if="table === 'courseworks'">
      <course-table
        v-if="!pickingCourseWorks"
        @selected="coursePicked">
      </course-table>
      <course-work-table
        v-else>
      </course-work-table>
    </div>
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
      pickingCourseWorks: false,
      selected: [],
    };
  },
  methods: {
    coursePicked(selected) {
      this.selected.push(selected);
      if (this.table === 'courseworks') {
        this.pickingCourseWorks = true;
      }
    },
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
