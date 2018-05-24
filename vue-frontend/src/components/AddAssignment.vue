<template>
<v-card>
  <div class="header">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs1>
          <v-icon :style="{color: 'white'}">assignment</v-icon>
        </v-flex>
        <v-flex xs1>
          <h3 class="header-title">Uppgift</h3>
        </v-flex>
        <v-flex xs10 class="text-xs-right">
          <v-icon :style="{color: 'white'}"
            class="attach-button"
            @click="close">clear</v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 class="form">
        <form>
          <v-text-field v-model="publishData.title"
            label="Titel">
          </v-text-field>
          <v-text-field v-model="publishData.description"
            label="Beskrivning">
          </v-text-field>
        </form>
      </v-flex>
      <v-flex xs6 class="subjects">
        <v-select label="Ämnen"
          v-model="publishData.subject"
          v-bind:items="$store.state.subjects"
          item-text="subject"
          hint="Välj ämne">
        </v-select>
      </v-flex>
      <v-flex xs6 class="grades">
        <v-select label="Årskurs"
          v-model="publishData.grades"
          v-bind:items="$store.state.grades"
          item-text="grade"
          multiple
          hint="Välj årskurs">
        </v-select>
      </v-flex>
      <v-flex xs12 class="materials"
        v-if="publishData.materials.length > 0">
        <material v-for="material in publishData.materials"
          :key="material.id"
          :materialData="material"
          @removeMaterial="removeMaterial"
          :type="'edit'">
        </material>
      </v-flex>
      <v-flex xs3 class="buttons">
        <v-layout row wrap class="buttons">
          <v-flex xs4 @click="attachDrive">
          <!-- <v-flex xs4 @click="showDrivePickerModal = true"> -->
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
          <v-flex xs4 @click="attachYoutube">
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
      </v-flex>
      <v-flex xs9 class="text-xs-right buttons-2">
        <v-btn color="primary"
          @click="postAssignment">Publicera</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
</template>

  <script>
  import Assignments from '@/api/services/assignments';
  import Grades from '@/api/services/grades';
  import Subjects from '@/api/services/subjects';

  import AddLink from '@/components/AddLink';
  import Picker from '@/components/Picker';
  import Material from '@/components/Material';

  import _ from 'lodash';

  export default {
    name: 'add-assignment',
    components: {
      AddLink,
      Picker,
      Material,
    },
    data() {
      return {
        showLinkModal: false,
        showDrivePickerModal: false,
        showYoutubePickerModal: false,
        testArray: [],
        publishData: {
          title: '',
          description: '',
          subject: '',
          grades: [],
          materials: [],
        },
      };
    },
    created() {
      this.getGrades();
      this.getSubjects();
    },
    methods: {
    close() {
      this.$emit('close');
    },
    removeMaterial(link) {
      this.publishData.materials = _.filter(this.publishData.materials, (item) => {
        if (item.alternateLink != link) {
          return item;
        }
      });
    },
    attachDrive() {
      this.showDrivePickerModal = true;
      this.$nextTick(() => {
        this.$refs.drivepicker.loadPickerApi();
      });
    },
    attachYoutube() {
      this.showYoutubePickerModal = true;
      this.$nextTick(() => {
        this.$refs.youtubepicker.loadPickerApi();
      });
    },
    attachLink(linkUrl) {
      this.publishData.materials.push({
        unionField: 'link',
        title: 'Länk',
        alternateLink: linkUrl,
      });
      this.showLinkModal = false;
    },
    attachPickedItem(pickedItem) {
      this.publishData.materials.push({
        unionField: 'driveFile',
        title: pickedItem.name,
        alternateLink: pickedItem.url,
        serviceId: pickedItem.serviceId,
        iconUrl: pickedItem.iconUrl,
      });
      this.showDrivePickerModal = false;
    },
    attachPickedClip(pickedItem) {
      this.publishData.materials.push({
        unionField: 'youtubeVideo',
        title: pickedItem.name,
        alternateLink: pickedItem.url,
        serviceId: pickedItem.serviceId,
      });
      this.showYoutubePickerModal = false;
    },
    postAssignment() {
      Assignments.post(this.publishData).then((result) => {
        // graphic for successful post or failed post
        this.$store.commit('showSnackbar', {
          status: true,
          value: 'Uppgift publicerad',
          color: 'success',
          timeout: 5000,
        });
        setTimeout(() => {
          this.$emit('assignmentPosted', result.data);
          this.publishData = '';
        }, 1000);
      });
    },
    getGrades() {
      Grades.getAll().then((result) => {
        this.$store.commit('addGrades', result.data);
      });
    },
    getSubjects() {
      Subjects.getAll().then((result) => {
        this.$store.commit('addSubjects', result.data);
      });
    },
  },
}
</script>

<style scoped>
.attach-button {
  cursor: pointer;
}
.attach-button:hover {
  color: darkgrey;
}

.buttons {
  align-items: center;
}

.headericon {
  color: white;
}

.header-title {
  color: white;
  font-weight: 500;
}


.add-assignment {
  background-color: white;
}

.header {
  height: 50px;
  padding: 5px;
  background-color: grey;
}

.content {
  height: 148px;
}

.attachment-buttons {
  height: 88px;
}

.icon-button {
  cursor: pointer;
}

.icon-button:hover {
  color: darkgrey;
}

.white-icon {
  color: white;
}

.alert {
  margin-bottom: 0px;
}

.materials {
  margin-bottom: 10px;
}
</style>
