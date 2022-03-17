import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUsuarioAction, editUsuarioAction, getUsuariosAction, cleanUsuarioAction } from '../../../actions/usuarioActions';
import Button from '../../../components/button';
import Table from '../../../components/Table'


const AdminUsuario = () => {

    const usuarios = useSelector(state => state.usuarios.usuarios)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect ( ()=> { 
        dispatch(getUsuariosAction())
        dispatch(cleanUsuarioAction())
    }, [])

    const setEdit = (id) => {
        dispatch( editUsuarioAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch(deleteUsuarioAction(id))
    }
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Nombre', field: 'name', cellStyle: { 'textAlign':'center', width: '60%'}},
        {title: 'Apellido', field: 'last_name', cellStyle: { 'textAlign':'center', width: '30%'}},
        {title: 'Email', field: 'email', cellStyle: { 'textAlign':'center', width: '30%'}},
        {title: 'Status', field: 'status', cellStyle: { 'textAlign':'center', width: '30%'}, render: rowData => rowData.status? <p className='text-green-500 uppercase'> Activo </p> : <p className='text-red-500 uppercase'> Inactivo </p> },
    ]

    return ( 
        <>

        <Button className={"bg-devarana-midnight text-white mb-4 block ml-auto uppercase"} onClick={ () => navigate("create")}><i className="fa-solid fa-plus"></i> nuevo</Button>

        { usuarios && usuarios.length > 0 ? 
            <Table 
            header = {header} 
            body={usuarios}
            setEdit={setEdit}
            showItem={false}
            deleteItem={deleteItem}
            title={'Lista de usuarios'} 
            /> 
            : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
        
        }
        </>
     );
}
 
export default AdminUsuario;