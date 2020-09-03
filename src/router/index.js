import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Activity from "../views/Activity.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/activity",
    name: "Activity",
    component: Activity
  }
];

const router = new VueRouter({
  routes
});

export default router;
