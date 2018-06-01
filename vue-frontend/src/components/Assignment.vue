<template>
<v-container grid-list-md text-xs-center class="mt-3">
  <v-card class="pa-1">
    <v-layout row wrap text-xs-left class="header">
      <div class="icon-thumbnail" :class="color">
        <v-icon :color="'white'">assignment</v-icon>
      </div>
      <v-flex xs10 class="pl-3 test">
        <div class="body-2">{{author}}</div>
        <div> {{ date(assignment.createdAt) }}</div>
      </v-flex>
      <v-flex xs1 text-xs-right>
        <v-menu offset-y left>
          <v-icon class="cursor mt-3"
            v-if="editRights"
            slot="activator">more_vert
          </v-icon>
          <v-list>
            <v-list-tile @click="edit">
              <v-list-tile-title>
                Redigera
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <div class="headline">{{assignment.title}}</div>
      </v-flex>
      <v-flex xs12 class="pl-3">
        <div>{{ assignment.description }}</div>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <div class="subheading">Instruktion till eleven</div>
        <div>{{ assignment.instruction }}</div>
      </v-flex>
      <v-flex xs8 class="pl-3"
        v-if="!$store.state.isLoading">
        <v-chip class="cursor"
          :color="color"
          text-color="white">{{ assignment.subjects[0].subject }}
        </v-chip>
        <v-chip class="cursor">{{ assignment.grades[0].grade }}
        </v-chip>
      </v-flex>
      <v-flex xs4 text-xs-right>
        <v-btn v-if="$store.state.isSignedIn"
          depressed
          @click="shareToClassroomModal = true">
          <img src="/static/classroom_icon.png" width="20px">
        </v-btn>
        <v-tooltip top v-if="!$store.state.isSignedIn">
          <v-btn class="disabled"
            depressed
            slot="activator">
            <img src="/static/classroom_icon.png" width="20px">
          </v-btn>
          <span>Logga in för att dela</span>
        </v-tooltip>
        <v-dialog v-model="shareToClassroomModal"
          :lazy="true">
          <course-picker
            :data="assignment"
            :options="coursePickerOptions"
            @close="shareToClassroomModal = false">
          </course-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <material v-for="material in assignment.materials"
          :key="material.id"
          :materialData="material"
          :edit="false">
        </material>
      </v-flex>
    </v-layout>
  </v-card>

</v-container>
</template>

<script>
import Assignments from '@/api/services/assignments';
import Material from '@/components/Material';
import CoursePicker from '@/components/CoursePicker';
import assignmentHelpers from '@/assets/assignmentHelpers.js';

export default {
  name: 'assignment',
  mixins: [assignmentHelpers],
  components: {
    Material,
    CoursePicker,
  },
  data() {
    return {
      id: this.$route.params.id,
      assignment: '',
      shareToClassroomModal: false,
      coursePickerOptions: {
        title: 'Dela uppgift',
        action: 'share-assignment',
        table: 'courses',
      },
    };
  },
  created() {
    this.$store.commit('initiatedLoading');
    this.getAssignment();
  },
  computed: {
    editRights() {
      if (this.hasAuthor) {
        if (this.$store.state.profile.email === this.assignment.authors[0].email) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    getAssignment() {
      Assignments.get(this.id).then((result) => {
        this.assignment = result.data[0];
        this.$store.commit('finishedLoading');
      });
    },
    edit() {

    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

.icon-thumbnail {
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
}

.author {
  margin: 0 2px 0 4px;
  font-weight: bold;
}

.date {
  margin: 0 2px 0 4px;
}

.panel {
  margin: -4px;
  padding: -4px;
  width: 100%;
  border: none;
}

.cursor {
  cursor: pointer;
}

.cursor:hover {
  color: black;
}

.material-link {
  text-decoration: none;
  cursor: pointer;
}

.disabled {
  -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
        -o-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
          filter: grayscale(100%);
}

.cursor:hover {
  color: black;
}
</style>
