<template>
  <v-card>
    <v-card-title class="headline">Lägg till länk</v-card-title>
    <v-card-text>
      <v-text-field
        autofocus
        name="linkUrl"
        label="Länk"
        id="linkUrl"
        @keyup.enter="addLink"
        v-model="linkUrl">
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn flat
        @click="close">Avbryt</v-btn>
      <v-btn flat
        v-if="linkUrl.length > 0"
        @click="addLink">Lägg till länk</v-btn>
      <v-btn flat disabled v-else>Lägg till länk</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'add-link',
  data() {
    return {
      linkUrl: '',
    };
  },
  computed: {
    formattedLinkUrl() {
      if (this.linkUrl.indexOf('http://') == 0 || this.linkUrl.indexOf('https://') == 0 ) {
        return this.linkUrl;
      }
      return `https://${this.linkUrl}`;
    },
  },
  methods: {
    addLink() {
      this.$emit('attachLink', this.formattedLinkUrl);
      this.linkUrl = '';
    },
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>
</style>
