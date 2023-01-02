<template>
  <div class="container bg-color">
    <h2 class="text-bold text-danger mb-1 mr-5">
      CANBAN BOARD
      <button class="btn btn-danger">
        <router-link :to="{ path: '/task' }" class="nav-link">
          <i class="fa fa-plus text-white"></i>
        </router-link>
      </button>
    </h2>
    <div class="grid-colum">
      <div class="min-height p-2 col-bg">
        <h2 class="p-2 mb-3 text-danger">Start</h2>
        <Draggable :list="start" group="people" itemKey="id" @change="onChange">
          <template #item="{ element }">
            <div class="grid p-2 m-1 bg-white text-dark rounded">
              <span>{{ element.title }}</span>
              <router-link :to="{ path: '/todo/' + element.id }">
                <i class="fa fa-eye text-danger"></i>
              </router-link>
              <router-link :to="{ path: '/update/' + element.id }">
                <i class="fa fa-pen-to-square text-danger"></i>
              </router-link>
              <button @click="del('start', element.id)" class="btn btn-default">
                <i class="fa fa-trash text-danger"></i>
              </button>
            </div>
          </template>
        </Draggable>
      </div>
      <div class="min-height p-2 col-bg">
        <h2 class="p-2 mb-3 text-danger">Progress</h2>
        <Draggable
          :list="inProgress"
          group="people"
          item-key="id"
          @change="onChange">
          <template #item="{ element }">
            <div class="grid p-2 m-1 bg-success text-white rounded">
              <span>{{ element.title }}</span>

              <router-link :to="{ path: '/todo/' + element.id }">
                <i class="fa fa-eye text-white"></i>
              </router-link>
              <router-link :to="{ path: '/update/' + element.id }">
                <i class="fa fa-pen-to-square text-white"></i>
              </router-link>
              <button @click="del('start', element.id)" class="btn btn-default">
                <i class="fa fa-trash text-white"></i>
              </button>
            </div>
          </template>
        </Draggable>
      </div>
      <div class="min-height p-2 col-bg">
        <h2 class="p-2 mb-3 text-danger">Done</h2>
        <Draggable :list="done" group="people" item-key="id" @change="onChange">
          <template #item="{ element }">
            <div class="grid p-2 m-1 bg-warning text-white rounded">
              <span>{{ element.title }}</span>
              <router-link :to="{ path: '/todo/' + element.id }">
                <i class="fa fa-eye text-white"></i>
              </router-link>
              <router-link :to="{ path: '/update/' + element.id }">
                <i class="fa fa-pen-to-square text-white"></i>
              </router-link>
              <button @click="del('start', element.id)" class="btn btn-default">
                <i class="fa fa-trash text-white"></i>
              </button>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  components: { Draggable },

  computed: {
    ...mapGetters(["start", "inProgress", "done"]),
  },

  created() {
    this.$store.dispatch("getTodos");
  },

  methods: {
    async del(payload, id) {
      let obj = {
        id: id,
        state: payload,
      };
      await this.$store.dispatch("del", obj);
      await this.$store.dispatch("getTodos");
    },
    async onChange(e) {
      for (let i = 0; i < this.start.length; i++) {
        console.log(e);
        console.log(this.start[i].index);
        const res = await axios.put(`${this.start[i].id}`, {
          title: this.start[i].title,
          description: this.start[i].description,
          todoState: "start",
          index: i,
          user_id: this.start[i].user_id,
        });
        if (res.status === 200) {
          this.$router.push("/");
        }
      }
      for (let i = 0; i < this.inProgress.length; i++) {
        console.log(i + " " + this.inProgress[i].title);
        const res = await axios.put(`${this.inProgress[i].id}`, {
          title: this.inProgress[i].title,
          description: this.inProgress[i].description,
          todoState: "in progress",
          index: i,
          user_id: this.inProgress[i].user_id,
        });
        if (res.status === 200) {
          this.$router.push("/");
        }
      }
      for (let i = 0; i < this.done.length; i++) {
        const res = await axios.put(`${this.done[i].id}`, {
          title: this.done[i].title,
          description: this.done[i].description,
          todoState: "done",
          index: i,
          user_id: this.done[i].user_id,
        });
        if (res.status === 200) {
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style scoped>
.min-height {
  min-height: 20rem;
}
.col-bg {
  border: 0.4px solid rgb(105, 105, 105);
  box-shadow: 4px 3px 5px 0px rgb(59, 59, 59);
  border-radius: 1.2rem;
}
.bg-color {
  background-color: #ddd;
  width: 100%;
  height: 100vh;
  padding: 1.2rem;
  border-radius: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: 3fr 0.5fr 0.5fr 0.5fr;
  align-items: center;
  cursor: move;
}
.grid-colum {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 3rem;
}
.drag > template > div {
  background-color: #ff014f;
}
</style>
