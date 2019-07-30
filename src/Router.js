import VueRouter from "vue-router";
import RoutedPage from "./components/RoutedPage";
import LivePosts from "./config/LivePosts.js";
import store from "./Store";
const [firstPostObject] = LivePosts;
const { file: firstPostFileName } = firstPostObject;

const routes = [
  {
    path: "/page/:pageName",
    component: RoutedPage
  },
  {
    path: "*",
    redirect: `/page/${firstPostFileName}`
  }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

router.afterEach((to, from) => {
  // eslint-disable-next-line
  console.log("afterEach", to, from);
  store.dispatch("setPage", to.params.pageName);
});

export default router;
