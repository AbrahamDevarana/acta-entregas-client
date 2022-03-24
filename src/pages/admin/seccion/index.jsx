import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteSeccionAction, editSeccionAction, getSeccionesAction, cleanSeccionAction } from '../../../actions/seccionActions';
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import Table from '../../../components/Table'


const AdminSeccion = () => {

    const seccion = useSelector(state => state.seccion.seccion)
    const loading = useSelector(state => state.seccion.loading)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect ( ()=> { 
        dispatch(getSeccionesAction())
        dispatch(cleanSeccionAction())
        // eslint-disable-next-line 
    }, [])

    const setEdit = (id) => {
        dispatch( editSeccionAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch(deleteSeccionAction(id))
    }
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Descripción', field: 'descripcion', cellStyle: { 'textAlign':'center', width: '80%'}},
    ]

    if(loading) return <Spinner/>

    return ( 
        <>

        <Button className={"bg-devarana-midnight text-white mb-4 block ml-auto uppercase"} onClick={ () => navigate("create")}><i className="fa-solid fa-plus"></i> nuevo</Button>

        { seccion && seccion.length > 0 ? 
            <Table 
            header = {header} 
            body={seccion}
            setEdit={setEdit}
            showItem={false}
            deleteItem={deleteItem}
            title={'Listado de secciones'} 
            /> 
            : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
        
        }
        </>
     );
}
 
export default AdminSeccion;