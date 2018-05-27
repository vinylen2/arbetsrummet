<template>
<v-container grid-list-md text-xs-left>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        light
        solo
        prepend-icon="search"
        clearable
        @cleared="console.log('cleard')"
        hide-details
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
        ref="subjects"
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
        item-text="grade"
        multiple
        ref="grades"
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
  props: ['chipPressValue'],
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
    chipPressValue() {
      if (!this.$store.state.showSearch) {
        this.$store.commit('toggleSearch');
      }
      switch (this.chipPressValue.type) {
        case 'subject':
          this.$refs.subjects.selectItem(_.find(this.$refs.subjects.items, { id: this.chipPressValue.data.id}));
          this.selectedSubjects.push(this.chipPressValue.data);
          break;
        case 'grade':
          this.$refs.grades.selectItem(_.find(this.$refs.grades.items, { id: this.chipPressValue.data.id}));
          this.selectedGrades.push(this.chipPressValue.data);
          break;
        default:
      }
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
    doSearch() {
      if (this.subjectsQuery) {
        return true;
      }
      return false;
    },
    hasSearchString() {
      if (!this.searchString) {
        return false;
      }
      if (this.searchString || this.searchString.length > 0) {
        return true;
      }
      return false;
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
    },
    searchAssignments() {
      if (this.searchQuery.grades || this.searchQuery.subjects || this.hasSearchString) {
        Assignments.search(this.searchQuery).then((result) => {
          this.$store.commit('initiatedLoading');
          this.$emit('addResult', result.data);
        });
      } else {
        Assignments.getAll().then((result) => {
          this.$emit('addResult', result.data);
        });
      }
    },
  },
}
</script>

<style scoped>
</style>
