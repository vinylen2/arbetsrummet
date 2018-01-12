<template>
  <div class="add-link wrapper">
    <h1>Lägg till länk</h1>
    <label for="linkUrl">Länk</label>
    <b-form-input id="linkUrl"
      v-model.trim="linkUrl">
    </b-form-input>
    <div class="buttons">
      <b-button
        @click="close">Avbryt</b-button>
      <b-button v-if="linkUrl.length > 0"
        @click="addLink">Lägg till länk</b-button>
      <b-button disabled v-else>Lägg till länk</b-button>
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
