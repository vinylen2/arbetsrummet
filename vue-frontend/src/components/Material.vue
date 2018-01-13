<template>
  <div class="material">
    <v-container grid-list-md text-xs-left>
        <v-layout row wrap>
          <v-flex xs2 class="thumbnail">
              <v-icon v-if="driveFile">description</v-icon>
              <v-icon v-else>language</v-icon>
          </v-flex>
          <v-flex xs6>
            <a :href="alternateLink"
              target="_blank">
              <div>
                <p class="title">{{ title }}</p>
                <p> typ av dokument </p>
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
          <v-flex xs1 class="text-xs-right">
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
    driveFile() {
      if (this.unionField === 'link') {
        return false;
      }
      return true;
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
      shareMode: '',
      shareModes: gapiData.shareModes,
    };
  },
  methods: {
    removeMaterial() {
      this.$emit('removeMaterial', this.id);
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
  background: lightgrey;
  height: 60px;
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
