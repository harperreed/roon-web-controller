import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [

    {
      path: "/",
      name: "Controller",
      component: () => import("@/layouts/Controller.vue"),
      children: [
        {
          path: "library",
          name: "Library",
          component: () => import("@/views/Library.vue"),
        },
        {
          path: "now_playing",
          name: "NowPlaying",
          component: () => import("@/views/NowPlaying.vue"),
        },
        {
          path: "queue",
          name: "Queue",
          component: () => import("@/views/Queue.vue"),
        },
      ],
    },
  ],
});

export default router;
