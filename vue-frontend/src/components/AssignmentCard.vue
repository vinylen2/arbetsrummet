<template>
<v-card class="pa-1">
  <v-layout row wrap text-xs-left class="header">
    <v-flex xs2 text-xs-center class="icon-thumbnail" :class="color">
      <v-icon :color="'white'">assignment</v-icon>
    </v-flex>
    <v-flex xs8>
      <p class="author">{{ author }}</p>
      <p class="date"> {{ date }}</p>
    </v-flex>
    <v-flex xs12 class="pa-3 content">
      <h3 primary>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
    </v-flex>
    <v-flex xs4>
      <v-btn light
        :to="{ name: 'assignment', params: { id: data.id }}">
      Öppna</v-btn>
    </v-flex>
    <v-flex xs4>
      <v-btn>
        <v-icon>share</v-icon>
      </v-btn>
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
            <v-icon v-if="material.unionField === 'youtubeVideo'">subscriptions</v-icon>
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
import moment from 'moment';
moment.locale('sv');

export default {
  name: "assignment-card",
  props: ['data'],
  computed: {
    date() {
      return moment(this.data.createdAt).format('D MMM YYYY');
    },
    color() {
      const subject = (( _.has(this.data, 'subjects') && this.data.subjects.length > 0 ) ? this.data.subjects[0] : null);
      if (subject) {
        return subject.color;
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
      return 'Okänd författare';
    },
  },
  data() {
    return {
      showAttachments: false,
    };
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
</style>
