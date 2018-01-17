<template>
  <div>
  </div>
</template>

<script>
import gapiData from '@/stores/gapi';

export default {
  name: 'picker',
  props: ['ViewId'],
  data() {
    return {
      pickerApiLoaded: false,
      picker: '',
      picked: [],
    };
  },
  methods: {
    onApiLoad() {
      window.gapi.load('picker', {'callback': this.onPickerApiLoad});
    },
    onPickerApiLoad() {
      this.pickerApiLoaded = true;
      this.createPicker();
    },
    createPicker() {
      if (this.pickerApiLoaded && this.$store.state.profile.oauthToken) {
        this.picker = new google.picker.PickerBuilder().
          addView(google.picker.ViewId[this.ViewId]).
          setOAuthToken(this.$store.state.profile.oauthToken).
          setLocale('sv').
          setDeveloperKey(gapiData.apiKey).
          setCallback(this.pickerCallback).
          build();
        this.picker.setVisible(true);
      }
    },
    pickerCallback(data) {
      if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        const pickedItem = data[google.picker.Response.DOCUMENTS][0];
        this.$emit('itemPicked', pickedItem);
      }
      if (data[google.picker.Response.ACTION] == google.picker.Action.CANCEL) {
        this.$emit('close');
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
