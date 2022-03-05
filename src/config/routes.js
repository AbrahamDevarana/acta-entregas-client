import LayoutApp from '../layouts/LayoutApp'
import Home from '../pages/home'
import PlanoDepartamento from '../pages/home/departamento'
import LayoutLogin from '../layouts/LayoutLogin'
import Login from '../pages/auth/Login'

import LayoutAdmin from '../layouts/LayoutAdmin'
import AdminHome from '../pages/admin'
import Departamentos from '../pages/admin/departamentos'
import Listado from '../pages/home/listado'



const routesAdmin = [
    {
        path: "/admin",
        layout: LayoutAdmin,
        component: AdminHome,
    },
    {
        path: "/admin/departamentos",
        layout: LayoutAdmin,
        component: Departamentos,
    },
]

const routesAccess = [
    {
        path: "/login",
        layout: LayoutLogin,
        component: Login,
    },
]

const routesClient = [
    {
        path: "/",
        layout: LayoutApp,
        component: Home,
    },
    {
        path: "/departamento",
        layout: LayoutApp,
        component: PlanoDepartamento,
    },
    {
        path: "/departamento/listado",
        layout: LayoutApp,
        component: Listado,
    },
]

const routes = [...routesAdmin, ...routesAccess, ...routesClient]


export default routes