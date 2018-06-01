<template>
  <div class="material">
    <v-container grid-list-md text-xs-left class="pa-0">
        <v-layout row wrap>
          <div class="thumbnail pa-0"
            v-if="unionField ==='driveFile'">
                <v-icon v-if="serviceId === 'pres'" color="yellow darken-2">mdi-file-presentation-box</v-icon>
                <v-icon v-else-if="serviceId === 'doc'" color="blue darken-2">mdi-file-document-box</v-icon>
                <v-icon v-else-if="serviceId === 'spread'" color="green darken-2">mdi-file-document-box</v-icon>
                <v-icon v-else>attach_file</v-icon>
          </div>
          <div class="thumbnail pa-0"
            v-else>
              <v-icon v-if="serviceId === 'web'" color="red darken-2">mdi-youtube-play</v-icon>
              <v-icon v-else>link</v-icon>
          </div>
          <v-flex xs5 class="pa-1">
            <a :href="alternateLink"
              target="_blank">
              <div>
                <div class="subheading" style="padding: 10px 0 5px 0">{{ formattedTitle }}</div>
                <div v-if="unionField === 'driveFile'">{{ swedishType }}</div>
                <div v-else-if="unionField === 'video'">Youtube-klipp</div>
                <div v-else-if="unionField === 'link'"> {{ alternateLink }} </div>
              </div>
            </a>
          </v-flex>
          <v-flex xs4 v-if="edit">
            <v-select v-model="shareMode"
              v-if="unionField === 'driveFile'"
              :items="shareModes"
              item-text="name"
              item-value="enum">
            </v-select>
          </v-flex>
          <v-flex xs1 class="thumbnail text-xs-right"
            v-if="edit">
            <v-icon class="attach-button"
              @click="removeMaterial">clear</v-icon>
          </v-flex>
          <v-flex sm5 hidden-xs-only v-if="!edit && unionField === 'driveFile'"
            text-xs-right
            class="stuff mt-4">
              {{shareModeName}}
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
      'edit',
  ],
  computed: {
    shareModeName() {
      const index = _.findIndex(gapiData.shareModes, {enum: this.shareMode});
      // return this.materialData;
      return gapiData.shareModes[index].name;
    },
    swedishType() {
      switch (this.serviceId) {
        case 'doc':
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
    formattedTitle() {
      if (this.title.length > 20) {
        return this.title.slice(0, 20) + '..';
      }
      return this.title;
    },
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
      shareMode: this.materialData.shareMode,
      shareModes: gapiData.shareModeEnums,
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
  width: 68px;
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
