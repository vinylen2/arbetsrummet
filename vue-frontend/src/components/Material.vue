<template>
  <div class="material">
    <v-container grid-list-md text-xs-left class="pa-0">
        <v-layout row wrap>
          <v-flex xs2 class="thumbnail pa-0"
            v-if="unionField ==='driveFile'">
                <v-icon v-if="serviceId === 'pres'" color="yellow darken-2">mdi-file-presentation-box</v-icon>
                <v-icon v-else-if="serviceId === 'doc'" color="blue darken-2">mdi-file-document-box</v-icon>
                <v-icon v-else-if="serviceId === 'spread'" color="green darken-2">mdi-file-document-box</v-icon>
                <v-icon v-else>attach_file</v-icon>
          </v-flex>
          <v-flex xs2 class="thumbnail pa-0"
            v-else>
              <v-icon v-if="serviceId === 'web'" color="red darken-2">mdi-youtube-play</v-icon>
              <v-icon v-else>link</v-icon>
          </v-flex>
          <v-flex xs6 class="pa-1">
            <a :href="alternateLink"
              target="_blank">
              <div>
                <div class="title" style="padding: 10px 0 5px 0">{{ title }}</div>
                <p v-if="unionField === 'driveFile'">{{ swedishType }}</p>
                <p v-else-if="unionField === 'video'">Youtube-klipp</p>
                <p v-else-if="unionField === 'link'"> {{ alternateLink }} </p>
              </div>
            </a>
          </v-flex>
          <v-flex xs3>
            <v-select v-model="shareMode"
              v-if="driveFile"
              :items="shareModes"
              item-text="name"
              :auto="true"
              item-value="enum">
            </v-select>
          </v-flex>
          <v-flex xs1 class="thumbnail text-xs-right">
            <v-icon class="attach-button"
              @click="removeMaterial">clear</v-icon>
          </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import gapiData from '@/stores/gapi';

export default {
  name: 'material',
  props: [
      'materialData',
  ],
  computed: {
    swedishType() {
      switch (this.serviceId) {
        case 'docs':
          return 'Dokument';
          break;
        case 'pres':
          return 'Presentation';
          break;
        case 'spread':
          return 'Kalkylark';
          break;
        default:
          return 'Övrigt';
      }
    },
  },
  created() {
  },
  data() {
    return {
      id: this.materialData.id,
      unionField: this.materialData.unionField,
      title: this.materialData.title,
      alternateLink: this.materialData.alternateLink,
      thumbnailUrl: this.materialData.thumbnailUrl,
      formUrl: this.materialData.formUrl,
      createdAt: this.materialData.createdAt,
      updatedAt: this.materialData.updatedAt,
      shareMode: '',
      shareModes: gapiData.shareModes,
      serviceId: this.materialData.serviceId,
    };
  },
  methods: {
    removeMaterial() {
      this.$emit('removeMaterial', this.alternateLink);
    },
  },
}
</script>

<style scoped>
.material {
  background-color: #f6f6f6;
  height: 70px;
  border: .1rem solid rgba(0,0,0,0.12);
}

.attach-button {
  cursor: pointer;
}

.attach-button:hover {
  color: darkgrey;
}

.thumbnail {
  display: flex;
  justify-content: center;
  margin: 4px 0 4px 0;
  margin-bottom: 0;
  height: 68px;
}

a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.title:hover {
  text-decoration: underline;
}

</style>
