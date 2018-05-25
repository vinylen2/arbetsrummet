<template>
<v-card>
  <v-card-title :class="headerColor">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs1>
          <v-icon :style="{color: 'white'}">assignment</v-icon>
        </v-flex>
        <v-flex xs1>
          <h3 class="header-title">Uppgift</h3>
        </v-flex>
        <v-flex xs10 class="text-xs-right">
          <v-icon :style="{color: 'white'}"
            class="attach-button"
            @click="close">clear</v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-title>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 class="form">
        <form>
          <v-text-field v-model="publishData.title"
            label="Titel">
          </v-text-field>
          <v-text-field v-model="publishData.description"
            label="Beskrivning">
          </v-text-field>
        </form>
      </v-flex>
      <v-flex xs6 class="subjects">
        <v-select label="Ämnen"
          v-model="publishData.subject"
          v-bind:items="$store.state.subjects"
          item-text="subject"
          hint="Välj ämne">
        </v-select>
      </v-flex>
      <v-flex xs6 class="grades">
        <v-select label="Årskurs"
          v-model="publishData.grades"
          v-bind:items="$store.state.grades"
          item-text="grade"
          multiple
          hint="Välj årskurs">
        </v-select>
      </v-flex>
      <v-flex xs12 class="materials"
        v-if="publishData.materials.length > 0">
        <material v-for="material in publishData.materials"
          :key="material.id"
          :materialData="material"
          @removeMaterial="removeMaterial"
          :type="'edit'">
        </material>
      </v-flex>
      <v-flex xs3 class="buttons">
        <attachments @attach="addMaterial"></attachments>
      </v-flex>
      <v-flex xs9 class="text-xs-right buttons-2">
        <v-btn color="primary"
          @click="postAssignment">Publicera</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
</template>

<script>
import Attachments from '@/components/Attachments';
import Material from '@/components/Material';

import Assignments from '@/api/services/assignments';
import _ from 'lodash';

export default {
  name: 'add-assignment',
  components: {
    Attachments,
    Material,
  },
  data() {
    return {
      publishData: {
        title: '',
        description: '',
        subject: '',
        grades: [],
        materials: [],
      },
    };
  },
  computed: {
    headerColor() {
      const subjectColor = this.publishData.subject.color;
      if (subjectColor) {
        return subjectColor;
      }
      return 'grey';
    },
  },
  methods: {
    addMaterial(item) {
      this.publishData.materials.push(item);
    },
    close() {
      this.$emit('close');
    },
    removeMaterial(link) {
      this.publishData.materials = _.filter(this.publishData.materials, (item) => {
        if (item.alternateLink != link) {
          return item;
        }
      });
    },
    postAssignment() {
      Assignments.post(this.publishData).then((result) => {
        // graphic for successful or failed post
        this.$store.commit('showSnackbar', {
          status: true,
          value: 'Uppgift publicerad',
          color: 'success',
          timeout: 5000,
        });
        setTimeout(() => {
          this.$emit('assignmentPosted', result.data);
          this.publishData = '';
        }, 1000);
      });
    },
  },
}
</script>

<style scoped>

.buttons {
  align-items: center;
}

.headericon {
  color: white;
}

.header-title {
  color: white;
  font-weight: 500;
}


.add-assignment {
  background-color: white;
}

.header {
  height: 50px;
  padding: 5px;
}

.content {
  height: 148px;
}

.attachment-buttons {
  height: 88px;
}

.icon-button {
  cursor: pointer;
}

.icon-button:hover {
  color: darkgrey;
}

.white-icon {
  color: white;
}

.alert {
  margin-bottom: 0px;
}

.materials {
  margin-bottom: 10px;
}
</style>
