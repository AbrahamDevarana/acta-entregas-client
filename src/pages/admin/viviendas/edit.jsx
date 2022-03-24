// import Input from '../../../components/input'
// import Select from '../../../components/select'
import Button from '../../../components/button';
import ErrorDisplay from '../../../components/errors';

// import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import {AiOutlinePlusCircle} from 'react-icons/ai'


import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editViviendaAction} from '../../../actions/viviendaActions';
import { useEffect, useState } from 'react';
import { getListadosAction } from '../../../actions/listadoActions';
import Spinner from '../../../components/spinner';


const AdminViviendasEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.vivienda.errors )
    const editVivienda = useSelector( state => state.vivienda.edit)
    const redirect = useSelector( state => state.vivienda.redirectTo)
    const listadoDisponible = useSelector ( state => state.listado.listado)

    const loadingvivienda = useSelector( state => state.vivienda.loading)
    const loadinglistado = useSelector ( state => state.listado.loading)


    if(redirect){
        navigate(redirect)
    }    

    const [vivienda, setVivienda ] = useState({
        id: '',
    })

    const [asignacion, setAsignacion] = useState({
        statusAsignacion: false,
        zona: "",
        seccion_id: null,
        vivienda_id: null
    })

    const {statusAsignacion, zona} = asignacion

    useEffect( () => {
        if(!editVivienda){
            dispatch(editViviendaAction(params.id))
        }
        setAsignacion({
            ...asignacion,
            vivienda_id:editVivienda.id,
            
        })
    }, [editVivienda])

    const handleCheck = (e) => {        
        // Destructuring
        const { value, checked } = e.target;
        const { listado } = vivienda;

        // Case 1 : The user checks the box
        if (checked) {
            setVivienda({
                ...vivienda,
                listado: [...listado, value],
            });
        }
        // Case 2  : The user unchecks the box
        else {
            setVivienda({
                ...vivienda,
                listado: listado.filter((e) => e !== value),
            });
        }
    };

    const handleAsignacion = (e, descripcion, id) => {
        e.preventDefault()
        const idSeccionSeleccionada = e.target.dataset.id
        
       if(!listadoDisponible || listadoDisponible.length === 0 ){
            dispatch(getListadosAction())
       }

            setAsignacion({
                ...asignacion,
                statusAsignacion: true,
                zona: descripcion,
                seccion_id: id,
                
            })

    }

    const { listado:listado_vivienda, secciones:secciones_vivienda } = editVivienda

    if(loadingvivienda) return <Spinner/>

    return ( 
    <>
        <div className='grid grid-cols-12'>
            <div className={`gap-x-10 transition-all duration-500 ease-in-out col-span-10 m-auto w-full px-5 py-10 ${ !statusAsignacion? "col-start-2" : null }`}>
                <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Vivienda</h1>
                <ErrorDisplay alert={alert} errors={errors} />

                <form action="">
                    <div className='grid grid-cols-3'>
                    { secciones_vivienda && secciones_vivienda.length > 0 ? 
                        secciones_vivienda.map( (item, i) => (
                            <div key={i} className="col-span-1" >
                                <h1 id={`btnSelected-${item.id}`} className="font-bold text-lg pt-4 font-mulish btnSelection">{ item.descripcion } <Button type="button" data-id={item.id} className="border-0 hover:text-devarana-pink" onClick={(e) => handleAsignacion(e, item.descripcion, item.id)}> <AiOutlinePlusCircle data-id={item.id} /> </Button> </h1>
                                <div> 
                                </div>
                            </div>
                        ) )
                        
                        : 

                        null
                
                    }
                    </div>
                </form>
            </div>
            {
                statusAsignacion ?
                    <div className='col-span-2 py-10 m-auto'>
                        <div className='overflow-y-scroll max-h-96'>
                            <h1 className='text-center py-2 font-mulish font-bold'> {zona ? zona : null } </h1>
                            <ul>
                            { loadinglistado || !listadoDisponible ? <Spinner/> : 
                                
                                listadoDisponible && listadoDisponible.length> 0 ? 
                                listadoDisponible.map(( item, index) => (
                                    <div key={index} className="py-1">
                                        <input type="checkbox" id={`chkListado${item.id}`} value={item.id} name="lista" className='rounded-md shadow-md my-1 mx-2'/>
                                        <label htmlFor={`chkListado${item.id}`} className='cursor-pointer'>{item.descripcion} </label>
                                    </div>
                                ))
                                : 
                                null
                            
                            }

                            </ul>
                        </div>
                        <div className='pt-4'>
                            <Button className="block m-auto border-devarana-midnight"> Agregar Seleccionados</Button>
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
 
export default AdminViviendasEdit;