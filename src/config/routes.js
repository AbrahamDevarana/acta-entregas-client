import Layout from '../layouts/app'
import Home from '../pages/home'
import Login from '../pages/auth/Login'
import LayoutLogin from '../layouts/auth'

const routesAdmin = [
        {
            path: "/",
            layout: Layout,
            component: Home,
        },
    ]

const routesClient = [
    {
        path: "/login",
        layout: LayoutLogin,
        component: Login,
    },
]

const routes = [...routesAdmin, ...routesClient]


export default routes