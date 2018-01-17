<template>
<v-container grid-list-md text-xs-left>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        light
        solo
        v-model="searchString"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px border-radius: 25%">
      </v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-select
        label="Ämnen"
        v-model="selectedSubjects"
        :items="$store.state.subjects"
        item-text="subject"
        multiple
        chips
        autocomplete
        deletable-chips
        max-height="400"
        hint="Välj ämnen"
        persistent-hint>
        <template slot="selection" slot-scope="data">
          <v-chip close
            @input="remove(data.item)"
            :color="data.item.color">{{data.item.subject}}
          </v-chip>
        </template>
      </v-select>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-select
        label="Årskurser"
        v-model="selectedGrades"
        :items="$store.state.grades"
        :key=""
        item-text="grade"
        multiple
        chips
        deletable-chips
        max-height="400"
        hint="Välj årskurs"
        persistent-hint>
      </v-select>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import Assignments from '@/api/services/assignments';
import _ from 'lodash';

export default {
  name: 'search',
  data() {
    return {
      selectedGrades: [],
      selectedSubjects: [],
      searchString: '',
    };
  },
  watch: {
    searchString: _.debounce(function () {
      this.searchAssignments();
    }, 500),
    selectedGrades() {
      this.searchAssignments();
    },
    selectedSubjects() {
      this.searchAssignments();
    },
  },
  computed: {
    gradesQuery() {
      if (this.selectedGrades.length > 0) {
        return _.map(this.selectedGrades, 'id');
      }
      return null;
    },
    subjectsQuery() {
      if (this.selectedSubjects.length > 0) {
        return _.map(this.selectedSubjects, 'id');
      }
      return null;
    },
    searchQuery() {
      return {
        string: this.searchString,
        grades: this.gradesQuery,
        subjects: this.subjectsQuery,
      };
    },
  },
  methods: {
    remove(item) {
      this.selectedSubjects = _.without(this.selectedSubjects, item);
      this.selectedSubjects.splice(this.selectedSubjects.indexOf(item), 1);
    },
    searchAssignments() {
      Assignments.search(this.searchQuery).then((result) => {
        this.$store.commit('initiatedLoading');
        this.$emit('dataFromSearch', result.data);
      });
    },
  },
}
</script>

<style scoped>
</style>
