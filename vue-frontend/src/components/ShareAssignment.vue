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
  props: ['data'],
  data() {
    return {
      isProgressing: false,
      progressMessage: '',
      assignmentData: this.data,
    };
  },
  methods: {
    shareAssignment() {
      this.isProgressing = true;
      this.progressMessage = 'Kopierar dokument';
      console.log(this.data);
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
