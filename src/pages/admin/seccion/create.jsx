import Input from '../../../components/input'
import Button from '../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createNewSeccionAction } from '../../../actions/seccionActions';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../../../components/errors';
import { getListadosAction } from '../../../actions/listadoActions';



const AdminSeccionCreate = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.seccion.errors)
    const listado = useSelector (state => state.listado.listado)
    const redirect = useSelector( state => state.seccion.redirectTo)
    if(redirect){
        navigate(redirect)
    }
    useEffect( () => {
        dispatch(getListadosAction())
        // setCheckedState(new Array(listado.length).fill(false))
    }, [])

    
    const [seccion, setSeccion ] = useState({
        descripcion: '',
        lista: []
    })
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
                lista:lista.filter((e) => e !== value),
            });
        }
    };

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
        dispatch(createNewSeccionAction(seccion))
    }

    return ( 
        <>
            <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
                <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Sección</h1>
                <ErrorDisplay alert={alert} errors={errors} />

                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className='text-devarana-midnight'>Nombre de Sección</label>    
                    <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion" onChange={handleChange} value={descripcion}></Input>

                    <div className='py-4'>
                        <h2 className='font-mulish font-bold text-2xl py-2'>Lista de elementos </h2> 
                        <div className="grid grid-cols-3">

                            { listado && listado.length > 0 ? 
                                listado.map( (item, i) => (
                                <div key={i}>
                                    <input type="checkbox" name="lista" id={`chk${item.id}`} value={item.id} onChange={handleCheck} className='rounded-md shadow-md my-1 mx-2' />
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
 
export default AdminSeccionCreate;