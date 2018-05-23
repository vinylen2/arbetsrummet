<template>
  <v-card>
    <v-card-title class="header white--text">
      Dela uppgift till Classroom
      <v-spacer></v-spacer>
        <v-text-field
          color="white"
          v-model="search"
          append-icon="search"
          label="Sök..."
      ></v-text-field>
      <v-icon :color="'white'" class="cursor">clear</v-icon>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="fakeItems"
      :search="search"
      v-model="selected"
      hide-actions
      item-key="name"
      class="elevation-1"
      >
      <v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }} </td>
        <td>{{ formatDate(props.item.createdAt) }} </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Din sökning gav inga träffar.
      </v-alert>
      <template slot="footer" v-if="this.selected.length === 1">
        <td colspan="100%">
          <v-layout row wrap text-xs-left class="padding">
            <v-flex xs2>
              Något
            </v-flex>
            <v-flex xs8>
              Något
            </v-flex>
            <v-flex xs2 text-xs-right>
              <v-icon class="cursor" @click="shareSelected">arrow_forward</v-icon>
            </v-flex>
          </v-layout>
        </td>
      </template>
      <template slot="footer" v-else>
        <td colspan="100%">
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import gapiData from '@/stores/gapi';
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'share-to-classroom',
  data() {
    return {
      search: '',
      selected: [],
      fakeItems: [
        {
          name: 'testklass',
          section: 'HT17',
          description: 'En testkurs',
        },
        {
          name: 'Hej',
          section: 'HT17',
          description: 'En testkurs',
        },
      ],
      headers: [
        {
          text: 'Välj',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Klass',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Beskrivning',
          align: 'left',
          sortable: false,
          value: 'description',
        },
        {
          text: 'Skapad den',
          align: 'left',
          sortable: true,
          value: 'createdAt',
        },
      ],
    };
  },
  watch: {
    selected() {
      if (this.selected.length > 1) {
        this.selected.shift();
      }
    },
  },
  created() {
    this.listCourses();
  },
  methods: {
    onApiLoad() {
      console.log('loading');
      // window.gapi.load('client:auth2', this.initClient);
    },
    initClient() {

    },
    formatDate(date) {
      return moment(date).format('D MMM YYYY');
    },
    shareSelected() {
      console.log('this should share');
    },
    listCourses() {
      gapi.client.classroom.courses.list().then((response) => {
        console.log(response);
      });
    },
  },
};


</script>



<style scoped>
.header {
  background-color: #aed581;
}

.cursor {
  cursor: pointer;
}

.cursor:hover {
  color: lightgrey;
}

.padding {
  padding: 0 25px 0 25px;
}
</style>
