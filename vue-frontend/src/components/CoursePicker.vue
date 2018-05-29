<template>
  <v-card>
    <v-card-title class="header white--text px-4">
      <v-icon v-if="pickingCourseWorks"
        @click="pickingCourseWorks = false"
        :color="'white'"
        class="cursor pr-3">arrow_back
      </v-icon>
      <h2> {{ this.title }} </h2>
      <v-spacer></v-spacer>
        <v-text-field
          color="white"
          v-model="search"
          append-icon="search"
          label="Sök..."
      ></v-text-field>
      <v-icon @click="close"
        :color="'white'"
        class="cursor pl-4">clear</v-icon>
    </v-card-title>
    <course-table
      v-if="table === 'courses'"
      :data="data"
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
    'data',
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
.header {
  background-color: #aed581;
  padding: 0;
}

.cursor {
  cursor: pointer;
}

.cursor:hover {
  color: lightgrey;
}
</style>
