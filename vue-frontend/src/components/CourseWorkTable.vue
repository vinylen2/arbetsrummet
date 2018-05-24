<template>
  <v-data-table
    :headers="headers"
    :items="courseWorks"
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
    <v-alert slot="no-results" :value="true" color="error" icon="warning">
      Din sökning gav inga träffar.
    </v-alert>
  </v-data-table>
</template>

<script>
export default {
  name: 'course-work-table',
  data() {
    return {
      search: '',
      selected: [],
      isLoading: true,
      noDataText: 'Hämtar inlägg...',
      courseWorks: [],
      headers: [
        {
          text: 'Välj',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Titel',
          align: 'left',
          sortable: true,
          value: 'title',
        },
        {
          text: 'Lärare',
          align: 'left',
          sortable: false,
          value: 'teacher',
        },
        {
          text: 'Inläggsdatum',
          align: 'left',
          sortable: true,
          value: 'createdAt',
        },
      ],
    };
  },
};
</script>

<style scopet>

</style>
