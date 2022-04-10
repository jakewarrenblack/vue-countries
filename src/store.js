import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // new state will be mapped to this value by the login/logout events
    loggedIn: false,
    registerErrors: null,
    loginErrors: null,
  },
  getters: {},
  mutations: {
    // method receives a state and a status
    SET_LOGGED_IN_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
  },
  // we want our login action to be performed on form submit
  actions: {
    // 'context' is built into vuex, every action with have the context
    login(context, credentials) {
      console.log(credentials);

      axios
        .post(`https://maddock-backend.herokuapp.com/login`, {
          fullName: credentials.fullName,
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          console.log(response.data.token);
          console.log("username: " + response.data.name);

          context.commit("SET_LOGGED_IN_STATUS", true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
        })
        .catch((error) => {
          console.log(credentials.fullName);
          console.log(credentials.email);
          console.log(credentials.password);
          console.log(error);
          console.log(error.response.data.message);
        });
    },
    register(context, credentials) {
      console.log(credentials);

      axios
        .post(`https://college-api-mo.herokuapp.com/api/register`, {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          // Log the newly registered user in immediately and show the welcome screen
          console.log(response.data.token);
          console.log("username: " + response.data.name);

          // If register was successful, remove any stored register errors
          context.commit("SET_REGISTER_ERRORS");

          axios
            .post(`https://college-api-mo.herokuapp.com/api/login`, {
              email: credentials.email,
              password: credentials.password,
            })
            .then((response) => {
              console.log(response.data.token);
              console.log("username: " + response.data.name);

              // takes the name of the mutation and the new value
              context.commit("SET_LOGGED_IN_STATUS", true);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("name", response.data.name);
            })
            .catch((error) => {
              console.log(error);
              console.log(error.response);
            });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
        });
    },
    // Again, we *always* pass in the context!
    logout(context) {
      localStorage.removeItem("token");
      context.commit("SET_LOGGED_IN_STATUS", false);
    },
  },
});
