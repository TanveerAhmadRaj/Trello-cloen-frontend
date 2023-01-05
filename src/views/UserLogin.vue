<template>
  <div class="container mt-5 section">
    <div class="row mt-5">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <h4 class="bg-warning p-2">Sign In</h4>
          <div class="card-body">
            <form class="form-group" @submit.prevent="login">
              <div class="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Enter Your Email..." required/>
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Enter Your Password..." required/>
              </div>
              <div class="form-group">
                <button class="btn btn-dark form-control rounded" type="submit">
                  <i class="fa-solid fa-right-to-bracket"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      const response = await axios.post("https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/login", {
        email: this.email,
        password: this.password,
      });
      if (response.status === 201) {
        alert(response.data.message);
      } else if (response.status === 200) {
        const islogged = true;
        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("user", response.data.userWitEmail);
        this.$store.dispatch("islogged", islogged);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
