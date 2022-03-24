import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getUserInfo, logOutAction } from "../actions/authActions"
import tokenAuth from '../config/tokenAuth'


const LayoutAdmin = (props) => {
    const { children } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authorized = useSelector(state => state.auth)
    const {auth} = authorized
    const { name, foto } = authorized.user 

    const tkn = localStorage.getItem('Bearer')
    tokenAuth(tkn)

    useEffect( () => {
        if ( !auth && !tkn){
            if(tkn === null){
                navigate("/login")
            }
        }
        
        dispatch(getUserInfo())
        
        // eslint-disable-next-line
    }, [tkn])

    const logOut = () => {
        dispatch(logOutAction())
        navigate('/login')
    }
    return ( 
        <>
        <div className='flex'>
        <aside className='min-h-screen w-16 sm:w-64 shadow flex-col justify-between bg-devarana-midnight'>
            <ul className='my-12'>
                <Link to={'/admin'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Dashboard" className="fas fa-chart-line block sm:hidden"></i><p className="sm:block hidden">Dashboard</p> </li></Link>
                <hr className="py-2"/>
                <li className="text-devarana-graph text-center font-bold"> <i className="fas fa-cogs block sm:hidden"></i> <p className="sm:block hidden">Administración</p> </li>
                <Link to={'/admin/viviendas'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Vivienda" className="fas fa-building block sm:hidden"></i><p className="sm:block hidden">Vivienda</p> </li></Link>
                <Link to={'/admin/listado'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Listado" className="fa-solid fa-list block sm:hidden"></i><p className="sm:block hidden">Elementos a Evaluar</p> </li></Link>
                <Link to={'/admin/seccion'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Seccion" className="fa-regular fa-puzzle block sm:hidden"></i><p className="sm:block hidden">Zonas</p> </li></Link>
                <Link to={'/admin/usuarios'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Seccion" className="fa-regular fa-puzzle block sm:hidden"></i><p className="sm:block hidden">Usuarios</p> </li></Link>
                <Link to={'/admin/desarrollos'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Seccion" className="fa-regular fa-puzzle block sm:hidden"></i><p className="sm:block hidden">Desarrollos</p> </li></Link>
                <Link to={'/admin/calendario'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Seccion" className="fa-regular fa-puzzle block sm:hidden"></i><p className="sm:block hidden">Calendario</p> </li></Link>
                {/* <Link to={'/admin/roles'}><li className='text-white font-bold py-4 sm:py-2 text-center shadow hover:bg-devarana-graph'><i title="Seccion" className="fa-regular fa-puzzle block sm:hidden"></i><p className="sm:block hidden">Roles</p> </li></Link> */}
                <hr className="py-2"/>
            </ul>
        </aside>
            <div className="w-full bg-gray-200">
                <nav className='bg-white py-3 px-2 flex shadow w-full '>
                    <img alt="userImage" className='my-auto ml-auto rounded-full h-[35px] w-[35px]' src={`${process.env.REACT_APP_URL}/picture/${foto === null ? "notFound" : foto }`}></img>
                    <span className='mx-3 my-auto text-devarana-midnight font-bold uppercase inline-flex '>  { name }  </span>
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