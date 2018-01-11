<template>
  <div>
    <a class="container-link"
      :src="alternateLink">
      <div class="md-layout material">
        <div class="md-layout-item thumbnail">
          <img class="thumbnail-google"
            :src="thumbnailUrl"
            v-if="thumbnailUrl"/>
          <div class="thumbnail-icon"
            v-else>
            <md-icon v-if="unionField === 'driveFile'">description</md-icon>
            <md-icon v-if="unionField === 'youtubeVideo'">subscriptions</md-icon>
            <md-icon v-if="unionField === 'link'">link</md-icon>
            <md-icon v-if="unionField === 'form'">list</md-icon>
          </div>
        </div>
        <div class="md-layout-item title-link"
          v-if="unionField === 'link'">
          <div class="title">Länk</div>
          <div class="title">{{ title }}</div>
        </div>
        <div class="md-layout-item title-type"
          v-else>
          <p class="title">{{ title }}</p>
          <p class="title"> typ av dokument </p>
        </div>
        <div class="md-layout-item shareMode" v-if="unionField === 'driveFile'">
          <md-select v-model="shareMode"
            name="shareMode"
            id="shareMode"
            placeholder="Eleverna kan visa filen">
            <md-option v-for="shareMode in shareModes"
              :key="shareMode.enum"
              :value="shareMode.name">{{ shareMode.name }}</md-option>
          </md-select>
        </div>
        <div class="md-layout-item icon-button"
          @click="removeMaterial">
          <md-icon>
            clear
          </md-icon>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
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
      shareModes: [
        {
          enum: 'VIEW',
          name: 'Eleverna kan visa filen',
        },
        {
          enum: 'EDIT',
          name: 'Eleverna kan redigera filen',
        },
        {
          enum: 'STUDENT_COPY',
          name: 'Gör en kopia för varje elev',
        },
      ],
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
