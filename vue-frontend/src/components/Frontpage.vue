<template>
  <div class="frontpage">
    <search></search>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs4 class="assignment"
          v-for="assignment in assignments">
          <assignment :data="assignment"></assignment>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="button"
      v-if="$store.state.isSignedIn">
      <v-btn color="primary" dark fab raised
        bottom
        right
        fixed
        @click.stop="addAssignmentDialog = true">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="addAssignmentDialog"
      max-width="600px"
      height="auto"
      persistent>
        <add-assignment
          @closeAddAssignmentModal="addAssignmentDialog = false">
        </add-assignment>
    </v-dialog>
  </div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import AddAssignment from '@/components/AddAssignment';
import Search from '@/components/Search';
import Assignment from '@/components/Assignment';
import { mapGetters } from 'vuex';


export default {
  name: 'frontpage',
  components: {
    Assignment,
    AddAssignment,
    Search,
  },
  data() {
    return {
      showSearch: false,
      subject: '',
      addAssignmentDialog: false,
      assignments: [
        {
          id: 0,
          title: "Uppgift",
          description: "Här är beskrivningen för en uppgift",
          courseWorkType: "ASSIGNMENT",
          createdAt: "2017-12-19",
          authors: [{
              id: 0,
              firstname: "John",
              lastname: "Doe",
              fullName: "John Doe",
              email: "john.doe@domain.com",
              createdAt: "2017-12-19T07:25:11Z",
              updatedAt: "2017-12-19T07:25:11Z"
          }],
          materials: [],
          subjects: [],
        },
      ],
    };
  },
  created() {
    this.getAllAssignments();
  },
  computed: {
    ...mapGetters([
      'isSignedIn',
    ]),
  },
  watch: {
    isSignedIn() {
      if(this.isSignedIn) {
        gapi.client.classroom.courses.list()
          .then((result) => {
            this.$store.commit('addCourses', result.body);
          });
      }
    },
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
</style>
