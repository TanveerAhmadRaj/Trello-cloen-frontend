<template>
  <div class="container mt-5">
    <div class="todo">
      <div></div>
      <div class="bg-dark p-5 rounded shadow">
        <h1>Title: {{ todo.title }}</h1>
        <span>Created At: {{ todo.createdAt }}</span>
        <p>Description: {{ todo.description }}</p>
      </div>
      <div></div>
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
        createdAt: "",
      },
    };
  },
  async mounted() {
    const result = await axios.get(`https://app-dbd3cbd7-f92a-43ea-888c-15444348dd64.cleverapps.io/users/${this.$route.params.id}`);
    this.todo = result.data;
  },
};
</script>

<style lang="css" scoped>
.todo {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  margin-top: 9rem;
  text-align: center;
  color: #fff;
  column-gap: 2rem;
}
</style>
