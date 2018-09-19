import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Examenes from "views/Examenes/Examenes";


const dashboardRoutes = [
  {
    path: "/user",
    name: "Perfil",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/table",
    name: "Cursos",
    icon: "pe-7s-albums",
    component: TableList
  },
  {
    path: "/Examenes",
    name: "Examenes",
    icon: "pe-7s-note2",
    component: Examenes
  },
 
  { redirect: true, path: "/", to: "/login", name: "Cursos" }
];

export default dashboardRoutes;
