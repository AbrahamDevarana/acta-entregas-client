import Input from '../../../components/input'
import Button from '../../../components/button';
import Spinner from '../../../components/spinner'
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editUsuarioAction, updateUsuarioAction } from '../../../actions/usuarioActions';
import { useEffect, useState } from 'react';
import Dropzone from '../../../components/dropzone';

const AdminUsuarioEdit = () => {

    const params = useParams()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.usuarios.errors )
    const editUsuario = useSelector( state => state.usuarios.edit)
    const redirect = useSelector( state => state.usuarios.redirectTo)
    const loading = useSelector( state => state.usuarios.loading)

    const navigate = useNavigate()

    if(redirect){
        navigate(redirect)
    }

    const dispatch = useDispatch();

    const [usuario, setUsuario ] = useState({
        id:'',
        name : '',
        last_name : '',
        email : '',
        password : '',
        password_confirmation : '',
        foto: ''
    })

    const [picture, setFoto] = useState(false)
    

    useEffect( () => {
        if(!editUsuario){
            dispatch(editUsuarioAction(params.id))
        }
        setUsuario(editUsuario)
        // eslint-disable-next-line 
    }, [editUsuario])

    const { id, name, last_name, email, password, password_confirmation, foto } = usuario


    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }


    // const saveFile = e => {
    //     setFoto(e.target.files[0])

    //     let reader = new FileReader()
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = function(){
    //         let preview = document.getElementById('preview'),
    //         image = document.createElement("img")
    //         image.classList.add("rounded-full")
    //         image.src = reader.result
    //         preview.innerHTML = "";
    //         preview.append(image)
    //     }
    // }

    const handleSubmit = e => {
        e.preventDefault()
        if(  name.trim() === '' || last_name.trim() === '' || email.trim() === '' ){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }

        const form = new FormData()
        form.append("foto", picture)

        dispatch(hideAlertAction())
        dispatch(updateUsuarioAction(usuario, form))

    }
    if(loading) return <Spinner/>
    return ( 
    <>
    <div className='max-w-[600px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Usuario</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="" onSubmit={handleSubmit}>


            <div className="py-2 m-auto w-[200px]" id='preview'>
                <img className='w-[150px] m-auto' src={`${process.env.REACT_APP_URL}/verFoto/${id}`}></img>   
            </div>

            <Dropzone setFoto={setFoto} />
            {/* <div className='py-2'>
                <label htmlFor="foto" className='text-devarana-midnight'>Fotograf??a</label>  
                <Input type="file" id="foto" accept=".pdf,.jpg,.png" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="photo" onChange={saveFile} ></Input>
            </div> */}
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
                <label htmlFor="" className='text-devarana-midnight'>Contrase??a</label>    
                <Input type="password" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="password" onChange={handleChange} value={password}></Input>
            </div>
            <div className='py-2'>
                <label htmlFor="" className='text-devarana-midnight'>Confirmar Contrase??a </label>    
                <Input type="password" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="password_confirmation" onChange={handleChange} value={password_confirmation}></Input>
            </div>
            <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
        </form>
    </div>
    </>
    );
}
 
export default AdminUsuarioEdit;