import Input from '../../../components/input'
import Dropzone from "../../../components/dropzone";
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editPrototipoAction, updatePrototipoAction } from '../../../actions/prototipoActions';
import { useEffect, useState } from 'react';
import ObtenerImage from '../../../components/obtenerImage';

import { ReactSVG } from 'react-svg'

const AdminPrototipoEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.prototipo.errors )
    const editPrototipo = useSelector( state => state.prototipo.edit)
    const loading = useSelector( state => state.prototipo.loading)
    const redirect = useSelector( state => state.prototipo.redirectTo)
    const [foto, setFoto] = useState(false)
    
    if(redirect){
        navigate(redirect)
    }

    const [prototipo, setPrototipo ] = useState({
        descripcion: '',
        planos: '',
        id: '',
        nombre: ''
    })

    useEffect( () => {
        if(!editPrototipo){
            dispatch(editPrototipoAction(params.id))
        }
        setPrototipo(editPrototipo)

        // obtenerSvgIds()
        // eslint-disable-next-line 
    }, [editPrototipo])

    const { descripcion, planos, nombre, id } = prototipo


    const handleChange = e => {
        setPrototipo({
            ...prototipo,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if( nombre.trim() === '' ){
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
        dispatch(updatePrototipoAction(prototipo, form))
    }


    const svgObject = document.querySelectorAll(".st0")

    svgObject.forEach( item => {
        
        item.addEventListener("click", () => { 
         console.log(this);
        })
    })



    if(loading) return <Spinner/>

    return ( 
    <>
    <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Prototipo</h1>
        <ErrorDisplay alert={alert} errors={errors} />
        <Button className={"bg-devarana-graph text-white mb-4 block uppercase"} onClick={ () => navigate(-1)}> Volver </Button>

        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-devarana-midnight'>Elemento del prototipo</label>    
            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="nombre" onChange={handleChange} value={nombre}></Input>
            <div className="py-2">
                <label htmlFor="" className='text-devarana-midnight'>Planos</label>    
                <Dropzone setFoto={setFoto} thumbS="w-full border border-devarana-pink" />
            </div>
            <div id="preview">

                { prototipo? 
                    <ReactSVG src={`${process.env.REACT_APP_URL}/obtenerPlano/${prototipo.id}`}/>
                    // <ObtenerImage urlImage={`obtenerPlano/${prototipo.id}`}/>
                : null }
            </div>
            
            <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
        </form>
    </div>
    </>
    );
}
 
export default AdminPrototipoEdit;