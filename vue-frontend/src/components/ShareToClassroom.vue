<template>
  <v-card>
    <v-card-title class="header">
      Välj klass
      <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Sök klass..."
        single-line
        hide-details
      ></v-text-field>
      <v-icon :color="'white'">clear</v-icon>
    </v-card-title>
    <!-- <div class="header">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex class="white--text" xs8>
            <p class="title" >Välj klass</p>
          </v-flex>
          <v-flex xs2 text-xs-right>
            <v-icon :color="'white'">clear</v-icon>
          </v-flex>
        </v-layout>
      </v-container>
    </div> -->
    <v-data-table
      :headers="headers"
      :items="fakeItems"
      :search="search"
      >
      <v-progress-linear slot="progress" color="red" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }} </td>
        <td>{{ props.item.createdAt }} </td>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
import gapiData from '@/stores/gapi';

export default {
  name: 'share-to-classroom',
  data() {
    return {
      fakeItems: [
        {
          name: 'testklass',
          section: 'HT17',
          description: 'En testkurs',
          createdAt: 'datum',
        },
      ],
      headers: [
        {
          text: 'Klass',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Beskrivning',
          align: 'left',
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
  methods: {
  },
};


</script>



<style scoped>
.header {
  background-color: #aed581;

}

</style>
