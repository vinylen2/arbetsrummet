<template>
<div class="assignment">
    <div class="md-layout">
        <md-card v-for="assignment in assignments" :key="assignment.id">
            <md-toolbar class="md-accent" md-elevation="0">
                <h3 v-if="assignment.authors.length == 0">Author name here </h3>
                <h3 v-for="author in assignment.authors" :key="author.id" class="md-title">{{author.fullName}}</h3>
                <div class="md-toolbar-row">
                    <div class="md-subhead">{{assignment.updatedAt}}</div>
                </div>
            </md-toolbar>
        <md-card-header>
            <md-card-header>
                <div class="md-title">{{assignment.title}}</div>
                <div class="md-subhead">{{assignment.description}}</div>
            </md-card-header>
        </md-card-header>

        <md-card v-for="material in assignment.materials" :key="material.id">
            <md-card-header>
                <md-card-media>
                    <img :src="material.thumbnailUrl" alt="material thumbnail">
                </md-card-media>

                <md-card-header-text>
                    <div class="md-title">{{material.title}}</div>
                    <md-button :href="material.alternateLink" class="md-raised">Öppna dokument</md-button>
                </md-card-header-text>
            </md-card-header>
        </md-card>

        <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea nostrum.
        </md-card-content>

        <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
        </md-card-actions>
        </md-card>
    </div>
</div>
</template>

<script>
import Assignments from "@/api/services/assignments";

export default {
  name: "assignment",
  data() {
    return {
      assignments: []
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
