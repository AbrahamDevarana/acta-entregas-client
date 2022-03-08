import Input from '../../../components/input'
import Select from '../../../components/select'
import Button from '../../../components/button';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editSeccionAction, updateSeccionAction } from '../../../actions/seccionActions';
import { useEffect, useState } from 'react';

const AdminSeccionEdit = () => {

    const params = useParams()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.seccion.errors )
    const editSeccion = useSelector( state => state.seccion.edit)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [seccion, setSeccion ] = useState({
        descripcion: '',
    })

    useEffect( () => {
        if(!editSeccion){
            dispatch(editSeccionAction(params.id))
        }
        setSeccion(editSeccion)
    }, [editSeccion])

    const { descripcion } = seccion

    const handleChange = e => {
        setSeccion({
            ...seccion,
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
        dispatch(updateSeccionAction(seccion))
        

        if( alert !== null || !errors){
            setSeccion({
                descripcion: '',
            })
            setTimeout(() => {
                navigate('/admin/seccion')
            }, 1000);
        }
    }

    return ( 
    <>
    <div className='max-w-[600px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Sección</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-devarana-midnight'>Elemento del sección</label>    
            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
            <div className='py-4'>
                <h2 className='font-mulish font-bold text-2xl py-2'>Lista de elementos </h2> 
                <div className="grid grid-cols-3">
                    <div>
                        <input type="checkbox" className='rounded-md shadow-md my-1 mx-2' />
                        <label htmlFor="" className='text-sm'>Piso porcelánico rectificado</label>
                    </div>
                    <div>
                        <input type="checkbox" className='rounded-md shadow-md my-1 mx-2'/>
                        <label htmlFor="" className='text-sm'>Ventanería premium en aluminio obscuro</label>
                    </div>
                    <div>
                        <input type="checkbox" className='rounded-md shadow-md my-1 mx-2' />
                        <label htmlFor="" className='text-sm' >Acabado de granito en cocina</label>
                    </div>
                    <div>
                        <input type="checkbox" className='rounded-md shadow-md my-1 mx-2' />
                        <label htmlFor="" className='text-sm'>Monomando tipo extraíble en cocina</label>
                    </div>
                </div>
            </div>
            <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
        </form>
    </div>
    </>
    );
}
 
export default AdminSeccionEdit;