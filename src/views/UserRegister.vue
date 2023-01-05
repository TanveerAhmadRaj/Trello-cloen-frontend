<template>
  <div class="container mt-5 section">
    <div class="row mt-5">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="card">
          <h4 class="bg-dark p-2 text-white">Sign Up</h4>
          <div class="card-body">
            <form class="form-group" @submit.prevent="register">
              <div class="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Enter Your name..." required />
              </div>
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
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const response = await axios.post("https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      if (response.status === 200) {
        this.$router.push("/login");
      } else if (response.status === 201) alert(response.data);
    },
  },
};
</script>

<style scoped></style>
