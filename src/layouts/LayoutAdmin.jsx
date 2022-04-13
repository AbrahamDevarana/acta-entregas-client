import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getUserInfo, logOutAction } from "../actions/authActions"
import tokenAuth from '../config/tokenAuth'
import logo from "../assets/static/img/DEVARANAlogo.svg"
import isotipo from "../assets/static/img/IsotipoDEVARANA.svg"
import {BiBuildingHouse} from "react-icons/bi"
import {BsBuilding, BsCardChecklist, BsCalendarWeek} from 'react-icons/bs'
import {AiOutlineUsergroupAdd, AiOutlineDown} from 'react-icons/ai'
import {SiProtonvpn} from 'react-icons/si'

const LayoutAdmin = (props) => {
    const { children } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authorized = useSelector(state => state.auth)
    const {auth} = authorized
    const { name, id } = authorized.user 

    const [acordeon, setAcordeon ] = useState(true)

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
            <a href="/"> <img src={logo} alt=""  className="w-full fill-devarana-pearl p-3"/> </a>
            <ul className='px-5'>
                <Link to={'/admin'}><li className='list-menu'> <img src={isotipo} alt="Devarana" className="w-7 mx-2" /> Dashboard </li></Link>
                <hr className="py-2"/>

                <li className="list-menu font-extralight"> <i className="fas fa-cogs block sm:hidden"></i> <p className="sm:block hidden">Operación</p> </li>
                <Link to={'/admin/calendario'}><li className='list-menu'><span className="text-2xl px-2"> <BsCalendarWeek/></span> <p>Calendario</p> </li></Link>
                <li className="list-menu font-extralight"> <i className="fas fa-cogs block sm:hidden"></i> <p className="sm:block hidden">Administración</p> </li>
                <Link to={'/admin/desarrollos'}><li className='list-menu'> <span className="text-2xl px-2"><BsBuilding/></span> <p className="mr-auto">Desarrollos</p> <button className={`hover:scale-110 transition-all ease-in-out duration-200 rounded px-2 py-1 ${acordeon? 'rotate-180' : ''}`} onClick={() => setAcordeon(!acordeon)}><AiOutlineDown/></button> </li></Link>
                <ul className={`pl-5 overflow-hidden ${!acordeon? 'h-0' : 'h-auto'}`}>
                    <Link to={'/admin/prototipo'}> <li className={`list-menu transition-all ease-in-out duration-400 ${ acordeon ? 'visible' : 'invisible -translate-y-8'} `}> <span className="text-2xl px-2"><SiProtonvpn/></span> Prototipos</li> </Link>
                </ul>
                <Link to={'/admin/residencias'}><li className='list-menu'> <span className="text-2xl px-2"> <BiBuildingHouse/></span> <p>Residencias</p> </li></Link>
                <Link to={'/admin/listado'}><li className='list-menu'> <span className="text-2xl px-2"> <BsCardChecklist/></span> <p>Elementos</p> </li></Link>
                <Link to={'/admin/usuarios'}><li className='list-menu'> <span className="text-2xl px-2"> <AiOutlineUsergroupAdd/></span> <p>Usuarios</p> </li></Link> 
                <Link to={'/admin/zona'}><li className='list-menu'><p>Zonas</p> </li></Link>
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