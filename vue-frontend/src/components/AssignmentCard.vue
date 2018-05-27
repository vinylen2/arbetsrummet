<template>
<v-card class="pa-1">
  <v-layout row wrap text-xs-left class="header">
    <v-flex xs2 text-xs-center class="icon-thumbnail" :class="color">
      <v-icon :color="'white'">assignment</v-icon>
    </v-flex>
    <v-flex xs8>
      <p class="author">{{ data.title }}</p>
      <!-- <p class="date" v-if="hasSubject"> {{ data.subjects[0].subject }}, åk {{ data.grades[0].grade }}</p> -->
      <p class="date"> {{ date }}</p>
    </v-flex>
    <v-flex xs12 class="pa-3 content">
      <p>{{ data.description }}</p>
    </v-flex>
    <v-flex xs12>
      <v-chip class="cursor"
        :color="color"
        text-color="white"
        @click="chipPressed('subject', data.subjects[0])">{{ data.subjects[0].subject }}
      </v-chip>
      <v-chip class="cursor"
        @click="chipPressed('grade', data.grades[0])">{{ data.grades[0].grade }}
      </v-chip>
    </v-flex>
    <v-flex xs4>
      <v-btn
        light
        depressed
        :to="{ name: 'assignment', params: { id: data.id }}">Läs mer
      </v-btn>
    </v-flex>
    <v-flex xs4>
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
          :data="data"
          :options="coursePickerOptions"
          @close="shareToClassroomModal = false">
        </course-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs4 text-xs-right class="pa-3" @click="showAttachments = !showAttachments">
      <v-icon class="show-button" v-if="anyMaterials && !showAttachments">attachment keyboard_arrow_down </v-icon>
      <v-icon class="show-button" v-if="anyMaterials && showAttachments">attachment keyboard_arrow_up </v-icon>
    </v-flex>
    <v-slide-y-transition>
      <v-flex xs12 class="pa-3" v-if="showAttachments && anyMaterials">
        <div v-if="data.materials.length > 0"
          v-for="material in data.materials">
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
  </v-layout>
</v-card>
</template>

<script>
import Assignments from "@/api/services/assignments";
import CoursePicker from '@/components/CoursePicker';
import moment from 'moment';
moment.locale('sv');

export default {
  name: "assignment-card",
  props: ['data'],
  components: {
    CoursePicker,
  },
  data() {
    return {
      shareToClassroomModal: false,
      showAttachments: false,
      coursePickerOptions: {
        title: 'Dela uppgift',
        action: 'share-assignment',
        table: 'courses',
      },
    };
  },
  methods: {
    chipPressed(type, data) {
      this.$emit('chipPressed', {
        data: data,
        type: type,
      });
    },
  },
  computed: {
    date() {
      return moment(this.data.createdAt).format('D MMM YYYY');
    },
    hasSubject() {
      return (( _.has(this.data, 'subjects') && this.data.subjects.length > 0 ) ? this.data.subjects[0] : null);
    },
    color() {
      if (this.hasSubject) {
        return this.data.subjects[0].color;
      }
      return 'grey';
    },
    anyMaterials() {
      if (this.data.materials.length > 0) {
        return true;
      }
      return false;
    },
    author() {
      const author = (( _.has(this.data, 'authors') && this.data.authors.length > 0 ) ? this.data.authors[0] : null);
      if (author) {
        return author.fullName;
      }
      return 'Anonym';
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
</style>
