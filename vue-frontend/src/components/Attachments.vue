<template>
  <v-layout row wrap class="buttons">
    <v-flex xs4 @click="launchDrivePicker">
      <v-icon class="attach-button">mdi-google-drive</v-icon>
    </v-flex>
    <v-dialog v-model="showDrivePickerModal"
      :lazy="true">
      <picker ref="drivepicker"
        :ViewId="'DOCS'"
        @itemPicked="attachPickedItem"
        @close="showDrivePickerModal = false">
      </picker>
    </v-dialog>
      <v-flex xs4 @click="launchYoutubePicker">
      <v-icon class="attach-button">mdi-youtube-play</v-icon>
    </v-flex>
    <v-dialog v-model="showYoutubePickerModal"
      :lazy="true">
      <picker ref="youtubepicker"
        :ViewId="'VIDEO_SEARCH'"
        @itemPicked="attachPickedClip"
        @close="showYoutubePickerModal = false">
      </picker>
    </v-dialog>
    <v-flex xs4 @click="showLinkModal = true">
      <v-icon class="attach-button">link</v-icon>
    </v-flex>
    <v-dialog v-model="showLinkModal"
      width="250px">
      <add-link @attachLink="attachLink"
        @close="showLinkModal = false"></add-link>
    </v-dialog>
  </v-layout>
</template>

<script>
import AddLink from '@/components/AddLink';
import Picker from '@/components/Picker';

export default {
  name: 'attachments',
  components: {
    AddLink,
    Picker,
  },
  data() {
    return {
      showLinkModal: false,
      showDrivePickerModal: false,
      showYoutubePickerModal: false,
    };
  },
  methods: {
    launchDrivePicker() {
      this.showDrivePickerModal = true;
      this.$nextTick(() => {
        this.$refs.drivepicker.loadPickerApi();
      });
    },
    launchYoutubePicker() {
      this.showYoutubePickerModal = true;
      this.$nextTick(() => {
        this.$refs.youtubepicker.loadPickerApi();
      });
    },
    attachLink(data) {
      this.$emit('attach', {
        unionField: 'link',
        title: data.title,
        alternateLink: data.linkUrl,
      });
      this.showLinkModal = false;
    },
    attachPickedItem(pickedItem) {
      this.$emit('attach', {
        unionField: 'driveFile',
        title: pickedItem.name,
        alternateLink: pickedItem.url,
        serviceId: pickedItem.serviceId,
        iconUrl: pickedItem.iconUrl,
        fileId: pickedItem.id,
      });
      this.showDrivePickerModal = false;
    },
    attachPickedClip(pickedItem) {
      this.$emit('attach', {
        unionField: 'youtubeVideo',
        title: pickedItem.name,
        alternateLink: pickedItem.url,
        serviceId: pickedItem.serviceId,
      });
      this.showYoutubePickerModal = false;
    },

  },
};

</script>

<style scoped>
.attach-button {
  cursor: pointer;
}
.attach-button:hover {
  color: darkgrey;
}

</style>
