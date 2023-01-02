import CanbanBoard from "@/views/CanbanBoard.vue";
import UserLogin from "@/views/UserLogin.vue";
import UserRegister from "@/views/UserRegister.vue";
import TaskView from "@/views/TaskView.vue";
import TodoView from "@/views/TodoView.vue";
import UpdateTask from "@/views/UpdateTask.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    name: "home",
    path: "/",
    component: CanbanBoard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "task",
    path: "/task",
    component: TaskView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "update",
    path: "/update/:id",
    component: UpdateTask,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "todo",
    path: "/todo/:id",
    component: TodoView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: UserLogin,
  },
  {
    name: "register",
    path: "/register",
    component: UserRegister,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLogged) {
    next("/login");
  } else next();
});
export default router;
