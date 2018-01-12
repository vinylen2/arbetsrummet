<template>
  <div class="add-assignment">
    <div class="header">
      <h3>Uppgift</h3>
      <b-button
        @click="close">Stäng
      </b-button>
    </div>
    <div class="materials">
      <material v-for="material in publishData.materials"
        :key="material.id"
        :value="material.id"
        :materialData="material"
        @removeMaterial="removeMaterial"></material>
    </div>
    <div class="md-layout attachment-buttons">
      <b-button class="attach-button"
        @click="$modal.show('drivePicker')">Drive
      </b-button>
      <modal name="drivePicker">
          <picker :ViewId="'DOCS'"
            @itemPicked="attachPickedItem"></picker>
      </modal>
      <!-- <div @click="attachYoutube">
        <md-icon class="icon-button">subscriptions</md-icon>
      </div> -->
      <b-button class="link-button"
        @click="$modal.show('attachLink')">Länk
      </b-button>
      <modal name="attachLink">
          <add-link
            @attachLink="attachLink"
            @closeLinkDialog="$modal.hide('attachLink')">
          </add-link>
      </modal>
      <b-button class="publish-button"
        @click="postAssignment">Publicera
      </b-button>
    </div>
  </div>
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
      publishData: {
        title: '',
        description: '',
        subjects: [],
        grades: [],
        materials: [
          {
            id: 1,
            unionField: 'link',
            title: 'Coming soon',
          },
        ],
      },
    };
  },
  created() {
    this.getGrades();
    this.getSubjects();
  },
  methods: {
    close() {
      this.$emit('closeAddAssignmentModal');
    },
    removeMaterial(id) {
      this.publishData.materials = _.filter(this.materials, { id });
    },
    attachDrive() {

    },
    attachYoutube() {

    },
    attachLink(linkUrl) {
      this.publishData.materials.push({
        unionField: 'link',
        title: 'Coming soon',
        alternateLink: linkUrl,
      });
      this.$modal.hide('attachLink');
    },
    attachPickedItem(pickedItem) {
      this.publishData.materials.push({
        unionField: 'driveFile',
        title: pickedItem.name,
        alternateLink: pickedItem.url,
        serviceId: pickedItem.serviceId,
      });
      this.$modal.hide('drivePicker');
    },
    postAssignment() {
      Assignments.post(this.publishData).then((result) => {
        console.log('Assignment posted');
        console.log(result);
        this.$emit('closeAddAssignmentModal');
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-title {
  color: white;
  font-weight: 500;
}

.add-assignment {
  background-color: white;
}

.wrapper {
  margin: 0 20px;
}

.header {
  height: 56px;
  margin-bottom: 20px;
  background-color: grey;
}

.content {
  height: 148px;
}

.attachment-buttons {
  height: 88px;
}
.white-icon {
  color: white;
}

.icon-button {
  cursor: pointer;
}

.icon-button:hover {
  color: darkgrey;
}

</style>
