<template>
<v-card class="pa-1">
  <v-layout row wrap class="header">
    <v-flex xs2 text-xs-center class="icon-thumbnail" primary>
      <v-icon :color="'white'">assignment</v-icon>
    </v-flex>
    <v-flex xs8>
      <p class="author"
        v-if="data.authors.length > 0">
        {{ data.authors[0].fullName }}
      </p>
      <p class="author"
        v-else>Okänd</p>
      <p class="date"> {{date}}</p>
    </v-flex>
    <v-flex xs12 class="pa-3 content">
      <h3 primary>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
    </v-flex>
    <v-flex xs4>
      <v-btn light
        to="/">
      Öppna</v-btn>
    </v-flex>
    <v-flex xs4>
      <v-btn>
        <v-icon>share</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs4 text-xs-center class="pa-3" @click="showAttachments = !showAttachments">
      <v-icon class="show-button"
        v-if="data.materials.length > 0">attachment keyboard_arrow_down
      </v-icon>
    </v-flex>
    <v-flex xs12 class="pa-3" v-if="showAttachments && data.materials.length > 0">
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
  </v-layout>
</v-card>
</template>

<script>
import Assignments from "@/api/services/assignments";
import moment from 'moment';
moment.locale('sv');

export default {
  name: "assignment",
  props: ['data'],
  computed: {
    date() {
      return moment(this.data.createdAt).format('D MMM YYYY');
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
