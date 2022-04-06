// import Input from '../../../components/input'
// import Select from '../../../components/select'
import Button from '../../../components/button';
import ErrorDisplay from '../../../components/errors';

// import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import {AiOutlinePlusCircle} from 'react-icons/ai'

import { getSeccionesAction } from '../../../actions/seccionActions'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editResidenciaAction, updateResidenciaAction} from '../../../actions/residenciaActions';
import { useEffect, useState } from 'react';
import { getListadosAction } from '../../../actions/listadoActions';
import Spinner from '../../../components/spinner';


const AdminResidenciasEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.residencia.errors )
    const editResidencia = useSelector( state => state.residencia.edit)
    const redirect = useSelector( state => state.residencia.redirectTo)
    const listadoDisponible = useSelector ( state => state.listado.listado)
    const loadingresidencia = useSelector( state => state.residencia.loading)
    const loadinglistado = useSelector ( state => state.listado.loading)


    if(redirect){
        navigate(redirect)
    }    

    const [asignacion, setAsignacion] = useState({
        statusAsignacion: false,
        zona: "",
        listado: [],
    })

    const {statusAsignacion, zona} = asignacion

    useEffect( () => {
        if(!editResidencia){
            dispatch(editResidenciaAction(params.id))
        }
        setAsignacion({
            ...asignacion,
            residencia_id:editResidencia.id,
            
        })
        dispatch(getSeccionesAction())
    }, [editResidencia])

    const handleCheck = (e) => {    

        // Destructuring
        const { value, checked } = e.target;
        const { listado } = asignacion;

        // Case 1 : The user checks the box
        if (checked) {
            setAsignacion({
                ...asignacion,
                listado: [...listado, Number(value)],
            });
        }
        // Case 2  : The user unchecks the box
        else {
            setAsignacion({
                ...asignacion,
                listado: listado.filter((e) => e !== value),
            });
        }
    };
    
    const handleAsignacion = (e, descripcion, id) => {
        e.preventDefault()
        console.log(asignacion);
        // console.log(listado_many);
       
       if(!listadoDisponible || listadoDisponible.length === 0 ){
            dispatch(getListadosAction())
       }
            setAsignacion({
                ...asignacion,
                statusAsignacion: true,
                seccion_id: id,
                zona: descripcion,
                listado: listado_many.map(item => Number(item.pivot.seccion_id) === Number(id)?  item.id : "" ) 
            })
            
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(asignacion.listado.length > 0 && asignacion.listado){
            dispatch(updateResidenciaAction(asignacion))
        }
    }

    

    const {  prototipo, folio , listado_many} = editResidencia
    

    if(loadingresidencia) return <Spinner/>

    return ( 
    <>
        <div className='grid grid-cols-12'>
            <div className={`gap-x-10 col-span-9 mx-auto w-full px-5 py-10 ${ !statusAsignacion? "col-start-3" : null }`}>
                <h1 className='font-mulish text-4xl text-center py-4 text-devarana-midnight'>Residencia: <span className='font-extralight'>{folio} | {prototipo ? prototipo.nombre : null }</span> </h1>
                <ErrorDisplay alert={alert} errors={errors} />

                    <div className='grid grid-cols-3'>
                    { prototipo && prototipo.secciones && prototipo.secciones.length > 0 ? 
                        prototipo.secciones.map( (item, i) => (
                            <div key={i} className="col-span-1" >
                                <h1 id={`btnSelected-${item.id}`} className="font-bold text-lg pt-4 font-mulish btnSelection">
                                    { item.descripcion } 
                                    <Button type="button" data-id={item.id} className="border-0 hover:text-devarana-pink" onClick={(e) => handleAsignacion(e, item.descripcion, item.id)}> <AiOutlinePlusCircle data-id={item.id} /> </Button> 
                                </h1>
                                <div> 
                                    {listado_many && listado_many.length > 0?
                                        listado_many.map( elem => (
                                            elem.pivot.seccion_id === item.id?
                                            <p>{elem.descripcion}</p>
                                            : null
                                        ))
                                        : null
                                    }
                                </div>
                            </div>
                        ) )
                        
                        : 

                        <div className='col-span-3'>
                            <h1 className='text-center text-2xl  text-devarana-pink'> Hubo un error al cargar o el plano no se ha cargado en el prototipo, favor verificar</h1>
                            <Button type="button" className="block mx-auto my-4 border-devarana-midnight" onClick={ () => navigate("/admin/residencias") }> Volver </Button>
                        </div>
                    }
                    </div>
            </div>
            {
                statusAsignacion ?
                    <div className='col-span-3 py-10 m-auto w-full'>
                        <div className='overflow-y-scroll max-h-96 '>
                            <h1 className='text-center py-2 font-mulish font-bold'> {zona ? zona : null } </h1>
                            <ul>
                            { loadinglistado || !listadoDisponible ? <Spinner/> : 
                                
                                listadoDisponible && listadoDisponible.length> 0 ? 
                                listadoDisponible.map(( item, index) => (
                                    <div key={index} className="py-1">
                                        <input type="checkbox" id={`chkListado${item.id}`} onChange={handleCheck} value={item.id} name="lista" className='rounded-md shadow-md my-1 mx-2'/>
                                        <label htmlFor={`chkListado${item.id}`} className='cursor-pointer'>{item.descripcion} </label>
                                    </div>
                                ))
                                : 
                                null
                            
                            }

                            </ul>
                        </div>
                        <div className='pt-4'>
                            <Button className="block m-auto border-devarana-midnight" onClick={ (e) => {handleSubmit(e)}}> Agregar Seleccionados</Button>
                            <Button className="block m-auto bg-devarana-pink text-devarana-pearl my-2" onClick={ () => setAsignacion({ statusAsignacion:false })}> Cancelar </Button>
                            
                        </div>
                    </div>
                    :
                    <></>
                    
            }
        </div>
    </>
    );
}
 
export default AdminResidenciasEdit;