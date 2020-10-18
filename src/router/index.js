import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import Home from "../views/Home";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Weather from "../views/Weather";
import Maps from "../views/Map";
import Location from "../views/Location";
import Routes from "../views/Routes";
import Webcams from "../views/Webcams";
import Photos from "../views/Photos";
import Chat from "../views/Chat";

import ChangePassword from "../views/ChangePassword";
import ForgotPassword from "../views/ForgotPassword";

// Users
import Users from "../views/Users";
import AddUser from "../views/users/Add";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Happy Ski Friends",
    component: Home,
    meta: {
      requiresAuth: true
    }
    // beforeEnter: (to, from, next) => {
    //     if (!firebase.apps.length) {
    //         setTimeout(() => {
    //             if (firebase.auth().currentUser) {
    //                 next();
    //             } else {
    //                 next("/login");
    //             }
    //         }, 1000);
    //     } else {
    //         if (firebase.auth().currentUser) {
    //             next();
    //         } else {
    //             next("/login");
    //         }
    //     }
    // }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/map",
    name: "Map",
    component: Maps,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/location",
    name: "Location",
    component: Location,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/routes",
    name: "Routes",
    component: Routes,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/webcams",
    name: "Webcams",
    component: Webcams,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/photos",
    name: "Photos",
    component: Photos,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/changepassword",
    name: "Change Password",
    component: ChangePassword,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/forgotpassword",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: {
      requiresAuth: true
    }
  },
  // Users
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/add",
    name: "Add user",
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Check if your logged in
  if (requiresAuth && !await store.dispatch('getCurrentUser')) {
    next('login');
  } else {
    next();
  }
});

export default router;
