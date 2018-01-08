import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
  },
  mutations: {
    toggleLogin: (state, data) => {
      console.log('login', data);
      state.isSignedIn = data;
    },
    setProfile: (state, data) => {
      state.profile.firstName = data.ofa;
      state.profile.lastName = data.wea;
      state.profile.fullName = data.ig;
      state.profile.email = data.U3;
      state.profile.picture = data.Paa;
    },
  },
});
