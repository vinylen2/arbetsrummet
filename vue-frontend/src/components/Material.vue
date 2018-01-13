<template>
  <div class="material">
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs2>

        </v-flex>
        <v-flex xs9>

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
      'type'
  ],
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

</style>
