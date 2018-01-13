<template>
  <div>
    <a class="container-link"
      :src="alternateLink">
      <div class="material">
        <div class="thumbnail">
          <img class="thumbnail-google"
            :src="thumbnailUrl"
            v-if="thumbnailUrl"/>
          <div class="thumbnail-icon"
            v-else>
            <div v-if="unionField === 'driveFile'">doc</div>
            <div v-if="unionField === 'youtubeVideo'">doc</div>
            <div v-if="unionField === 'link'">doc</div>
            <div v-if="unionField === 'form'">doc</div>
          </div>
        </div>
        <div class="title-link"
          v-if="unionField === 'link'">
          <div class="title">Länk</div>
          <div class="title">{{ title }}</div>
        </div>
        <div class="title-type"
          v-else>
          <p class="title">{{ title }}</p>
          <p class="title"> typ av dokument </p>
        </div>
        <div class="shareMode" v-if="unionField === 'driveFile'">
          <b-form-select class="mb-3"
            v-model="shareMode"
            :options="shareModes"
            text-field="name"
            value-field="enum">
          </b-form-select>
        </div>
        <div class="icon-button"
          @click="removeMaterial">X
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import gapiData from '@/stores/gapi';

export default {
  name: 'material',
  props: [
      'materialData'
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
  background: #f6f6f6;
  border: .05rem solid rgba(0,0,0,0.12);
}

a:hover {
  text-decoration: none;
}

.icon-button {
  cursor: pointer;
}

.icon-button:hover {
  color: darkgrey;
}

</style>
