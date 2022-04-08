import Input from '../../../components/input'
import Dropzone from "../../../components/dropzone";
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import Select from '../../../components/select'
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editPrototipoAction, setRelacionAction, updatePrototipoAction } from '../../../actions/prototipoActions';
import { useEffect, useState } from 'react';
import { getSeccionAction } from '../../../actions/seccionActions';


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
    const zonas = useSelector ( state => state.seccion.seccion)
    const desarrollos = useSelector( state => state.desarrollo.desarrollo)
    const activeDesarrollo = useSelector( state => state.desarrollo.edit)
    const [foto, setFoto] = useState(false)
    
    if(redirect){
        navigate(redirect)
    }
    const [prototipo, setPrototipo ] = useState({
        descripcion: '',
        plano: '',
        id: '',
        nombre: '',
        desarrollo_id: '',
    })


    const [planoList, setPlano]  = useState([])

    const { descripcion, nombre, id, desarrollo_id, secciones } = prototipo


    useEffect( () => {
        if(!editPrototipo){
            dispatch(editPrototipoAction(params.id))
        }
        setPrototipo(editPrototipo)
        dispatch(getSeccionAction(editPrototipo.desarrollo_id))
        dispatch(getDesarrollosAction()) 
        // calcularPrototipo()

        // eslint-disable-next-line 
    }, [editPrototipo])


    const handleChange = e => {
        setPrototipo({
            ...prototipo,  
            [e.target.name]:e.target.value
        })
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

    const verificarZonas = () => {

        secciones.forEach( item => {
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

            <Select className="w-full" onChange={handleChange} name="desarrollo_id" value={desarrollo_id}>
                <option value="">-- Selecciona un desarrollo --</option>
                {desarrollos && desarrollos.length > 0 ?
                    desarrollos.map((item, index) => (
                        <option key={index} value={item.id}>{item.descripcion}</option>
                    ))
                :   
                null
                }
            </Select>

           

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
                    zonas && zonas.length > 0 && planoList.length > 0 && planoList ?
                        zonas.map( (item, i) => (
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