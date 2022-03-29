import Input from '../../../components/input'
import Button from '../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createNewDesarrolloAction } from '../../../actions/desarrolloActions';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../../../components/errors';

import Dropzone from '../../../components/dropzone';

import {FiDelete} from 'react-icons/fi'


const AdminDesarrolloCreate = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.desarrollo.errors)
    const redirect = useSelector( state => state.desarrollo.redirectTo)

    if(redirect){
        navigate(redirect)
    }

    const [formulario, setForm] = useState(false)
    const [foto, setFoto] = useState(false)
    const [desarrollo, setDesarrollo ] = useState({
        descripcion: '',
        etapas: []
    })

    const { descripcion, etapas } = desarrollo

    const handleChange = e => {
        setDesarrollo({
            ...desarrollo,
            [e.target.name]:e.target.value
        })
    }

    const handleNuevaEtapa = e => {
        e.preventDefault()
        const etapa = document.querySelector("#etapa")
        const etapaValue = etapa.value

        if(etapaValue.trim() !== "") {

            setDesarrollo({
                ...desarrollo,
                etapas: etapas.length > 0? [...etapas, etapaValue] : [etapaValue]
            })
        }

        etapa.value = ""
        
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

        const form = new FormData()
        form.append("foto", foto)

        dispatch(hideAlertAction())

        dispatch(createNewDesarrolloAction(desarrollo, form))
    }

    const handleDeleteEtapa = (e, borrar) => {
        e.preventDefault()
        setDesarrollo({
            ...desarrollo,
            etapas: etapas.filter( item => item !== borrar)
        })
    }

    return ( 
        <>
            <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
                <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Nuevo Desarrollo</h1>
                <ErrorDisplay alert={alert} errors={errors} />

                <form action="" onSubmit={handleSubmit}>
                    <div className='py-2'>
                        <Dropzone setFoto={setFoto}/>
                    </div>
                    <label htmlFor="" className='text-devarana-midnight'>Nombre de Desarrollo</label>    
                    <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
                    <div className='grid grid-cols-3 gap-x-10'>
                        <p className='col-span-3 my-2'> Etapas del proyecto: </p>
                        { etapas && etapas.length > 0? 
                             etapas.map( (item, i) => (
                                <div className='col-span-1 border shadow py-2 px-2 inline-flex border-devarana-pink' key={i}> <p> {item}</p> <button className='ml-auto mr-3 px-2' onClick={(e) => handleDeleteEtapa(e, item) }> <FiDelete/> </button> </div>
                             ))
                            : 
                            <p className='text-2xl text-center py-2 col-span-3'>Este desarrollo no tiene etapas creadas</p> 
                        }
                    </div>


                    {formulario ? 
                        <>
                            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-4" name="etapa" id="etapa"/>
                            <Button type="button" onClick={handleNuevaEtapa}> Agregar </Button>
                        </>
                        :
                            <Button type="button" onClick={ setForm(true) }> Agregar </Button>
                    }
                    <Button type="submit" className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
                </form>
            </div>
        </>
     );
}
 
export default AdminDesarrolloCreate;