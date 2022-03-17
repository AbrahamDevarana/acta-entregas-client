import Input from '../../../components/input'
import Select from '../../../components/select'
import Button from '../../../components/button';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editSeccionAction, updateSeccionAction } from '../../../actions/seccionActions';
import { useEffect, useState } from 'react';
import { getListadosAction } from '../../../actions/listadoActions';

const AdminSeccionEdit = () => {

    const params = useParams()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.seccion.errors )
    const editSeccion = useSelector( state => state.seccion.edit)
    const redirect = useSelector( state => state.seccion.redirectTo)
    const listado = useSelector (state => state.listado.listado)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    if(redirect){
        navigate(redirect)
    }
    

    const [seccion, setSeccion ] = useState({
        id: '',
        descripcion: '',
        lista: []
    })

    useEffect( () => {
        if(!editSeccion){
            dispatch(editSeccionAction(params.id))
        }
        setSeccion({id:editSeccion.id, descripcion : editSeccion.descripcion, lista: editSeccion.listado? editSeccion.listado.map( item => `${item.id}` ) : null })
        dispatch(getListadosAction())
    }, [editSeccion])

    const { descripcion } = seccion

    const handleChange = e => {
        setSeccion({
            ...seccion,
            [e.target.name]:e.target.value
        })
    }


    const handleCheck = (e) => {        
        // Destructuring
        const { value, checked } = e.target;
        const { lista } = seccion;

        // Case 1 : The user checks the box
        if (checked) {
            setSeccion({
                ...seccion,
                lista: [...lista, value],
            });
        }
        // Case 2  : The user unchecks the box
        else {
            setSeccion({
                ...seccion,
                lista: lista.filter((e) => e !== value),
            });
        }
    };

    const handleSubmit = e => {
        e.preventDefault()
        if( descripcion.trim() === ''){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }
        dispatch(hideAlertAction())
        dispatch(updateSeccionAction(seccion))
    }

    return ( 
    <>
    <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Sección</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-devarana-midnight'>Elemento del sección</label>    
            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
            <div className='py-4'>
                <h2 className='font-mulish font-bold text-2xl py-2'>Lista de elementos </h2> 
                <div className="grid grid-cols-3">
                    { listado && listado.length > 0 ? 
                        listado.map( (item, i) => (
                        <div key={i} className="py-1">
                            <input type="checkbox" id={`chk${item.id}`} name="lista" value={item.id} checked={seccion.lista? seccion.lista.includes( `${item.id}` ) : false } onChange={handleCheck} className='rounded-md shadow-md my-1 mx-2' />
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
 
export default AdminSeccionEdit;