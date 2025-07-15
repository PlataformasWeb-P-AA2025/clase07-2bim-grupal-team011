import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import EstudiantesList from "../views/EstudiantesList.vue";
import EstudianteDetail from "../views/EstudianteDetail.vue";
import EditarEstudiante from "../views/EditarEstudiante.vue";
import EliminarEstudiante from "../views/EliminarEstudiante.vue";
import CrearEstudiante from "../views/CrearEstudiante.vue";
import CrearTelefono from "../views/CrearTelefono.vue";
import EditarTelefono from "../views/EditarTelefono.vue";
import EliminarTelefono from "../views/EliminarTelefono.vue";

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
    path: "/estudiantes/detail/:estudianteId",
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
  // Aquí el cambio: permitir opcionalmente pasar el estudianteId
  {
    path: "/telefonos/nuevo/:estudianteId",
    name: "CrearTelefono",
    component: CrearTelefono,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/telefonos/editar/:telefonoId",
    name: "EditarTelefono",
    component: EditarTelefono,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/telefonos/eliminar/:telefonoId",
    name: "EliminarTelefono",
    component: EliminarTelefono,
    props: true,
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
