<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <h4 class="mb-5 bg-dark p-2 text-white rounded">Update Task</h4>
        <form class="form-group" @submit.prevent="update">
          <div class="form-group">
            <label>Title: </label>
            <input
              type="text"
              v-model="todo.title"
              placeholder="Enter Title"
              class="form-control" />
          </div>
          <div class="form-group mb-4">
            <label>Description: </label>
            <textarea
              rows="5"
              type="text"
              v-model="todo.description"
              placeholder="Enter Discription"
              class="form-control"></textarea>
          </div>
          <button type="submit" class="btn btn-warning btn-block">
            Update
          </button>
        </form>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      todo: {
        title: "",
        description: "",
        todoState: "",
        user_id: "",
      },
    };
  },
  async mounted() {
    const result = await axios.get(`${this.$route.params.id}`);
    this.todo = result.data;
  },

  methods: {
    async update() {
      let id = this.$route.params.id
      const response = await axios.put(`https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/${id}`, {
        title: this.todo.title,
        description: this.todo.description,
        todoState: this.todo.todoState,
        index: this.todo.index,
        user_id: this.user_id,
      });
      if (response.status === 200) {
        //this.$store.dispatch("getTodos");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
