import UserProfile from "views/UserProfile/UserProfile";
import Signup from "views/Signup/Signup";


const dashboardSuperRoutes = [
    {
        path: "/user",
        name: "Perfil",
        icon: "pe-7s-user",
        component: UserProfile
    },
    {
        path: "/signup",
        name: "Clientes Nuevos",
        icon: "pe-7s-note2",
        component: Signup
    },
    ,
    { redirect: true, path: "/", to: "/login", name: "Cursos" }
];

export default dashboardSuperRoutes;