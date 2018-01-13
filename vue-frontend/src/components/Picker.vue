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
      oauthToken: null,
      picker: '',
      picked: [],
    };
  },
  mounted() {
    this.onApiLoad();
  },
  methods: {
    onApiLoad() {
      window.gapi.load('auth', {'callback': this.onAuthApiLoad});
      window.gapi.load('picker', {'callback': this.onPickerApiLoad});
    },
    handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        this.oauthToken = authResult.access_token;
        this.createPicker();
      }
    },
    onPickerApiLoad() {
      this.pickerApiLoaded = true;
      this.createPicker();
    },
    onAuthApiLoad() {
      window.gapi.auth.authorize({
        client_id: gapiData.clientId,
        scope: gapiData.scopes.drive,
        immediate: false,
      },
      this.handleAuthResult);
    },
    createPicker() {
      if (this.pickerApiLoaded && this.oauthToken) {
        const picker = new google.picker.PickerBuilder().
          addView(google.picker.ViewId[this.ViewId]).
          setOAuthToken(this.oauthToken).
          setLocale('sv').
          setDeveloperKey(gapiData.apiKey).
          setCallback(this.pickerCallback).
          build();
        picker.setVisible(true);
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
