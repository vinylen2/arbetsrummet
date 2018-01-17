<template>
<div>
    <v-progress-linear class="ma-0" :color="'light-green lighten-2'"
      :indeterminate="true"
      v-if="$store.state.isLoading">
    </v-progress-linear>
    <div class="frontpage"
      v-else>
      <v-slide-y-transition>
        <div class="light-green lighten-2 search-bar"
          v-show="$store.state.showSearch">
            <search></search>
        </div>
      </v-slide-y-transition>
      <v-container grid-list-md text-xs-center class="wrapper">
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="assignment in assignments" :key="assignment.id">
            <assignment-card :data="assignment"></assignment-card>
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
            @close="addAssignmentDialog = false">
          </add-assignment>
      </v-dialog>
    </div>
</div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import AddAssignment from '@/components/AddAssignment';
import Search from '@/components/Search';
import AssignmentCard from '@/components/AssignmentCard';
import { mapGetters } from 'vuex';


export default {
  name: 'frontpage',
  components: {
    AssignmentCard,
    AddAssignment,
    Search,
  },
  data() {
    return {
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
        this.$store.commit('loading');
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

.content {
  min-height: 800px;
  color: grey;
}

.wrapper {
  margin-top: 20px;
}
.button-bar {
  width: 100%;
}
</style>
