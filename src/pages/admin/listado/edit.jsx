import Input from '../../../components/input'
import Select from '../../../components/select'
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editListadoAction, updateListadoAction } from '../../../actions/listadoActions';
import { useEffect, useState } from 'react';
import { getDesarrollosAction } from '../../../actions/desarrolloActions';

const AdminListadoEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.listado.errors )
    const editListado = useSelector( state => state.listado.edit)
    const loading = useSelector( state => state.listado.loading)
    const redirect = useSelector( state => state.listado.redirectTo)
    const desarrollos = useSelector( state => state.desarrollo.desarrollo)

    if(redirect){
        navigate(redirect)
    }
    

    const [listado, setListado ] = useState({
        descripcion: '',
        desarrollo_id: '',
        tipoListado: ''
    })

    useEffect( () => {
        if(!editListado){
            dispatch(editListadoAction(params.id))
        }
        dispatch(getDesarrollosAction())
        setListado(editListado)
        // eslint-disable-next-line 
    }, [editListado])

    const { descripcion, tipoListado, desarrollo_id } = listado

    const handleChange = e => {
        setListado({
            ...listado,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if( descripcion.trim() === '' || tipoListado === '' || desarrollo_id === ''){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }
        dispatch(hideAlertAction())
        dispatch(updateListadoAction(listado))
    }

    if(loading) return <Spinner/>

    return ( 
    <>
    <div className='max-w-[600px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Listado</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-devarana-midnight'>Elemento del listado</label>    
            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
            
            <Select className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="tipoListado" onChange={handleChange} value={tipoListado}>
                <option value="">-- Seleccione un tipo -- </option>
                <option value="1">Cliente</option>
                <option value="2">Especial</option>
                <option value="3">Calidad</option>
            </Select>
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
            <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
        </form>
    </div>
    </>
    );
}
 
export default AdminListadoEdit;