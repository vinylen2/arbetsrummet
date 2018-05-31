<template>
  <div>
    <v-btn
      @click="editAssignment">
        <v-icon>save_alt</v-icon>Spara uppgift
    </v-btn>
    <v-btn
      @click="shareAssignment">
      <img src="/static/classroom_icon.png" width="20px"> Tilldela direkt
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
import _ from 'lodash';

export default {
  name:'share-assignment',
  components: {
    ProgressDialog,
  },
  props: [
    'assignment',
    'courseId',
    'courseUrl',
  ],
  data() {
    return {
      isProgressing: false,
      progressMessage: '',
      assignmentData: this.assignment,
      courseWork: {
        state: 'PUBLISHED',
        publishedMessage: 'Uppgiften publicerad.',
      },
    };
  },
  computed: {
    materials() {
      if (this.assignmentData.materials.length > 0) {
        return this.assignmentData.materials.map((material) => {
          switch (material.unionField) {
            case 'driveFile':
              return {
                driveFile: {
                  driveFile: {
                    id: material.fileId,
                    title: material.title,
                    alternateLink: material.alternateLink,
                  },
                  shareMode: material.shareMode,
                },
              };
              break;
            case 'link':
              return {
                link: {
                  url: material.alternateLink,
                  title: material.title,
                },
              };
              break;
            case 'youtubeVideo':
              return {
                youtubeVideo: {
                  id: material.fileId,
                  title: material.title,
                  alternateLink: material.alternateLink,
                }
              };
              break;
            default:
          }

        })
      }
      return null;
    },
  },
  methods: {
    shareAssignment() {
      this.isProgressing = true;
      this.progressMessage = 'Ansluter till din Drive';
      if (_.some(this.assignment.materials, {unionField: 'driveFile'})) {
        this.copyDriveFiles();
      } else {
        this.createAssignment();
      }
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

      this.assignment.materials.forEach((material) => {
        if (material.unionField === 'driveFile') {
          batch.add(copyRequest(material), {id: material.id});
        }
      });

      batch.execute((result) => {
        this.assignmentData.materials.forEach((material) => {
          if (material.unionField === 'driveFile') {
            material.fileId = result[material.id].result.id;
          }
        });
        this.createAssignment();
      });
    },
    createAssignment() {
      this.progressMessage = 'Skapar uppgift';
      gapi.client.classroom.courses.courseWork.create({
        courseId: this.courseId,
        title: this.assignment.title,
        description: this.assignment.description,
        workType: 'ASSIGNMENT',
        state: this.courseWork.state,
        materials: this.materials,
      }).then((result) => {
        this.cancel();
        this.close();
        this.$store.commit('showSnackbar', {
          status: true,
          value: this.courseWork.publishedMessage,
          color: 'success',
          hasLink: true,
          linkUrl: this.courseUrl,
          timeout: 5000,
        });
      });
    },
    editAssignment() {
      this.courseWork.state = 'DRAFT';
      this.courseWork.publishedMessage = 'Uppgiften sparad.';
      this.shareAssignment();
    },
    cancel() {
      this.progressMessage = 'Avslutar...';
      setTimeout(() => {
        this.isProgressing = false;
      }, 200);
    },
    close() {
      this.$emit('close');
    },
  },
};

</script>

<style scoped>

</style>
