import Input from '../../../components/input'
import Select from '../../../components/select'
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editDesarrolloAction, updateDesarrolloAction } from '../../../actions/desarrolloActions';
import { useEffect, useState } from 'react';
import Dropzone from '../../../components/dropzone';


const AdminDesarrolloEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.desarrollo.errors )
    const editDesarrollo = useSelector( state => state.desarrollo.edit)
    const loading = useSelector( state => state.desarrollo.loading)
    const redirect = useSelector( state => state.desarrollo.redirectTo)

    if(redirect){
        navigate(redirect)
    }
  

    const [desarrollo, setDesarrollo ] = useState({
        descripcion: '',
        prototipos: [],
        nuevoPrototipo: []
    })

    useEffect( () => {
        if(!editDesarrollo){
            dispatch(editDesarrolloAction(params.id))
        }
        setDesarrollo(editDesarrollo)
        // eslint-disable-next-line 
    }, [editDesarrollo])

    const { descripcion, prototipos, nuevoPrototipo } = desarrollo

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
        dispatch(updateDesarrolloAction(desarrollo))
    }

    const agregarPrototipo = e => {
        const newProto = document.getElementById("prototipo").value
        e.preventDefault()
        setDesarrollo({
            ...desarrollo,
            prototipos: [...prototipos, {nombre: newProto}],
            nuevoPrototipo: [newProto]
        })

        console.log(prototipos);
    }

 

    if(loading) return <Spinner/>

    return ( 
    <>
    <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Desarrollo</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="" onSubmit={handleSubmit}>
            <div className='py-2'>
                <Dropzone/>
            </div>
            <label htmlFor="" className='text-devarana-midnight'>Elemento del desarrollo</label>    
            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
            <div className='py-6'>
                <hr />
            </div>
            <div>
                { prototipos && prototipos.length > 0? 
                <div>
                        <h2 className='text-devarana-midnight text-2xl uppercase'>Prototipos</h2>
                    <ul>
                        {
                            prototipos.map( (item, i) => (
                                <li className='text-devarana-graph' key={i}>{item.nombre} </li>
                             ) )
                        }
                    </ul>
                </div>
                :
                <p>No hay prototipos designados</p>
                }
            </div>
            <div className="flex max-w-md">
                <Input className="block border rounded-md px-3 py-1 shadow-md my-2" name="prototipo" id="prototipo" placeholder="Nuevo prototipo" />
                <Button type="button" className={"bg-devarana-midnight text-white block m-auto"} onClick={agregarPrototipo}> Agregar </Button>
            </div>
            <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
        </form>
    </div>
    </>
    );
}
 
export default AdminDesarrolloEdit;