<template>
<div>
  <v-progress-linear class="ma-0" :color="'light-green lighten-2'"
    :indeterminate="true"
    v-if="isLoading">
  </v-progress-linear>
  <div class="header light-green lighten-2"
    v-if="!isLoading">
      <v-container grid-list-md text-xs-left>
        <v-layout row wrap white--text>
          <v-flex xs12>
            <h2 v-if="data.subjects.length > 0">{{  data.title }}</h2>
            <h2 v-else>{{  data.title }}</h2>
          </v-flex>
          <v-flex xs6>
            <h4 v-if="data.authors.length > 0">
              {{ data.authors[0].fullName }} {{ date }}
            </h4>
            <h4 v-else>Okänd författare {{ date }}</h4>
          </v-flex>
        </v-layout>
      </v-container grid-list-md text-xs-left>
  </div>
  <v-container grid-list-md text-xs-left
    v-if="!isLoading">
    <v-layout row wrap>
        {{ id }}
    </v-layout>
  </v-container>
</div>
</template>

<script>
import Assignments from '@/api/services/assignments';
import moment from 'moment';

export default {
  name: 'assignment',
  data() {
    return {
      id: this.$route.params.id,
      isLoading: true,
      data: [],
    };
  },
  created() {
    this.getAssignment();
  },
  computed: {
    date() {
      return moment(this.data.createdAt).format('D MMM YYYY');
    },
    color() {
      const subject = this.data.subjects[0];
      if (this.data.subjects.length > 0) {
        return subject.color;
      }
      return 'grey';
    },
  },
  methods: {
    getAssignment() {
      Assignments.get(this.id).then((result) => {
        this.data = result.data[0];
        this.isLoading = false;
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 116px;
}

</style>
