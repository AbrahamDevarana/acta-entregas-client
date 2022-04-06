import Input from '../../../components/input'
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { editDesarrolloAction, updateDesarrolloAction } from '../../../actions/desarrolloActions';
import { useEffect, useState } from 'react';
import Dropzone from '../../../components/dropzone';
import Swal from 'sweetalert2';
import {FiDelete} from 'react-icons/fi'



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
  
    const [formulario, setForm] = useState(false)
    const [foto, setFoto] = useState(false)
    const [desarrollo, setDesarrollo ] = useState({
        descripcion: '',
        etapas: [],
        nuevaEtapa: [],
        etapaEliminada: []
    })

    useEffect( () => {
        if(!editDesarrollo){
            dispatch(editDesarrolloAction(params.id))
        }
        setDesarrollo({
            ...editDesarrollo,
            nuevaEtapa: [],
            etapaEliminada: []
        })

        // eslint-disable-next-line 
    }, [editDesarrollo])

    const { descripcion, etapas, nuevaEtapa, etapaEliminada } = desarrollo
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
            // console.log(nuevaEtapa);
            setDesarrollo({
                ...desarrollo,
                nuevaEtapa: nuevaEtapa.length > 0? [...nuevaEtapa, etapaValue] : [etapaValue]
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
        dispatch(updateDesarrolloAction(desarrollo, form))
    }

    const handleDeleteOldEtapa = (e, borrar) => {
        e.preventDefault()

        Swal.fire({
            title: 'Estás seguro(a)?',
            text: "Esta estapa se eliminara una vez que presiones guardar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Estoy seguro(a)!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                setDesarrollo({
                    ...desarrollo,
                    etapas: etapas.filter( item => item.id !== borrar),
                    etapaEliminada: [...etapaEliminada, borrar]
                })
            }
          })
        
    }
    const handleDeleteEtapa = (e, borrar) => {
        e.preventDefault()
        setDesarrollo({
            ...desarrollo,
            nuevaEtapa: nuevaEtapa.filter( item => item !== borrar)
        })

    }
 
    

    if(loading) return <Spinner/>

    return ( 
        <>
        <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
            <Button className={"bg-devarana-graph text-white mb-4 block uppercase"} onClick={ () => navigate(-1)}> Volver </Button>

            <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>{descripcion}</h1>
            

            <form action="" onSubmit={handleSubmit}>
                <div id='preview'>
                    <img src={`${process.env.REACT_APP_URL}/verDesarrollo/${desarrollo.id}`} alt={`${desarrollo.descripcion}`} className="w-full"/>
                </div>
                <div className='py-2'>
                    <Dropzone setFoto={setFoto}/>
                </div>
                <ErrorDisplay alert={alert} errors={errors} />
                <label htmlFor="" className='text-devarana-midnight'>Nombre de Desarrollo</label>    
                <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>
                <div className='grid grid-cols-3 gap-x-10 gap-y-2'>
                    <p className='col-span-3 my-2'> Etapas del proyecto: </p>
                    { etapas && etapas.length > 0? 
                         etapas.map( (item, i) => (
                            // <div className='col-span-1 border shadow py-2 px-2 inline-flex hover:bg-devarana-babyblue transition-all ease-in-out duration-700' key={i}> <Link className='w-full' to={`etapa/${item.id}`}> {item.descripcion} </Link> <button className='ml-auto mr-3 px-2 hover:bg-devarana-pink hover:text-devarana-pearl' onClick={(e) => handleDeleteOldEtapa(e, item.id) }> <FiDelete/> </button> </div>
                            <Link key={i} to={`/admin/etapas/${item.id}`} className='col-span-1 border shadow py-2 px-2 hover:bg-devarana-babyblue hover:text-devarana-pearl transition-all ease-in-out duration-300'>
                                <div className='w-full inline-flex'> 
                                    {item.descripcion}
                                    <button type="button" className='ml-auto mr-1 px-2 rounded-sm hover:text-devarana-pink hover:border hover:border-devarana-pink transition-all ease-in-out duration-200' onClick={(e) => handleDeleteOldEtapa(e, item.id) }> <FiDelete/> </button> 
                                </div>
                            </Link>
                         ))                         
                        : 
                        <p className='text-2xl text-center py-2 col-span-3'>Este desarrollo no tiene etapas creadas</p> 
                    }

                    {
                        nuevaEtapa && nuevaEtapa.length > 0 ?
                            nuevaEtapa.map((item, i) => (
                                <div className='col-span-1 border shadow py-2 px-2 inline-flex border-devarana-pink' key={i}> <p> {item } </p> <button className='ml-auto mr-3 px-2' onClick={(e) => handleDeleteEtapa(e, item) }> <FiDelete/> </button> </div>                            
                            ))
                        :
                        null
                    }
                </div>

                {formulario ? 
                    <>
                        <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-4" name="etapa" id="etapa" placeholder="Nueva etapa"/>
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
 
export default AdminDesarrolloEdit;