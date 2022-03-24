import LayoutApp from '../layouts/LayoutApp'
import Registro from '../pages/home/registro'
import Home from '../pages/home/home'
import PlanoDepartamento from '../pages/home/departamento'
import Listado from '../pages/home/listado'

import LayoutLogin from '../layouts/LayoutLogin'
import Login from '../pages/auth/Login'

import LayoutAdmin from '../layouts/LayoutAdmin'
import AdminHome from '../pages/admin'
import AdminViviendas from '../pages/admin/viviendas'
import AdminViviendasEdit from '../pages/admin/viviendas/edit'
import AdminSeccion from '../pages/admin/seccion'
import AdminListado from '../pages/admin/listado'
import AdminListadoCreate from '../pages/admin/listado/create'
import AdminListadoEdit from '../pages/admin/listado/edit'
import AdminSeccionCreate from '../pages/admin/seccion/create'
import AdminSeccionEdit from '../pages/admin/seccion/edit'
import AdminUsuario from '../pages/admin/usuarios'
import AdminUsuarioCreate from '../pages/admin/usuarios/create'
import AdminUsuarioEdit from '../pages/admin/usuarios/edit'
import AdminCalendar from '../components/calendar'
import AdminDesarrollos from '../pages/admin/desarrollos'
import AdminDesarrollosCreate from '../pages/admin/desarrollos/create'
import AdminDesarrollosEdit from '../pages/admin/desarrollos/edit'

import Error404 from '../pages/Error404'

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
        path: "/admin/viviendas",
        layout: LayoutAdmin,
        component: AdminViviendas,
    },
    {
        path: "/admin/viviendas/edit/:id",
        layout: LayoutAdmin,
        component: AdminViviendasEdit,
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
        path: "/admin/calendario",
        layout: LayoutAdmin,
        component: AdminCalendar,
    },
    {
        path: "/admin/desarrollos",
        layout: LayoutAdmin,
        component: AdminDesarrollos,
    },
    {
        path: "/admin/desarrollos/create",
        layout: LayoutAdmin,
        component: AdminDesarrollosCreate,
    },
    {
        path: "/admin/desarrollos/edit/:id",
        layout: LayoutAdmin,
        component: AdminDesarrollosEdit,
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
        component: Registro,
    },
    {
        path: "/comenzar",
        layout: LayoutApp,
        component: Home,
    },
    {
        path: "/vivienda",
        layout: LayoutApp,
        component: PlanoDepartamento,
    },
    {
        path: "/vivienda/listado",
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