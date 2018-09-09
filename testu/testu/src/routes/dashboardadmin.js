import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";



const dashboardAdminRoutes = [
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
 
  { redirect: true, path: "/", to: "/login", name: "Cursos" }
];

export default dashboardAdminRoutes;