<template>
  <div class="add-assignment">
    <div class="md-layout header">
      <md-icon class="md-layout-item white-icon">
        assignment
      </md-icon>
      <div class="md-layout-item">
        <p class="header-title">Uppgift</p>
      </div>
      <div class="md-layout-item">
        <md-button class="md-icon-button close"
          @click="close">
          <md-icon>
            clear
          </md-icon>
        </md-button>
      </div>
    </div>
    <div class="wrapper">
      <div class="md-layout-row content">
        <div class="md-flex">
          <md-field>
            <label>Titel</label>
            <md-input v-model="publishData.title"
              placeholder="Titel"
              required></md-input>
          </md-field>
        </div>
        <div class="md-flex">
          <md-field>
            <label>Beskrivning</label>
            <md-input v-model="publishData.description"
              placeholder="Beskrivning"
              required></md-input>
          </md-field>
        </div>
      </div>
      <div class="md-layout md-gutter labels">
        <md-field class="md-layout-item md-size-30">
          <label>Ämne</label>
          <md-select v-model="publishData.subjects"
            multiple
            name="subject"
            id="subject"
            placeholder="Ämne">
            <md-option v-for="subject in $store.state.subjects" :key="subject.id" :value="subject.id">{{ subject.subject }}</md-option>
          </md-select>
        </md-field>
        <md-field class="md-layout-item md-size-30">
          <label>Årskurs</label>
          <md-select v-model="publishData.grades"
            multiple
            name="grade"
            id="grade"
            placeholder="Årskurs">
            <md-option v-for="grade in $store.state.grades" :key="grade.id" :value="grade.id">{{ grade.grade }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout attachments">
        <!-- <md-button class="attach-button"
          @click="showDrivePickerDialog = true">
          <md-icon>folder_shared</md-icon>
        </md-button>
        <md-dialog class="drive-picker"
          :md-active.sync="showDrivePickerDialog">
          <md-dialog-content>
            <picker :ViewId="'DOCS'"></picker>
          </md-dialog-content>
        </md-dialog> -->
        <md-button class="attach-button"
          @click="attachYoutube">
          <md-icon>subscriptions</md-icon>
        </md-button>
        <md-button class="attach-button"
          @click="showLinkDialog = true">
          <md-icon>link</md-icon>
        </md-button>
        <md-dialog :md-active.sync="showLinkDialog">
          <add-link
            @closeLinkDialog="closeLinkDialog"
            @attachLink="attachLink"></add-link>
        </md-dialog>
        <md-button class="md-raised md-primary"
          @click="postAssignment">Publicera</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import Grades from '@/api/services/grades';
import Subjects from '@/api/services/subjects';

import AddLink from '@/components/AddLink';
import Picker from '@/components/Picker';

export default {
  name: 'add-assignment',
  components: {
    AddLink,
    Picker,
  },
  data() {
    return {
      showLinkDialog: false,
      showDrivePickerDialog: false,
      publishData: {
        title: '',
        description: '',
        subjects: [],
        grades: [],
        attachments: [],
      },
    };
  },
  created() {
    this.getGrades();
    this.getSubjects();
  },
  methods: {
    close() {
    },
    attachDrive() {

    },
    attachYoutube() {

    },
    closeLinkDialog() {
      this.showLinkDialog = false;
    },
    attachLink(linkUrl) {
      this.publishData.attachments.push({
        unionField: 'link',
        title: 'Coming soon',
        alternateLink: linkUrl,
      });
      this.showLinkDialog = false;
    },
    postAssignment() {
      Assignments.post(this.publishData).then((result) => {
        console.log(result);
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

.attachments {
  height: 88px;
}
.white-icon {
  color: white;
}
</style>
