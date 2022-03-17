import LayoutApp from '../layouts/LayoutApp'
import Inicio from '../pages/home'
import Home from '../pages/home/home'
import PlanoDepartamento from '../pages/home/departamento'
import Listado from '../pages/home/listado'


import LayoutLogin from '../layouts/LayoutLogin'
import Login from '../pages/auth/Login'

import LayoutAdmin from '../layouts/LayoutAdmin'
import AdminHome from '../pages/admin'
import AdminDepartamentos from '../pages/admin/departamentos'
import AdminDepartamentosEdit from '../pages/admin/departamentos/edit'
import AdminSeccion from '../pages/admin/seccion'
import AdminListado from '../pages/admin/listado'
import AdminListadoCreate from '../pages/admin/listado/create'
import AdminListadoEdit from '../pages/admin/listado/edit'
import AdminSeccionCreate from '../pages/admin/seccion/create'
import AdminSeccionEdit from '../pages/admin/seccion/edit'
import AdminUsuario from '../pages/admin/usuarios'
import AdminUsuarioCreate from '../pages/admin/usuarios/create'
import AdminUsuarioEdit from '../pages/admin/usuarios/edit'


import Error404 from '../pages/Error404'
import AdminCalendar from '../components/calendar'



const routesAdmin = [
    {
        path: "/admin",
        layout: LayoutAdmin,
        component: AdminHome,
    },
    {
        path: "/admin/usuarios",
        layout: LayoutAdmin,
        component: AdminUsuario,
    },
    {
        path: "/admin/usuarios/create",
        layout: LayoutAdmin,
        component: AdminUsuarioCreate,
    },
    {
        path: "/admin/usuarios/edit/:id",
        layout: LayoutAdmin,
        component: AdminUsuarioEdit,
    },
    {
        path: "/admin/departamentos",
        layout: LayoutAdmin,
        component: AdminDepartamentos,
    },
    {
        path: "/admin/departamentos/edit/:id",
        layout: LayoutAdmin,
        component: AdminDepartamentosEdit,
    },
    {
        path: "/admin/seccion",
        layout: LayoutAdmin,
        component: AdminSeccion,
    },
    {
        path: "/admin/seccion/create",
        layout: LayoutAdmin,
        component: AdminSeccionCreate,
    },
    {
        path: "/admin/seccion/edit/:id",
        layout: LayoutAdmin,
        component: AdminSeccionEdit,
    },

    {
        path: "/admin/listado",
        layout: LayoutAdmin,
        component: AdminListado,
    },
    {
        path: "/admin/listado/create",
        layout: LayoutAdmin,
        component: AdminListadoCreate,
    },
    {
        path: "/admin/listado/edit/:id",
        layout: LayoutAdmin,
        component: AdminListadoEdit,
    },
    {
        path: "/admin/calendar",
        layout: LayoutAdmin,
        component: AdminCalendar,
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
        component: Inicio,
    },
    {
        path: "/inicio",
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


    {
        path: "*",
        layout: LayoutApp,
        component: Error404,
    },
]

const routes = [...routesAdmin, ...routesAccess, ...routesClient]


export default routes