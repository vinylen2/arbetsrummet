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
      <v-icon @click="close"
        :color="'white'"
        class="cursor">clear</v-icon>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="$store.state.courses"
      :search="search"
      :no-data-text="noDataText"
      :loading="isLoading"
      v-model="selected"
      item-key="name"
      class="elevation-1"
      >
      <v-progress-linear slot="progress" color="light-green" indeterminate>Hämtar dina klassrum...</v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
            clear
          ></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.section }} </td>
        <td>{{ formatDate(props.item.creationTime) }} </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Din sökning gav inga träffar.
      </v-alert>
      <template slot="footer" v-if="selected.length === 1">
        <td colspan="100%">
          <v-layout row wrap text-xs-left class="padding">
            <v-flex xs2>
            </v-flex>
            <v-flex xs6>
            </v-flex>
            <v-flex xs4 text-xs-right>
              <v-btn @click="shareSelected">
                <img src="/static/classroom_icon.png" width="20px">Dela till {{ selectedName }}
              </v-btn>
            </v-flex>
          </v-layout>
        </td>
      </template>
      <!-- <template slot="footer" v-else>
        <td colspan="100%"></td>
      </template> -->
    </v-data-table>
  </v-card>
</template>

<script>
import gapiData from '@/stores/gapi';
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'share-to-classroom',
  props: ['data'],
  data() {
    return {
      search: '',
      selected: [],
      isLoading: true,
      noDataText: 'Hämtar dina klassrum...',
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
    if (this.$store.state.courses.length > 0) {
      this.isLoading = false;
    } else {
      this.listCourses();
    }
  },
  computed: {
    selectedName() {
      if (this.selected[0].name.length > 10) {
        return this.selected[0].name.slice(0, 10) + '..';
      }
      return this.selected[0].name;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    formatDate(date) {
      return moment(date).format('D MMM YYYY');
    },
    shareSelected() {
      console.log('this should share');
    },
    listCourses() {
      gapi.client.classroom.courses.list().then((response) => {
        const hasCourses = response.result.courses ? true : false;
        if (hasCourses) {
          this.$store.commit('addCourses', response.result.courses);
          this.isLoading = false;
        } else {
          this.noDataText = 'Hittade inga klassrum.';
          this.$store.commit('addCourses', []);
          this.isLoading = false;
        }
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
