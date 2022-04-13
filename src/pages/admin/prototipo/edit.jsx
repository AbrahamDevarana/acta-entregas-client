import Input from '../../../components/input'
import Dropzone from "../../../components/dropzone";
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editPrototipoAction, setRelacionAction, updatePrototipoAction } from '../../../actions/prototipoActions';
import { useEffect, useMemo, useState } from 'react';
import { getZonasAction } from '../../../actions/zonaActions';


import { ReactSVG } from 'react-svg'
import { getDesarrollosAction } from '../../../actions/desarrolloActions';

const AdminPrototipoEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.prototipo.errors )
    const editPrototipo = useSelector( state => state.prototipo.edit)
    const loading = useSelector( state => state.prototipo.loading)
    const redirect = useSelector( state => state.prototipo.redirectTo)
    const zona = useSelector ( state => state.zona.zona)
    const desarrollos = useSelector( state => state.desarrollo.desarrollo)
    const loadingDesarrollos = useSelector( state => state.desarrollo.loading)
    const [foto, setFoto] = useState(false)
    
    if(redirect){
        navigate(redirect)
    }
    const [prototipo, setPrototipo ] = useState({
        descripcion: '',
        plano: [],
        id: '',
        nombre: '',
    })

    const [planoList, setPlano]  = useState([])
    const [change, setChange] = useState(false)
    
    // State para asignar Prototipos a Etapa
    const [asignarDesarrollo, setAsignarDesarrollo] = useState({
        id: '',
        desarrolloNuevo: []
    })
       
    const { nombre, id, zonas, desarrollo } = prototipo
    const { desarrolloNuevo } = asignarDesarrollo

    useEffect( () => {
        if(!editPrototipo){
            dispatch(editPrototipoAction(params.id))
        }
        setPrototipo(editPrototipo)
        dispatch(getZonasAction())
        dispatch(getDesarrollosAction()) 
        // eslint-disable-next-line 
    }, [editPrototipo])


    useMemo(() => {
        setAsignarDesarrollo({
            ...asignarDesarrollo,
            id:id,
            desarrolloNuevo: desarrollo ? desarrollo.map( item => item.id) : []
        })
    }, [prototipo])

    const handleChange = e => {
        setPrototipo({
            ...prototipo,  
            [e.target.name]:e.target.value
        })
    }

    useEffect(() => {
        if(change){
            handleUpdate()
        }
        setChange(false)
        
    }, [change]);

    const handleCheck = (e) => {        
        const { value, checked } = e.target;
        const { desarrolloNuevo } = asignarDesarrollo;
 
        // Case 1: The user checks the box
        if (checked) {
            setAsignarDesarrollo({
                ...asignarDesarrollo,
                desarrolloNuevo: [...desarrolloNuevo, Number(value)],
            });

        }
        // Case 2: The user unchecks the box
        else {
            setAsignarDesarrollo({
                ...asignarDesarrollo,
                desarrolloNuevo:desarrolloNuevo.filter((e) => e !== Number(value)),
            });
        }
        setChange(true)
    }    

    const calcularPrototipo = () =>{
        const svgObject = document.querySelectorAll(".st0")
        if(svgObject && svgObject.length > 0 && planoList.length === 0){
            svgObject.forEach(  item => {
                planoList.push(Number(item.id.slice(2)))
            })    
            setPrototipo({
                ...prototipo,
                plano: planoList
            })
        } 
    }

    const handleSubmit = e => {
        e.preventDefault()
        if( nombre.trim() === '' ){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }
        const form = new FormData()
        form.append("foto", foto)
        dispatch(hideAlertAction())
        dispatch(updatePrototipoAction(prototipo, form))
    }

    const handleUpdate = () => {   
        dispatch(setRelacionAction(asignarDesarrollo))
    }

    const verificarZonas = () => {
        zonas.forEach( item => {
            const zone = document.getElementById(`v-${item.id}`)
            if(zone){
                zone.classList.add("bg-green-400")
                zone.innerHTML = "Guardado"
            }
        })
    }

    if(loading) return <Spinner/>

    return ( 
    <>
    <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-2xl text-center font-bold uppercase py-4 text-devarana-midnight'>Prototipo: {nombre}</h1>
        <ErrorDisplay alert={alert} errors={errors} />
        <Button className={"bg-devarana-graph text-white mb-4 block uppercase"} onClick={ () => navigate(-1)}> Volver </Button>

        <form action="" onSubmit={handleSubmit}>
            <div className='py-2'>
                <label htmlFor="" className='text-devarana-midnight'>Nombre del prototipo</label>    
                <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="nombre" onChange={handleChange} value={nombre}></Input>
            </div>
            <table className="w-full table-auto">
                        <thead className="bg-devarana-graph bg-opacity-20">
                            <tr>
                                <th className="py-2">Nombre </th>
                                {/* <th>Ver</th> */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            loadingDesarrollos?
                            <tr>
                                <td colSpan={3}><Spinner/></td>
                            </tr>
                            :                        
                            desarrollos.map( (item, i) => (
                                <tr key={i} className="text-center">
                                    <td className="py-2"> {item.descripcion} </td>
                                    {/* <td>{(desarrolloNuevo.filter( element => item.id === element).length > 0)? <span className="px-2"><Button onClick={() => navigate(`/admin/desarrollo/edit/${item.id}`) } className="border-0"><BsEyeFill/></Button></span>:null}</td> */}
                                    <td className="text-lg text-devarana-midnight inline-flex">
                                        <label className="relative flex justify-between items-center group p-2 text-xl">
                                            <input type="checkbox" onChange={handleCheck} value={item.id} checked={( desarrolloNuevo.filter( element => item.id === element).length > 0 )} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer" />
                                            <span className="cursor-pointer w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                                        </label>
                                    </td>
                                </tr>
                            ) ) 
                        }
                        </tbody>
                    </table>

           

            <div className="py-2">
                <label htmlFor="" className='text-devarana-midnight'>Planos</label>    
                <Dropzone setFoto={setFoto} thumbS="w-full border border-devarana-pink" />
            </div>
            <div id="preview">
                { prototipo && prototipo.id !== '' ? 
                    <ReactSVG 
                        src={`${process.env.REACT_APP_URL}/obtenerPlano/${prototipo.id}`}
                        afterInjection={(err, svg) => {calcularPrototipo(); verificarZonas(); }}
                        loading={() => <Spinner/> }
                    />
                    
                    // <ObtenerImage urlImage={`obtenerPlano/${prototipo.id}`}/>
                : null }
            </div>

            <Button type="submit" className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
            <div className="py-2">
                <h2 className='text-center text-devarana-midnight uppercase py-4'> Relación Planos - Zonas Identificados</h2>
                {
                    zona && zona.length > 0 && planoList.length > 0 && planoList ?
                        zona.map( (item, i) => (
                            planoList.includes(item.id)?
                                <p key={i} id={item.id}>{item.descripcion} <span id={`v-${item.id}`} className='text-sm px-2 rounded-md bg-red-500 text-devarana-pearl'>No Guardado</span></p>
                            : 
                                null
                            ) )
                            : null
                }
                <p>Total: {planoList? planoList.length : 0} </p>
            </div>
        </form>
    </div>
    </>
    );
}
 
export default AdminPrototipoEdit;