import UserProfile from "views/UserProfile/UserProfile";
import Curso from "views/Cursos/Curso";



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
 
  { redirect: true, path: "/", to: "/login", name: "Cursos" }
];

export default dashboardAdminRoutes;