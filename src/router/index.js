import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Main"),
  },
  {
    path: "/sign-in",
    component: () => import("@/views/SignIn"),
  },
  {
    path: "/sign-up",
    component: () => import("@/views/SignUp"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const SIGNUP_PAGE = "/sign-up";
  const SIGNIN_PAGE = "/sign-in";

  if (!token && to.path !== SIGNUP_PAGE && to.path !== SIGNIN_PAGE) {
    return next({ path: SIGNIN_PAGE });
  }

  if (!!token && (to.path === SIGNUP_PAGE || to.path === SIGNIN_PAGE)) {
    return next({ path: "/" });
  }

  next();
});

export default router;
