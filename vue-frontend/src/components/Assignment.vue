<template>
<v-card class="pa-1">
  <v-layout row wrap text-xs-left class="header">
    <v-flex xs2 text-xs-center class="icon-thumbnail" :class="color">
      <v-icon :color="'white'">assignment</v-icon>
    </v-flex>
    <v-flex xs8>
      <p class>Författare</p>
      <!-- <p class="date" v-if="hasSubject"> {{ data.subjects[0].subject }}, åk {{ data.grades[0].grade }}</p> -->
      <p class=""> {{ date }}</p>
    </v-flex>
    <v-flex xs12 class="pa-3 content">
      <p>{{ assignment.description }}</p>
    </v-flex>

  </v-layout>
</v-card>
</template>

<script>
import Assignments from '@/api/services/assignments';
import Material from '@/components/Material';
import moment from 'moment';

export default {
  name: 'assignment',
  components: {
    Material,
  },
  data() {
    return {
      show: false,
      id: this.$route.params.id,
      assignment: '',
    };
  },
  created() {
    this.$store.commit('intiatedLoading');
    this.getAssignment();
  },
  computed: {
    date() {
      return moment(this.assignment.createdAt).format('D MMM YYYY');
    },
    hasSubject() {
      return (( _.has(this.assignment, 'subjects') && this.assignment.subjects.length > 0 ) ? this.assignment.subjects[0] : null);
    },
    color() {
      if (this.hasSubject) {
        return this.assignment.subjects[0].color;
      }
      return 'grey';
    },
  },
  methods: {
    getAssignment() {
      Assignments.get(this.id).then((result) => {
        this.assignment = result.data[0];
        this.$store.commit('finishedLoading');
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.icon-thumbnail {
  display: flex;
  justify-content: center;
}
.author {
  margin: 0 2px 0 4px;
  font-weight: bold;
}

.date {
  margin: 0 2px 0 4px;
}

.panel {
  margin: -4px;
  padding: -4px;
  width: 100%;
  border: none;
}

.show-button {
  cursor: pointer;
}

.show-button:hover {
  color: lightgrey;
}

.content {
  height: 120px;
}

.material-link {
  text-decoration: none;
  cursor: pointer;
}

.disabled {
  -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
        -o-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
          filter: grayscale(100%);
}
</style>
