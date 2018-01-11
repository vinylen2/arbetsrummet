<template>
<div class="w-75 mx-auto">
  <b-card-group deck>
  	<b-card :title=assignment.title
            header-tag="header">
      <h6 slot="header" class="mb-0">{{assignment.authors[0].firstname}} {{assignment.authors[0].lastname}}
        <br>{{assignment.createdAt}}
      </h6>
      <p class="card-text">
        {{assignment.description}}
      </p>
      foreach gabbes materialcomponent
    </b-card>
  </b-card-group>
</div>
</template>

<script>
import Assignments from "@/api/services/assignments";

export default {
  name: "assignment",
  data() {
    return {
      assignment: {
          id: 0,
          title: "Uppgift",
          description: "Här är beskrivningen för en uppgift",
          courseWorkType: "ASSIGNMENT",
          createdAt: "2017-12-19",
          authors: [{
              id: 0,
              firstname: "John",
              lastname: "Doe",
              email: "john.doe@domain.com",
              createdAt: "2017-12-19T07:25:11Z",
              updatedAt: "2017-12-19T07:25:11Z"
          }],
          materials: [],
          subjects: [],
        },
    };
  },
  created() {
    this.getAllAssignments();
  },
  methods: {
    getAllAssignments() {
      Assignments.getAll().then(result => {
        this.assignments = result.data;
      });
    }
  }
};
</script>

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
.md-card {
    
  background-color: white;
  min-height: 100px;
  border-color: black;
  align-items: center;
  justify-content: center;
  /*border-style: dotted;*/
  border-width: 5px;
  padding: 20px;
}
.md-toolbar {
    background-color: rgba(26, 230, 94, 0.13);
}


</style>
