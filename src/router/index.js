import Vue from "vue";
import VueRouter from "vue-router";

import firebase from "firebase";

import Home from "../views/Home";
import Login from "../views/Login";
import Settings from "../views/Settings";
import Weather from "../views/Weather";
import Maps from "../views/Map";
import Skibus from "../views/Skibus";
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
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
      background: 'cartoon'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      background: 'cartoon'
    }
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/map",
    name: "Map",
    component: Maps,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/bus",
    name: "Ski Bus",
    component: Skibus,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/location",
    name: "Location",
    component: Location,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/routes",
    name: "Routes",
    component: Routes,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/webcams",
    name: "Webcams",
    component: Webcams,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/photos",
    name: "Photos",
    component: Photos,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },

  {
    path: "/changepassword",
    name: "Change Password",
    component: ChangePassword,
    meta: {
      requiresAuth: true,
      background: 'cartoon'
    }
  },
  {
    path: "/forgotpassword",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: {
      requiresAuth: true,
      background: 'cartoon'
    }
  },
  // Users
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      background: 'light'
    }
  },
  {
    path: "/users/add",
    name: "Add user",
    component: AddUser,
    meta: {
      requiresAuth: true,
      background: 'light'
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
  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('login');
  } else {
    next();
  }
});

export default router;
