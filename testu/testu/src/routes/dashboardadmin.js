import UserProfile from "views/UserProfile/UserProfile";
import Curso from "views/Cursos/Curso";
import Material from "views/Material/Material"



const dashboardAdminRoutes = [
  {
    path: "/user",
    name: "Perfil",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/cursos",
    name: "Cursos",
    icon: "pe-7s-albums",
    component: Curso
  },
  {
    path:"/material",
    name: "Material",
    icon: "pe-7s-albums",
    component: Material
  },
 
  { redirect: true, path: "/", to: "/login", name: "Cursos" }
];

export default dashboardAdminRoutes;