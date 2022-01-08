import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route } from "vue-router";
import { ItemView, UserView } from "../views/index";
import createListView from "../views/CreateListView";
import bus from "../utils/bus";
import store from "../store/index";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/news",
    },
    {
      path: "/news",
      name: "news",
      component: createListView("NewsView"),
      async beforeEnter(
        routeTo: Route,
        routeFrom: Route,
        next: NavigationGuardNext<Vue>
      ) {
        bus.$emit("on:progress");
        next();
        // try {
        //   await store.dispatch("FETCH_LIST", routeTo.name)
        //   next();
        // } catch (error) {
        //    console.error(error);
        // }
      },
    },
    {
      path: "/ask",
      name: "ask",
      component: createListView("AskView"),
      async beforeEnter(
        routeTo: Route,
        routeFrom: Route,
        next: NavigationGuardNext<Vue>
      ) {
        try {
          bus.$emit("on:progress");
          await store.dispatch("FETCH_LIST", routeTo.name);
          next();
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      path: "/jobs",
      name: "jobs",
      component: createListView("JobsView"),
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        store
          .dispatch("FETCH_LIST", routeTo.name)
          .then(() => next())
          .catch(() => new Error("failed to fetch news items"));
      },
    },
    {
      path: "/item/:id",
      component: ItemView,
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        const itemId = routeTo.params.id;
        store
          .dispatch("FETCH_ITEM", itemId)
          .then(() => next())
          .catch((err) => new Error("failed to fetch item details"));
      },
    },
    {
      path: "/user/:id",
      component: UserView,
      beforeEnter(routeTo, routeFrom, next) {
        bus.$emit("on:progress");
        const itemId = routeTo.params.id;
        store
          .dispatch("FETCH_USER", itemId)
          .then(() => next())
          .catch((err) => new Error("failed to fetch user profile"));
      },
    },
  ],
});
