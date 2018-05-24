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
          <search @addResult="addSearchResults"></search>
      </div>
    </v-slide-y-transition>
    <v-container grid-list-md text-xs-center class="wrapper">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="assignment in assignments" :key="assignment.id">
          <assignment-card :data="assignment"></assignment-card>
        </v-flex>
        <v-flex xs12 v-if="assignments.length === 0">
          <h2>Inga uppgifter...</h2>
        </v-flex>
      </v-layout>
    </v-container>
    <div>
  <v-fab-transition>
    <v-speed-dial
      :open-on-hover="true"
      v-if="$store.state.isSignedIn"
      v-model="fab"
      :direction="'top'"
      bottom
      right
      fixed
      :transition="'slide-y-reverse-transition'">
      <v-btn color="primary"
        fab
        slot="activator"
        v-model="fab">
        <v-icon dark>add</v-icon>
        <v-icon dark>close</v-icon>
      </v-btn>
      <v-btn color="primary"
        dark
        fab
        @click.stop="addAssignmentDialog = true">
        <v-icon dark>assignment</v-icon>
      </v-btn>
      <v-btn color="primary"
        dark
        fab
        @click.stop="reuseCourseworkDialog = true">
        <v-icon dark>autorenew</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-fab-transition>
      <v-btn
        flat
        icon
        bottom
        left
        fixed
        @click="$store.commit('showSnackbar', {
          status: true,
          value: 'Den här hjälpknappen är inte aktiv.',
          color: 'error',
          timeout: 5000,
        });">
        <v-icon dark>help</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="addAssignmentDialog"
      :lazy="true"
      max-width="600px"
      height="auto"
      persistent>
        <add-assignment
          @assignmentPosted="assignmentPosted"
          @close="addAssignmentDialog = false">
        </add-assignment>
    </v-dialog>
    <v-dialog v-model="reuseCourseworkDialog"
      :lazy="true"
      height="auto"
      persistent>
        <course-picker
          @assignmentPosted="assignmentPosted"
          :options="coursePickerOptions"
          @close="reuseCourseworkDialog = false">
        </course-picker>
    </v-dialog>
  </div>
  <v-snackbar
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    v-model="snackbar.status">{{ snackbar.value }}
    <v-btn dark flat @click.native="$store.commit('hideSnackbar')">Stäng</v-btn>
  </v-snackbar>
</div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import AddAssignment from '@/components/AddAssignment';
import CoursePicker from '@/components/CoursePicker';
import Search from '@/components/Search';
import AssignmentCard from '@/components/AssignmentCard';
import { mapGetters } from 'vuex';


export default {
  name: 'frontpage',
  components: {
    AssignmentCard,
    CoursePicker,
    AddAssignment,
    Search,
  },
  data() {
    return {
      fab: false,
      assignments: [],
      subject: '',
      addAssignmentDialog: false,
      reuseCourseworkDialog: false,
      coursePickerOptions: {
        title: 'Hämta uppgift från kurs',
        action: 'reuse-coursework',
        table: 'courseworks',
      },
    };
  },
  created() {
    this.getAllAssignments();
  },
  computed: {
    ...mapGetters([
      'isSignedIn',
      'snackbar',
    ]),
  },
  methods: {
    addSearchResults(data) {
      this.assignments = data;
      this.$store.commit('finishedLoading');
    },
    assignmentPosted(data) {
      this.assignments.push(data);
      this.addAssignmentDialog = false;
    },
    getAllAssignments() {
      Assignments.getAll().then((result) => {
        this.assignments = result.data;
        this.$store.commit('finishedLoading');
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

#create .speed-dial {
  position: absolute;
}

#create .btn--floating {
  position: relative;
}
</style>
