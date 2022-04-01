import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getUserInfo, logOutAction } from "../actions/authActions"
import tokenAuth from '../config/tokenAuth'
import logo from "../assets/static/img/DEVARANAlogo.svg"
import isotipo from "../assets/static/img/IsotipoDEVARANA.svg"
import {BiBuildingHouse} from "react-icons/bi"
import {BsBuilding, BsCardChecklist, BsCalendarWeek} from 'react-icons/bs'
import {AiOutlineUsergroupAdd} from 'react-icons/ai'

const LayoutAdmin = (props) => {
    const { children } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authorized = useSelector(state => state.auth)
    const {auth} = authorized
    const { name, foto, id } = authorized.user 

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
        <aside className='min-h-screen w-16 sm:w-64 shadow flex-col justify-between bg-devarana-blue'>
            <a href=""> <img src={logo} alt=""  className="w-full fill-devarana-pearl p-3"/> </a>
            <ul className='px-5'>
                <Link to={'/admin'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'> <img src={isotipo} alt="Devarana" className="w-7 mx-2" /> Dashboard </li></Link>
                <hr className="py-2"/>

                <li className="text-devarana-pearl py-2 text-sm font-extralight"> <i className="fas fa-cogs block sm:hidden"></i> <p className="sm:block hidden">Operación</p> </li>
                <Link to={'/admin/calendario'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'><span className="text-2xl px-2"> <BsCalendarWeek/></span> <p>Calendario</p> </li></Link>

                <li className="text-devarana-pearl text-sm font-extralight py-2"> <i className="fas fa-cogs block sm:hidden"></i> <p className="sm:block hidden">Administración</p> </li>
                <Link to={'/admin/desarrollos'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'> <span className="text-2xl px-2"><BsBuilding/></span> <p>Desarrollos</p> </li></Link>
                <Link to={'/admin/residencias'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'> <span className="text-2xl px-2"> <BiBuildingHouse/></span> <p>Residencias</p> </li></Link>
                <Link to={'/admin/listado'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'> <span className="text-2xl px-2"> <BsCardChecklist/></span> <p>Elementos</p> </li></Link>
                <Link to={'/admin/usuarios'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'> <span className="text-2xl px-2"> <AiOutlineUsergroupAdd/></span> <p>Usuarios</p> </li></Link> 
                <Link to={'/admin/seccion'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'><p>Zonas</p> </li></Link>
                {/* <Link to={'/admin/roles'}><li className='text-devarana-pearl py-4 sm:py-2 inline-flex w-full items-center'><p>Roles</p> </li></Link> */} 
                <hr className="py-2"/>
            </ul>
        </aside>
            <div className="w-full bg-gray-200">
                <nav className='bg-white py-3 px-2 flex shadow w-full '>
                    <img alt="userImage" className='my-auto ml-auto rounded-full h-[35px] w-[35px]' src={`${process.env.REACT_APP_URL}/verFoto/${id}`}></img>
                    <span className='mx-3 my-auto text-devarana-midnight font-mulish font-semibold uppercase inline-flex '>  { name }  </span>
                    <button className='mx-5 text-devarana-midnight font-mulish font-semibold uppercase' onClick={ logOut }> Log out </button>
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