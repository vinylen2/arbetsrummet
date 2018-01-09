<template>
  <div class="add-link wrapper">
    <h1>Lägg till länk</h1>
    <md-field>
      <label>Länk</label>
      <md-input v-model="linkUrl"
        placeholder="Länk"></md-input>
    </md-field>
    <div class="md-layout-item">
      <md-button @click="close">Avbryt</md-button>
      <md-button v-if="linkUrl.length > 0"
        @click="addLink">Lägg till länk </md-button>
      <md-button v-else disabled>Lägg till länk</md-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'add-link',
  data() {
    return {
      linkUrl: '',
    };
  },
  methods: {
    addLink() {
      this.$emit('attachLink', this.linkUrl);
    },
    close() {
      this.$emit('closeLinkDialog');
    },
  },
}
</script>

<style scoped>
.wrapper {
  margin: 20px;
  background-color: white;
}
</style>
