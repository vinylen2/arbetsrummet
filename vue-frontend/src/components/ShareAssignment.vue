<template>
  <div>
    <v-btn
      @click="editAssignment">
        <v-icon>edit</v-icon>Redigera
    </v-btn>
    <v-btn
      @click="shareAssignment">
      <img src="/static/classroom_icon.png" width="20px"> Dela direkt
    </v-btn>
    <v-dialog
      v-model="isProgressing"
      persistent
      max-width="250px">
      <progress-dialog
        :message="progressMessage"
        @cancel="cancel">
      </progress-dialog>
    </v-dialog>
  </div>
</template>

<script>
import ProgressDialog from '@/components/ProgressDialog';

export default {
  name:'share-assignment',
  components: {
    ProgressDialog,
  },
  props: [
    'data',
    'courseId',
  ],
  data() {
    return {
      isProgressing: false,
      progressMessage: '',
      assignmentData: this.data,
      copiedFiles: [],
    };
  },
  created() {
  },
  methods: {
    shareAssignment() {
      this.isProgressing = true;
      this.progressMessage = 'Ansluter till din Drive';
      gapi.load('client', this.onClientApiLoad);
    },
    onClientApiLoad() {
      gapi.client.init({
        apiKey: this.$store.state.apiConfig.apiKey,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest', 'https://classroom.googleapis.com/$discovery/rest?version=v1'],
      }).then(() => {
        this.copyDriveFiles();
      });
    },
    copyDriveFiles() {
      this.progressMessage = 'Kopierar filer';
      const batch = gapi.client.newBatch();

      function copyRequest(material) {
        const resource = { title: material.title }
        return gapi.client.request({
          path: `drive/v3/files/${material.fileId}/copy`,
          method: 'POST',
          body: resource,
        });
      }

      this.data.materials.forEach((material) => {
        if (material.unionField === 'driveFile') {
          batch.add(copyRequest(material));
        }
      });

      batch.execute((res) => {
        this.copedFiles = res;
        this.createAssignment();
      });
    },
    createAssignment() {
      this.progressMessage = 'Skapar uppgift';
      const body = {
        title: this.data.title,
        workType: 'ASSIGNMENT',
        state: 'DRAFT',
      };
      // gapi.client.classroom.courses.courseWork.create({
      //   courseId: this.courseId,
      //   body,
      // }).then((result) => {
      //   console.log(result);
      // });
    },
    editAssignment() {

    },
    cancel() {
      //stuff
      this.isProgressing = false;
    },
  },
};

</script>

<style scoped>

</style>
