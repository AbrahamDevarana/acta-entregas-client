import Input from '../../../components/input'
import Select from '../../../components/select'
import Button from '../../../components/button';
import ErrorDisplay from '../../../components/errors';
import { showAlertAction, hideAlertAction } from '../../../actions/alertActions';


import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editDepartamentoAction} from '../../../actions/departamentoActions';
import { useEffect, useState } from 'react';
import { getSeccionesAction } from '../../../actions/seccionActions';

const AdminDepartamentosEdit = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector ( state => state.departamento.errors )
    const editDepartamento = useSelector( state => state.departamento.edit)
    const redirect = useSelector( state => state.departamento.redirectTo)

    const seccionesGeneral = useSelector(state => state.seccion.seccion)

    if(redirect){
        navigate(redirect)
    }    

    const [departamento, setDepartamento ] = useState({
        id: '',
        secciones: [],
        listado: []
    })

    useEffect( () => {
        if(!editDepartamento){
            dispatch(editDepartamentoAction(params.id))
        }
        dispatch(getSeccionesAction())
    }, [editDepartamento])

    const handleCheck = (e) => {        
        // Destructuring
        const { value, checked } = e.target;
        const { listado } = departamento;

        // Case 1 : The user checks the box
        if (checked) {
            setDepartamento({
                ...departamento,
                listado: [...listado, value],
            });
        }
        // Case 2  : The user unchecks the box
        else {
            setDepartamento({
                ...departamento,
                listado: listado.filter((e) => e !== value),
            });
        }
    };

    const { listado:listado_departamento, secciones:secciones_departamento } = editDepartamento
    const { listado, secciones } = departamento

    return ( 
    <>
    <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
        <h1 className='font-mulish text-4xl text-center font-bold uppercase py-4 text-devarana-midnight'>Departamento</h1>
        <ErrorDisplay alert={alert} errors={errors} />

        <form action="">
            <div className='grid grid-cols-3'>
            { secciones_departamento && secciones_departamento.length > 0 ? 
                secciones_departamento.map( (item, i) => (
                    <div key={i}>
                        <h1 className='font-bold text-lg pt-4 font-mulish'>{ item.descripcion }</h1>
                        <div> { 
                                seccionesGeneral && seccionesGeneral.length > 0 ? 
                                seccionesGeneral[i].listado.map( ( element, i) => (
                                    <div key={i} className="py-1">
                                        <input type="checkbox" id={`chk${element.id}`} value={element.id} name="lista" className='rounded-md shadow-md my-1 mx-2' onChange={handleCheck}/>
                                        <label htmlFor={`chk${element.id}`} className='cursor-pointer'>{element.descripcion} </label>
                                    </div>
                                ))
                                :
                                null  // checked={seccion.lista? seccion.lista.includes( `${item.id}` ) : false }
                            } 
                        </div>
                    </div>
                ) )
                
                : 

                null
        
            }
            </div>
        </form>
    </div>
    </>
    );
}
 
export default AdminDepartamentosEdit;