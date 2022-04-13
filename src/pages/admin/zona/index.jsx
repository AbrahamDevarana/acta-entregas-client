import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteZonaAction, editZonaAction, getZonasAction, cleanZonaAction } from '../../../actions/zonaActions';
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import Table from '../../../components/Table'


const AdminZona = () => {

    const zona = useSelector(state => state.zona.zona)
    const loading = useSelector(state => state.zona.loading)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect ( ()=> { 
        dispatch(getZonasAction())
        dispatch(cleanZonaAction())
        // eslint-disable-next-line 
    }, [])

    const setEdit = (id) => {
        dispatch( editZonaAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch(deleteZonaAction(id))
    }
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Descripción', field: 'descripcion', cellStyle: { 'textAlign':'center', width: '50%'}},
        {title: 'Desarrollo', field: 'desarrollo.descripcion', cellStyle: { 'textAlign':'center', width: '40%'}},
    ]

    if(loading) return <Spinner/>

    return ( 
        <>

        <Button className={"bg-devarana-midnight text-white mb-4 block ml-auto uppercase"} onClick={ () => navigate("create")}><i className="fa-solid fa-plus"></i> nuevo</Button>

        { zona && zona.length > 0 ? 
            <Table 
            header = {header} 
            body={zona}
            setEdit={setEdit}
            showItem={false}
            deleteItem={deleteItem}
            title={'Listado de zonaes'} 
            /> 
            : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
        
        }
        </>
     );
}
 
export default AdminZona;