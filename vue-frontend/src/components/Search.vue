<template>
<v-container grid-list-md text-xs-left>
  <v-layout row wrap>
    <v-flex xs12>
      <v-text-field
        light
        solo
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
                <v-btn icon fab right fixed class="show-hide"
                @click="$store.commit('toggleSearch')">
                  <v-icon color="white" large>keyboard_arrow_up</v-icon>
                </v-btn>
  </v-layout>
</v-container>
</template>

<script>

export default {
  name: 'search',
  data() {
    return {
      selectedGrades: [],
      selectedSubjects: [],
    };
  },
  computed: {

  },
  methods: {
    remove(item) {
      this.selectedSubjects.splice(this.selectedSubjects.indexOf(item), 1);
    },
  },
}
</script>

<style scoped>
</style>
