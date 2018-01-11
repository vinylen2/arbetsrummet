<template>
  <div class="frontpage">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-content>
        <add-assignment
          @closeAddAssignmentDialog="showDialog = false">
        </add-assignment>
      </md-dialog-content>
    </md-dialog>
    <div class="button"
      v-if="$store.state.isSignedIn">
      <md-button class="md-fab md-primary"
        @click="showDialog = true">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <md-button class="attach-button"
      @click="showDrivePickerDialog = true">
      <md-icon>folder_shared</md-icon>
    </md-button>
    <md-dialog class="drive-picker"
      :md-active.sync="showDrivePickerDialog">
      <md-dialog-content>
        <picker :ViewId="'DOCS'"></picker>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import AddAssignment from '@/components/AddAssignment';
import { mapGetters } from 'vuex';

import Picker from '@/components/Picker';

export default {
  name: 'frontpage',
  components: {
    AddAssignment,
    Picker,
  },
  data() {
    return {
      subject: '',
      showDialog: false,
      showDrivePickerDialog: false,
      assignments: [
        {
          id: 0,
          title: "Uppgift",
          description: "Här är beskrivningen för en uppgift",
          courseWorkType: "ASSIGNMENT",
          createdAt: "2017-12-19",
          authors: [],
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

.md-dialog-content {
  padding: 0;
}

.md-dialog {
  width: 700px;
}

</style>

<style>
.md-select-menu {
  z-index: 100;
  background-color: white;
}

html * {
  /* box-sizing: initial; */
}
</style>
