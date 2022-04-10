<template>
  <div
    v-if="!loggedIn"
    class="d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh"
  >
    <h1 class="mb-5">M.A. Maddock login</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="mt-5"
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="mt-5"
        id="input-group-3"
        label="Your Name:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.fullName"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <div class="mt-5 d-flex justify-content-around">
        <b-button type="submit" @click.prevent="login(form)" variant="primary"
          >Submit</b-button
        >
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
  <div v-else>
    <h1>Welcome, you're logged in!</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loggedIn"]),
  },
  name: "Home",
  components: {},
  data() {
    return {
      show: true,
      form: {
        fullName: null,
        email: null,
        password: null,
      },
    };
  },
  created() {
    document.title = "Home";
  },
  methods: {
    ...mapActions(["login", "register"]),
    onReset() {},
    onSubmit() {},
  },
};
</script>

<style></style>
