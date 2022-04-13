import Input from '../../../components/input'
import Button from '../../../components/button';
import Select from '../../../components/select';
import Spinner from '../../../components/spinner'
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editZonaAction, updateZonaAction } from '../../../actions/zonaActions';
import { useEffect, useState } from 'react';
import { getListadosAction } from '../../../actions/listadoActions';
import { getDesarrollosAction } from '../../../actions/desarrolloActions';

const AdminZonaEdit = () => {

    const params = useParams()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.zona.errors )
    const editZona = useSelector( state => state.zona.edit)
    const redirect = useSelector( state => state.zona.redirectTo)
    const listado = useSelector (state => state.listado.listado)
    const loading = useSelector (state => state.listado.loading)
    const desarrollos = useSelector( state => state.desarrollo.desarrollo)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    if(redirect){
        navigate(redirect)
    }
    

    const [zona, setZona ] = useState({
        id: '',
        descripcion: '',
        desarrollo_id: '',
        lista: []
    })

    useEffect( () => {
        if(!editZona){
            dispatch(editZonaAction(params.id))
        }
        setZona({id: editZona.id, desarrollo_id: editZona.desarrollo_id, descripcion : editZona.descripcion, lista: editZona.listado? editZona.listado.map( item => `${item.id}` ) : null })
        dispatch(getListadosAction())
        dispatch(getDesarrollosAction())
        // eslint-disable-next-line 
    }, [editZona])

    const { descripcion, desarrollo_id } = zona

    const handleChange = e => {
        setZona({
            ...zona,
            [e.target.name]:e.target.value
        })
    }


    const handleCheck = (e) => {        
        // Destructuring
        const { value, checked } = e.target;
        const { lista } = zona;

        // Case 1 : The user checks the box
        if (checked) {
            setZona({
                ...zona,
                lista: [...lista, value],
            });
        }
        // Case 2  : The user unchecks the box
        else {
            setZona({
                ...zona,
                lista: lista.filter((e) => e !== value),
            });
        }
    };

    const handleSubmit = e => {
        e.preventDefault()
        if( descripcion.trim() === '' || desarrollo_id === ''){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }
        dispatch(hideAlertAction())
        dispatch(updateZonaAction(zona))
    }

    if(loading) return <Spinner/>

    return ( 
    <>
    <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Sección</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="" onSubmit={handleSubmit}>
            <div className="py-2">
                <label htmlFor="" className='text-devarana-midnight'>Elemento del sección</label>    
                <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
            </div>
            <div className='py-2'>
                <label htmlFor="" className='text-devarana-midnight'>Desarrollo</label>    
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
            </div>
            <div className='py-4'>
                <h2 className='font-mulish font-bold text-2xl py-2'>Lista de elementos </h2> 
                <div className="grid grid-cols-3">
                    { listado && listado.length > 0 ? 
                        listado.map( (item, i) => (
                        <div key={i} className="py-1">
                            <input type="checkbox" id={`chk${item.id}`} name="lista" value={item.id} checked={zona.lista? zona.lista.includes( `${item.id}` ) : false } onChange={handleCheck} className='rounded-md shadow-md my-1 mx-2' />
                            <label htmlFor={`chk${item.id}`} className='cursor-pointer'>{item.descripcion}</label>
                        </div>
                            ) )
                        
                        : 

                        null
                
                    }
                </div>
            </div>
            <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
        </form>
    </div>
    </>
    );
}
 
export default AdminZonaEdit;