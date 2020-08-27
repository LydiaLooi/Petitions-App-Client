import Home from "./Pages/Home";
import Petitions from "./Pages/Petitions";
import ViewPetition from "@/Pages/ViewPetition";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import CreatePetition from "@/Pages/CreatePetition";
import ManagePetition from "@/Pages/ManagePetition";
import ViewProfile from "@/Pages/ViewProfile";
import EditProfile from "@/Pages/EditProfile";
import PageNotFound from "@/Pages/PageNotFound";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home"
  },
  {
    path: "/petitions",
    component: Petitions,
    name: "AllPetitions"
  },
  {
    path: "/petitions/create",
    component: CreatePetition,
    name: "CreatePetition"
  },
  {
    path: "/petitions/:petitionId/manage",
    component: ManagePetition,
    name: "ManagePetition",
    props: true
  },
  {
    path: "/petitions/:petitionId",
    component: ViewPetition,
    name: "ViewPetition",
    props: true
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      notLoggedIn: true
    }
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: {
      notLoggedIn: true
    }
  },
  {
    path: "/profile/edit",
    component: EditProfile,
    name: "EditProfile"
  },
  {
    path: "/profile",
    component: ViewProfile,
    name: "ViewProfile"
  },
  {
    path: "/notfound",
    component: PageNotFound,
    name: "PageNotFound"
  },
  {
    path: "*",
    component: PageNotFound,
    name: "PathNotFound"
  }
];

export default routes;
