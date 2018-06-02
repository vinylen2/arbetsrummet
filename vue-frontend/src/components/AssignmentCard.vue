<template>
<v-card class="pa-1">
  <v-layout row wrap text-xs-left class="header">
    <v-flex xs2 text-xs-center class="icon-thumbnail" :class="color">
      <v-icon :color="'white'">assignment</v-icon>
    </v-flex>
    <v-flex xs8>
      <p class="author">{{ author }}</p>
      <p class="date"> {{ date(assignment.createdAt) }}</p>
    </v-flex>
    <v-flex xs12 class="pa-3 content">
      <p class="subheading bold mb-0"> {{assignment.title}}</p>
      <p>{{ assignment.description }}</p>
    </v-flex>
    <v-flex xs12>
      <v-chip class="cursor"
        v-if="hasSubject"
        :color="color"
        text-color="white"
        @click="chipPressed('subject', assignment.subjects[0])">{{ assignment.subjects[0].subject }}
      </v-chip>
      <v-chip class="cursor"
        v-if="hasGrade"
        @click="chipPressed('grade', assignment.grades[0])">{{ assignment.grades[0].grade }}
      </v-chip>
      <div class="noChips"
        v-else>
      </div>
    </v-flex>
    <v-flex xs12>
      <v-btn
        light
        depressed
        :to="{ name: 'assignment', params: { id: assignment.id }}">Läs mer
      </v-btn>
      <v-btn v-if="$store.state.isSignedIn"
        depressed
        @click="toggleSharingModal">
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
      <v-icon class="show-button"
        v-if="anyMaterials && !showAttachments"
        @click="showAttachments = !showAttachments">attachment keyboard_arrow_down </v-icon>
      <v-icon class="show-button"
        v-if="anyMaterials && showAttachments"
        @click="showAttachments =!showAttachments">attachment keyboard_arrow_up </v-icon>
      <v-dialog v-model="shareToClassroomModal"
        :lazy="true">
        <course-picker
          :assignment="assignment"
          :options="coursePickerOptions"
          @close="shareToClassroomModal = false">
        </course-picker>
      </v-dialog>
      <v-dialog v-model="shareToClassroomModalMobile"
        hide-overlay
        fullscreen
        transition="dialog-bottom-transition"
        scrollable
        :lazy="true">
        <course-picker
          :assignment="assignment"
          :options="coursePickerOptions"
          @close="shareToClassroomModalMobile = false">
        </course-picker>
      </v-dialog>
      </div>
      <v-slide-y-transition>
        <v-flex xs12 class="pa-3" v-if="showAttachments && anyMaterials">
          <div v-if="assignment.materials.length > 0"
            v-for="material in assignment.materials">
            <a class="material-link"
              :href="material.alternateLink"
              target="_blank">
              <v-icon v-if="material.unionField === 'driveFile'">description</v-icon>
              <v-icon v-if="material.unionField === 'link'">link</v-icon>
              <v-icon v-if="material.unionField === 'form'">list</v-icon>
              <v-icon v-if="material.unionField === 'youtubeVideo'">mdi-youtube-play</v-icon>
              {{material.title}}
            </a>
          </div>
        </v-flex>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</v-card>
</template>

<script>
import Assignments from "@/api/services/assignments";
import CoursePicker from '@/components/CoursePicker';
import assignmentHelpers from '@/assets/assignmentHelpers.js';

export default {
  name: "assignment-card",
  props: ['assignment'],
  mixins: [assignmentHelpers],
  components: {
    CoursePicker,
  },
  data() {
    return {
      shareToClassroomModal: false,
      shareToClassroomModalMobile: false,
      showAttachments: false,
      coursePickerOptions: {
        title: 'Dela uppgift',
        action: 'share-assignment',
        table: 'courses',
      },
    };
  },
  methods: {
    toggleSharingModal() {
      if (this.$store.state.isMobile) {
        this.shareToClassroomModalMobile = true;
      } else {
        this.shareToClassroomModal = true;
      }
    },
    chipPressed(type, data) {
      this.$emit('chipPressed', {
        data: data,
        type: type,
      });
    },
  },
  computed: {
    anyMaterials() {
      if (this.assignment.materials.length > 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

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
}
.author {
  margin: 0 2px 0 4px;
}

.bold {
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

.show-button {
  cursor: pointer;
}

.show-button:hover {
  color: lightgrey;
}

.content {
  height: 120px;
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

.noChips {
  height: 42px;
}


</style>
