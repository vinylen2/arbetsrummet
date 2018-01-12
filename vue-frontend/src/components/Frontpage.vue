<template>
  <div class="frontpage">
    <modal name="add-assignment"
      :clickToClose="false">
        <add-assignment
          @closeAddAssignmentModal="$modal.hide('add-assignment')">
        </add-assignment>
    </modal>
    <div class="button"
      v-if="$store.state.isSignedIn">
      <b-button
        @click="$modal.show('add-assignment')">+
      </b-button>
    </div>
  </div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import AddAssignment from '@/components/AddAssignment';
import { mapGetters } from 'vuex';


export default {
  name: 'frontpage',
  components: {
    AddAssignment,
  },
  data() {
    return {
      subject: '',
      showModal: false,
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

.md-Modal-content {
  padding: 0;
}

.md-Modal {
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
