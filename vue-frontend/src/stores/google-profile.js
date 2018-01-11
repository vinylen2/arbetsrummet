import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// split this into two stores

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    isSignedIn: false,
    profile: {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      picture: '',
    },
    shareMode: [
      'VIEW',
      'EDIT',
      'STUDENT_COPY',
    ],
    courses: [],
    grades: [],
    subjects: [],
  },
  getters: {
    isSignedIn: state => state.isSignedIn,
  },
  mutations: {
    toggleLogin: (state, data) => {
      state.isSignedIn = data;
    },
    setProfile: (state, data) => {
      state.profile.firstName = data.ofa;
      state.profile.lastName = data.wea;
      state.profile.fullName = data.ig;
      state.profile.email = data.U3;
      state.profile.picture = data.Paa;
    },
    addCourses: (state, data) => {
      state.courses = JSON.parse(data).courses;
    },
    addGrades: (state, data) => {
      state.grades = data;
    },
    addSubjects: (state, data) => {
      state.subjects = data;
    },
  },
});
