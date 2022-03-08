import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getUserInfo, logOutAction } from "../actions/authActions"

const LayoutAdmin = (props) => {
    const { children } = props

    const dispatch = useDispatch()
    const authorized = useSelector(state => state.auth)
    const {auth,  loading, token} = authorized
    const { name, email } = authorized.user 

    const navigate = useNavigate()

    useEffect( () => {
        dispatch(getUserInfo())
        // eslint-disable-next-line
    }, [])
     
    if (!auth && !loading){
        navigate("/login")
    }
    const logOut = () => {
        dispatch(logOutAction())
    }
    return ( 
        <>
        <div className='flex'>
        <aside className='min-h-screen w-16 sm:w-64 shadow flex-col justify-between bg-devarana-midnight'>
            <ul className='my-12'>
                <Link to={'/admin'}><li className='text-white font-bold py-4 sm:py-2 text-center uppercase shadow hover:bg-devarana-graph'><i title="Dashboard" className="fas fa-chart-line block sm:hidden"></i><p className="sm:block hidden">Dashboard</p> </li></Link>
                <hr className="py-2"/>
                <li className="text-devarana-graph text-center uppercase font-bold"> <i className="fas fa-cogs block sm:hidden"></i> <p className="sm:block hidden">Administración</p> </li>
                <Link to={'/admin/departamentos'}><li className='text-white font-bold py-4 sm:py-2 text-center uppercase shadow hover:bg-devarana-graph'><i title="Departamentos" className="fas fa-building block sm:hidden"></i><p className="sm:block hidden">Departamentos</p> </li></Link>
                <Link to={'/admin/listado'}><li className='text-white font-bold py-4 sm:py-2 text-center uppercase shadow hover:bg-devarana-graph'><i title="Listado" className="fa-solid fa-list block sm:hidden"></i><p className="sm:block hidden">Listado</p> </li></Link>
                <Link to={'/admin/seccion'}><li className='text-white font-bold py-4 sm:py-2 text-center uppercase shadow hover:bg-devarana-graph'><i title="Seccion" className="fa-regular fa-puzzle block sm:hidden"></i><p className="sm:block hidden">Secciones</p> </li></Link>
                <hr className="py-2"/>
            </ul>
        </aside>
            <div className="w-full bg-gray-200">
                <nav className='bg-white py-3 px-2 flex shadow w-full '>
                    <span className='ml-auto text-devarana-midnight font-bold uppercase'> { name } </span>
                    <button className='mx-5 text-devarana-midnight font-bold uppercase' onClick={ logOut }> Log out </button>
                </nav>
                <div className="content">
                    <div className="m-6 bg-white shadow border rounded-lg p-5">  
                        {children}
                    </div>
                </div>
            </div>
        </div>
        </> 
     );
}
 
export default LayoutAdmin;