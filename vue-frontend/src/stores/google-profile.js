import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// split this into two stores

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    showSearch: true,
    isSignedIn: false,
    profile: {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      picture: '',
    },
    courses: [],
    grades: [],
    subjects: [],
  },
  getters: {
    isSignedIn: state => state.isSignedIn,
  },
  mutations: {
    toggleSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
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
