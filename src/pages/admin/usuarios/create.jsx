import Input from '../../../components/input'
import Button from '../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createNewUsuarioAction } from '../../../actions/usuarioActions';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../../../components/errors';



const AdminUsuarioCreate = () => {

    const dispatch = useDispatch()
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.usuarios.errors)
    const redirect = useSelector( state => state.usuarios.redirectTo)
    const navigate = useNavigate()
    if(redirect){
        navigate(redirect)
    }

    const [usuario, setUsuario ] = useState({
        name : '',
        last_name : '',
        email : '',
        password : '',
        password_confirmation : ''
    })

    const [foto, setFoto] = useState(false)

    const { name, last_name, email, password, password_confirmation } = usuario

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const saveFile = e => {
        setFoto(e.target.files[0])

        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(){
            let preview = document.getElementById('preview'),
            image = document.createElement("img")
            image.classList.add("rounded-full")
            image.src = reader.result
            preview.innerHTML = "";
            preview.append(image)
        }
    }


    const handleSubmit = e => {
        e.preventDefault()
        if( name.trim() === '' || last_name.trim() === '' || email.trim() === '' || password.trim() === '' || password_confirmation.trim() === '' || !foto){
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
        dispatch(createNewUsuarioAction(usuario, form))
    }

    return ( 
        <>
            <div className='max-w-[600px] m-auto w-full px-5 py-10'>
                <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Nuevo Usuario</h1>
                <ErrorDisplay alert={alert} errors={errors} />

                <form action="" onSubmit={handleSubmit}>

                    <div className="py-2 m-auto w-[200px]" id='preview'>
                        
                    </div>
                    <div className='py-2'>
                        <label htmlFor="foto" className='text-devarana-midnight'>Fotografía</label>  
                        <Input type="file" id="foto" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="photo" onChange={saveFile} ></Input>
                    </div>
                    <div className='py-2'>
                        <label htmlFor="" className='text-devarana-midnight'>Nombre</label>    
                        <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="name" onChange={handleChange} value={name}></Input>
                    </div>
                    <div className='py-2'>
                        <label htmlFor="" className='text-devarana-midnight'>Apellidos</label>    
                        <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="last_name" onChange={handleChange} value={last_name}></Input>
                    </div>
                    <div className='py-2'>
                        <label htmlFor="" className='text-devarana-midnight'>Email</label>    
                        <Input type="email" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="email" onChange={handleChange} value={email}></Input>
                    </div>
                    <div className='py-2'>
                        <label htmlFor="" className='text-devarana-midnight'>Contraseña</label>    
                        <Input type="password" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="password" onChange={handleChange} value={password}></Input>
                    </div>
                    <div className='py-2'>
                        <label htmlFor="" className='text-devarana-midnight'>Confirmar Contraseña </label>    
                        <Input type="password" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="password_confirmation" onChange={handleChange} value={password_confirmation}></Input>
                    </div>
                    
                    <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
                </form>
            </div>
        </>
     );
}
 
export default AdminUsuarioCreate;