import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteListadoAction, editListadoAction, getListadosAction, cleanListadoAction } from '../../../actions/listadoActions';
import Button from '../../../components/button';
import Table from '../../../components/Table'


const AdminListado = () => {

    const listado = useSelector(state => state.listado.listado)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect ( ()=> { 
        dispatch(getListadosAction())
        dispatch(cleanListadoAction())
    }, [])

    const setEdit = (id) => {
        dispatch( editListadoAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch(deleteListadoAction(id))
    }
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Descripción', field: 'descripcion', cellStyle: { 'textAlign':'center', width: '60%'}},
        {title: 'Tipo', field: 'tipoListado', cellStyle: { 'textAlign':'center', width: '30%'}, render: rowData => rowData.tipoListado  === "1" ? "Cliente" : rowData.tipoListado === "2" ? "Especial" : "Calidad" },
    ]

    return ( 
        <>

        <Button className={"bg-devarana-midnight text-white mb-4 block ml-auto uppercase"} onClick={ () => navigate("create")}><i className="fa-solid fa-plus"></i> nuevo</Button>

        { listado && listado.length > 0 ? 
            <Table 
            header = {header} 
            body={listado}
            setEdit={setEdit}
            showItem={false}
            deleteItem={deleteItem}
            title={'Listado de elementos'} 
            /> 
            : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
        
        }
        </>
     );
}
 
export default AdminListado;