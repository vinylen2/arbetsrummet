<template>
  <div>
  </div>
</template>

<script>
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
    loadPickerApi() {
      gapi.load('picker', {
        'callback': this.onPickerApiLoad,
        'onerror': this.error,
        });
    },
    onPickerApiLoad() {
      this.pickerApiLoaded = true;
      this.createPicker();
    },
    createVideoPicker() {
      if (this.pickerApiLoaded && this.$store.state.profile.oauthToken) {
        this.picker = new google.picker.PickerBuilder().
          addView(google.picker.ViewId.VIDEO_SEARCH).
          setOAuthToken(this.$store.state.profile.oauthToken).
          setLocale('sv').
          setAppId(this.$store.state.gapiConfig.appId).
          // setDeveloperKey(this.$store.state.gapiConfig.apiKey).
          setCallback(this.pickerCallback).
          build();
        this.picker.setVisible(true);
      }
    },
    createDocsPicker() {
      if (this.pickerApiLoaded && this.$store.state.profile.oauthToken) {
        this.picker = new google.picker.PickerBuilder().
          addView(google.picker.ViewId.DOCS).
          setOAuthToken(this.$store.state.profile.oauthToken).
          setLocale('sv').
          setAppId(this.$store.state.gapiConfig.appId).
          // setDeveloperKey(this.$store.state.gapiConfig.apiKey).
          setCallback(this.pickerCallback).
          build();
        this.picker.setVisible(true);
      }
    },
    createPicker() {
      switch (this.ViewId) {
        case 'DOCS':
          this.createDocsPicker();
          break;
        case 'VIDEO_SEARCH':
          this.createVideoPicker();
          break;
        default:
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
