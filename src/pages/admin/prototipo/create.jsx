import Input from '../../../components/input'
import Dropzone from "../../../components/dropzone";
import Button from '../../../components/button';
import Select from '../../../components/select'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createNewPrototipoAction } from '../../../actions/prototipoActions';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../../../components/errors';
import { getDesarrollosAction } from '../../../actions/desarrolloActions';



const AdminPrototipoCreate = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.prototipo.errors)
    const redirect = useSelector( state => state.prototipo.redirectTo)
    const desarrollos = useSelector( state => state.desarrollo.desarrollo)
    const [foto, setFoto] = useState(false)

    if(redirect){
        navigate(redirect)
    }

    const [prototipo, setPrototipo ] = useState({
        descripcion: '',
        planos: '',
        nombre: '',
        desarrollo_id: ''
    })

    useEffect(() => {
        dispatch(getDesarrollosAction())
    }, []);

    
    const { descripcion, planos, nombre, id, desarrollo_id } = prototipo

    const handleChange = e => {
        setPrototipo({
            ...prototipo,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if( nombre === ''){
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
        dispatch(createNewPrototipoAction(prototipo, form))
    }

    return ( 
        <>
            <div className='max-w-[600px] m-auto w-full px-5 py-10'>
                <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Prototipo</h1>
                <ErrorDisplay alert={alert} errors={errors} />

                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className='text-devarana-midnight'>Elemento del prototipo</label>    
                    <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="nombre" onChange={handleChange} value={nombre}></Input>
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
                    <div className="py-2">
                        <label htmlFor="" className='text-devarana-midnight'>Planos</label>    
                        <Dropzone setFoto={setFoto} thumbS="w-full border border-devarana-pink" />
                    </div>
                    <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
                </form>
            </div>
        </>
     );
}
 
export default AdminPrototipoCreate;