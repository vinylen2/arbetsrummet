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
            <h2 v-else>{{ data.title }}</h2>
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
  <!-- Här slutar headern -->
  <v-container grid-list-md text-xs-left v-if="!isLoading">
    <v-layout row wrap>
      <v-flex d-flex xs6 offset-xs2>
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <v-card>
              <v-card-text>
              <h1>Beskrivning</h1>
              <h3>Beskrivning av uppgiften för lärare här</h3>
              </v-card-text>
              <v-card-text>



              </v-card-text>
              <v-card-text>
                <v-card-actions>
                Uppgiftsbeskrivning som går att öppna neråt för mer info, med typ knappen ->
                  <v-spacer></v-spacer>
                  <v-btn icon @click.native="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-slide-y-transition>
                  <v-card-text v-show="show">
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                  </v-card-text>
                </v-slide-y-transition>
              </v-card-text>
              <v-card-text>
                <h2>Bifogade dokument</h2>
                <!-- <v-layout row wrap text-xs-left class="header">
                  <v-flex xs12 v-for="material in data.materials"></v-flex>
                </v-layout> -->

                  <!-- <v-expansion-panel>
                    <v-expansion-panel-content v-for="(item,i) in 3" :key="i">
                      <div slot="header">Bifogat dokument foreach</div>
                      <v-card>
                        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel> -->
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- HÖGER SIDA -->
      <v-flex d-flex xs2>
        <v-card color="purple" dark>
          <v-card-title primary class="title">Information</v-card-title>
            <v-card-text>
            Ämne:
            </v-card-text>
            <v-card-text>
            Årskurs:
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</div>
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
      isLoading: true,
      data: {},
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
