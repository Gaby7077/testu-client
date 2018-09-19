import UserProfile from "views/UserProfile/UserProfile";
import Curso from "views/Cursos/Curso";
import Material from "views/Material/Material"
import Pregunta from "views/Preguntas/Pregunta"
import Usuarios from "views/Usuarios/Usuarios"
import Calificaciones from "views/Calificaciones/Calificaciones"



const dashboardAdminRoutes = [
  {
    path: "/user",
    name: "Perfil",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path:"/usuarios",
    name: "Crear Usuarios",
    icon:"pe-7s-add-user",
    component: Usuarios
  },
  {
    path: "/cursos",
    name: "Cursos",
    icon: "pe-7s-display2",
    component: Curso
  },
  {
    path:"/material",
    name: "Material",
    icon: "pe-7s-portfolio",
    component: Material
  },
  {
    path:"/pregunta",
    name: "Crear Preguntas",
    icon: "pe-7s-note",
    component: Pregunta
  },
  {
    path:"/calificaciones",
    name: "Calificaciones",
    icon:"pe-7s-graph2",
    component: Calificaciones
  },
 
  { redirect: true, path: "/", to: "/login", name: "Cursos" }
];

export default dashboardAdminRoutes;