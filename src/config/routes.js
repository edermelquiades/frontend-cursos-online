// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsersDocente from "../pages/Admin/UsersDocentes";
import UserAdmin from "../pages/Admin/UsersAdmin";
// pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import LoginWeb from "../pages/Web/SignSignOut";
import Profile from "../pages/Web/Profile";
// PANEL
import Panel from "../pages/Web/PanelVideo";
import AddCourses from "../components/WebPanel/Courses/AddCourses";

// Other
import Error404 from "../pages/Error404";
import LayoutPanel from "../layouts/LayoutPanel";

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/admin/usersDocentes",
        component: AdminUsersDocente,
        exact: true,
      },
      {
        path: "/admin/usersAdmin",
        component: UserAdmin,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/panel",
    component: LayoutPanel,
    exact: false,
    routes: [
      {
        path: "/panel",
        component: Panel,
        exact: true,
      },
      {
        path: "/panel/cursos",
        component: AddCourses,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        path: "/login",
        component: LoginWeb,
        exact: true,
      },
      {
        path: "/profile/:id",
        component: Profile,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
