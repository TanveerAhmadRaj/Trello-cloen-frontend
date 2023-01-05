<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <h4 class="mb-5 bg-dark p-2 text-white rounded">Add New Task</h4>
        <form class="form-group" @submit.prevent="add">
          <div class="form-group">
            <label>Title: </label>
            <input
              type="text"
              v-model="title"
              placeholder="Enter Title"
              class="form-control" />
          </div>
          <div class="form-group mb-4">
            <label>Description: </label>
            <textarea
              rows="5"
              type="text"
              v-model="description"
              placeholder="Enter Discription"
              class="form-control"></textarea>
          </div>
          <button type="submit" class="btn btn-warning btn-block">Add</button>
        </form>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return { title: "", description: "" };
  },

  computed: {
    ...mapGetters(["user", "start"]),
  },
  methods: {
    async add() {
      const response = await axios.post("https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/add", {
        title: this.title,
        description: this.description,
        todoState: "start",
        index: this.start.length,
        user_id: this.user.id,
      });

      if (response.status === 200) {
        this.$router.push("/");
        // this.$store.dispatch("getTodos");
        alert("Task Added Successfully");
      } else
        (err) => {
          console.log(err);
        };
    },
  },
};
</script>

<style lang="css" scoped></style>
