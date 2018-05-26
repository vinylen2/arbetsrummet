<template>
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
    <v-progress-linear slot="progress" color="light-green" indeterminate></v-progress-linear>
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
    <template slot="footer" v-if="this.selected.length > 0">
      <td colspan="100%">
        <share-assignment v-if="action === 'share-assignment'"
          :data="data"
          :courseId="this.selected[0].id">
        </share-assignment>
      </td>
    </template>
    <v-alert slot="no-results" :value="true" color="error" icon="warning">
      Din sökning gav inga träffar.
    </v-alert>
  </v-data-table>
</template>

<script>
import gapiData from '@/stores/gapi';
import ShareAssignment from '@/components/ShareAssignment';
import moment from 'moment';
moment.locale('sv');

export default {
  name: 'course-table',
  components: {
    ShareAssignment,
  },
  props: [
    'data',
    'action',
  ],
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
      if (this.action === 'reuse-coursework') {
        this.$emit('selected', this.selected);
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
    assignmentSelected() {

    },
    close() {
      this.$emit('close');
    },
    formatDate(date) {
      return moment(date).format('D MMM YYYY');
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
