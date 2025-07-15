import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import EstudiantesList from "../views/EstudiantesList.vue";
import EstudianteDetail from "../views/EstudianteDetail.vue";
import EditarEstudiante from "../views/EditarEstudiante.vue";
import EliminarEstudiante from "../views/EliminarEstudiante.vue"; 
import CrearEstudiante from "../views/CrearEstudiante.vue"; 
import TelefonoList from "../views/TelefonosList.vue"; 
import CrearTelefono from "../views/CrearTelefono.vue"; 

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/estudiantes",
    name: "EstudiantesList",
    component: EstudiantesList,
    meta: { requiresAuth: true },
  },
  {
    path: "/estudiantes/detail/:estudianteUrl*",
    name: "EstudianteDetail",
    component: EstudianteDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/estudiantes/editar/:estudianteUrl*",
    name: "EditarEstudiante",
    component: EditarEstudiante,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/estudiantes/eliminar/:estudianteUrl*",
    name: "EliminarEstudiante",
    component: EliminarEstudiante,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/estudiantes/nuevo",
    name: "CrearEstudiante",
    component: CrearEstudiante,
    meta: { requiresAuth: true },
  },
  {
    path: "/telefonos",
    name: "TelefonosList",
    component: TelefonoList,
    meta: { requiresAuth: true },
  },
  {
    path: "/telefonos/crear/:estudianteId",
    name: "CrearTelefono",
    component: CrearTelefono,
    meta: { requiresAuth: true },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("authToken")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
