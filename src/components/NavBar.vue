<template>
  <nav class="navbar navbar-expand-lg nav-bg mb-5">
    <div class="container">
      <router-link class="navbar-brand text-white" to="/"
        >Trello Clone</router-link
      >
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="islogged">
          <router-link :to="{ name: 'home' }" class="nav-link text-white"
            >Home</router-link
          >
        </li>
        <li class="nav-item" v-if="!islogged">
          <router-link :to="{ name: 'login' }" class="nav-link text-white"
            >Login</router-link
          >
        </li>
        <li class="nav-item" v-if="!islogged">
          <router-link :to="{ name: 'register' }" class="nav-link text-white"
            >Register</router-link
          >
        </li>
        <li class="nav-item" v-if="islogged">
          <button class="btn btn-danger" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["islogged"]) },
  methods: {
    logout() {
      const islogged = false;
      localStorage.removeItem("token");
      this.$store.dispatch("user", null);
      this.$store.dispatch("islogged", islogged);
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped>
.nav-bg {
  background: linear-gradient(120deg, #111136 0%, #052a4e 100%);
}
.section {
  position: relative;
  top: 80rem;
}
</style>
