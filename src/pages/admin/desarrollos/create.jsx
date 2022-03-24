import Input from '../../../components/input'
import Button from '../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createNewDesarrolloAction } from '../../../actions/desarrolloActions';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../../../components/errors';

import Dropzone from '../../../components/dropzone';


const AdminDesarrolloCreate = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.desarrollo.errors)
    const redirect = useSelector( state => state.desarrollo.redirectTo)

    if(redirect){
        navigate(redirect)
    }

    const [desarrollo, setDesarrollo ] = useState({
        descripcion: '',
        prototipos: []
    })

    const { descripcion, prototipos } = desarrollo

    const handleChange = e => {
        setDesarrollo({
            ...desarrollo,
            [e.target.name]:e.target.value
        })
    }

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
        dispatch(createNewDesarrolloAction(desarrollo))
    }

    return ( 
        <>
            <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
                <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Nuevo Desarrollo</h1>
                <ErrorDisplay alert={alert} errors={errors} />

                <form action="" onSubmit={handleSubmit}>
                    <div className='py-2'>
                        <Dropzone/>
                    </div>
                    <label htmlFor="" className='text-devarana-midnight'>Nombre de Desarrollo</label>    
                    <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
                    <div>
                            { prototipos.length > 0? 
                            <div>
                                 <h2>Prototipos</h2>
                                <ul>
                                    {
                                        prototipos.map( (item, i) => {
                                            <li key={i}>{item.descripcion}</li>
                                        } )
                                    }
                                </ul>
                            </div>
                            :
                            <p>No hay prototipos designados</p>
                            }
                    </div>
                    <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
                </form>
            </div>
        </>
     );
}
 
export default AdminDesarrolloCreate;