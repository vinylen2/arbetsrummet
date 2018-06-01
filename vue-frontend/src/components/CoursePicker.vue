<template>
  <v-card>
    <v-toolbar color="green lighten-2 hidden-xs-only py-3">
      <v-icon v-if="pickingCourseWorks"
        @click="pickingCourseWorks = false"
        :color="'white'"
        class="cursor pr-3">arrow_back
      </v-icon>
      <v-toolbar-title class="white--text">{{this.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        color="white"
        v-model="search"
        append-icon="search"
        label="Sök...">
      </v-text-field>
      <v-icon @click="close"
        :color="'white'"
        class="cursor pl-4">clear
      </v-icon>
    </v-toolbar>
    <v-toolbar color="green lighten-2 hidden-sm-and-up">
      <v-icon v-if="pickingCourseWorks"
        @click="pickingCourseWorks = false"
        :color="'white'"
        class="cursor pr-3">arrow_back
      </v-icon>
      <v-toolbar-title class="white--text">{{this.title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        slot="extension"
        color="white"
        v-model="search"
        append-icon="search"
        label="Sök...">
      </v-text-field>
      <v-icon @click="close"
        :color="'white'"
        class="cursor pl-4">clear
      </v-icon>
    </v-toolbar>
    <course-table
      v-if="table === 'courses'"
      :assignment="assignment"
      :action="'share-assignment'"
      :search="search"
      @close="close"
      @selected="coursePicked">
    </course-table>
    <div v-if="table === 'courseworks'">
      <course-table
        :action="action"
        @close="close"
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
import CourseTable from '@/components/CourseTable';
import CourseWorkTable from '@/components/CourseWorkTable';
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'course-picker',
  components: {
    CourseTable,
    CourseWorkTable,
  },
  props: [
    'assignment',
    'options',
  ],
  data() {
    return {
      search: '',
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
.cursor {
  cursor: pointer;
}

.cursor:hover {
  color: lightgrey;
}
</style>
