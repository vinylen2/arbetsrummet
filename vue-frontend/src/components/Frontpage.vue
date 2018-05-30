<template>
<div>
  <div class="frontpage" v-if="!$store.state.isLoading">
    <v-slide-y-transition>
      <div class="light-green lighten-2 search-bar"
        v-show="$store.state.showSearch">
          <search @addResult="addSearchResults"
            :chipPressValue="chipPressValue"></search>
      </div>
    </v-slide-y-transition>
    <v-layout row wrap v-if="!$store.state.showSearch" transition="fade-transition">
      <v-flex xs12 sm6>
        <assignment-list :title="'Populära uppgifter'"
          @chipPressed="chipPressed"
          :assignments="assignments">
        </assignment-list>
      </v-flex>
      <v-flex hidden-xs-only sm6>
        <assignment-list :title="'Nyligen publicerade'"
          @chipPressed="chipPressed"
          :assignments="recentAssignments">
        </assignment-list>
      </v-flex>
    </v-layout>
    <v-container grid-list-md text-xs-center class="mt-3">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="assignment in assignments" :key="assignment.id">
          <assignment-card :data="assignment"
            @chipPressed="chipPressed"></assignment-card>
        </v-flex>
        <v-flex xs12 v-if="assignments.length === 0">
          <h2>Inga uppgifter...</h2>
        </v-flex>
      </v-layout>
    </v-container>
    <div>
  <v-fab-transition>
    <v-speed-dial
      class="hidden-xs-only"
      v-if="$store.state.isSignedIn"
      v-model="fab"
      :direction="'top'"
      bottom
      right
      fixed
      :transition="'slide-y-reverse-transition'">
      <v-btn color="primary"
        v-if="!$store.state.isMobile"
        fab
        slot="activator"
        v-model="fab">
        <v-icon dark>add</v-icon>
        <v-icon dark>close</v-icon>
      </v-btn>
      <v-btn color="primary"
        dark
        fab
        small
        @click.stop="addAssignmentDialog = true">
        <v-icon dark>assignment</v-icon>
      </v-btn>
      <v-btn color="primary"
        dark
        fab
        small
        @click.stop="reuseCourseworkDialog = true">
        <v-icon dark>autorenew</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-fab-transition>
      <v-btn class="grey"
        v-if="$store.state.isMobile"
        slot="activator"
        @click="$store.commit('showSnackbar', {
          status: true,
          value: 'Tyvärr går det inte att publicera uppgifter från mobilen än.',
          color: 'info',
          hasLink: false,
          timeout: 5000,
        });"
        on-hover
        bottom
        right
        fixed
        fab>
        <v-icon>add</v-icon>
      </v-btn>
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
</div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import AssignmentList from '@/components/AssignmentList';
import AddAssignment from '@/components/AddAssignment';
import CoursePicker from '@/components/CoursePicker';
import Search from '@/components/Search';
import AssignmentCard from '@/components/AssignmentCard';

import Grades from '@/api/services/grades';
import Subjects from '@/api/services/subjects';


export default {
  name: 'frontpage',
  components: {
    AssignmentCard,
    AssignmentList,
    CoursePicker,
    AddAssignment,
    Search,
  },
  data() {
    return {
      assignments: [],
      recentAssignments: [],
      fab: false,
      subject: '',
      addAssignmentDialog: false,
      reuseCourseworkDialog: false,
      chipPressValue: '',
      coursePickerOptions: {
        title: 'Välj kurs',
        action: 'reuse-coursework',
        table: 'courseworks',
      },
    };
  },
  created() {
    this.getAllAssignments();
    this.getRecentAssignments();
    this.getGrades();
    this.getSubjects();
  },
  methods: {
    chipPressed(data) {
      this.chipPressValue = data;
    },
    addSearchResults(data) {
      this.assignments = data;
      this.$store.commit('finishedLoading');
    },
    assignmentPosted(data) {
      this.assignments.push(data);
      this.addAssignmentDialog = false;
    },
    getRecentAssignments() {
      Assignments.getRecent().then((result) => {
        this.recentAssignments = result.data;
      });
    },
    getAllAssignments() {
      Assignments.getAll().then((result) => {
        this.assignments = result.data;
        this.$store.commit('finishedLoading');
      });
    },
    getGrades() {
      Grades.getAll().then((result) => {
        this.$store.commit('addGrades', result.data);
      });
    },
    getSubjects() {
      Subjects.getAll().then((result) => {
        this.$store.commit('addSubjects', result.data);
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

#create .speed-dial {
  position: absolute;
}

#create .btn--floating {
  position: relative;
}
</style>
