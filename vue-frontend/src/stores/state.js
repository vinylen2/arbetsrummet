import Vue from 'vue';
import Vuex from 'vuex';
import gapiConfig from '@/stores/gapiConfig.js';

Vue.use(Vuex);
// split this into two stores

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    gapiConfig,
    isLoading: true,
    isMobile: false,
    snackbar: {
      status: false,
      value: 'Felmeddelandetext',
      color: 'success',
      timeout: 5000,
      hasLink: false,
      linkText: '',
      linkUrl: '',
    },
    showSearch: false,
    isSignedIn: false,
    profile: {
      oauthToken: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      picture: '',
    },
    courses: [],
    grades: [],
    subjects: [],
    assignments: [],
  },
  getters: {
    isSignedIn: state => state.isSignedIn,
    snackbar: state => state.snackbar,
  },
  mutations: {
    isMobile: (state, data) => {
      state.isMobile = data;
    },
    hideSnackbar: (state) => {
      state.snackbar.status = false;
    },
    showSnackbar: (state, data) => {
      state.snackbar = data;
    },
    setAssignments: (state, data) => {
      state.assignments = data;
      state.isLoading = false;
    },
    setOauthToken: (state, data) => {
      state.profile.oauthToken = data;
    },
    initiatedLoading: (state) => {
      state.isLoading = true;
    },
    finishedLoading: (state) => {
      state.isLoading = false;
    },
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
      //add timestamp here
      state.courses = data;
    },
    addGrades: (state, data) => {
      state.grades = data;
    },
    addSubjects: (state, data) => {
      state.subjects = data;
    },
  },
});
