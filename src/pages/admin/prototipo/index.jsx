import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePrototipoAction, editPrototipoAction, getPrototiposAction  } from '../../../actions/prototipoActions';
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import Table from '../../../components/Table'


const AdminPrototipo = () => {

    const prototipo = useSelector(state => state.prototipo.prototipo)
    const loading = useSelector(state => state.prototipo.loading)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect ( ()=> { 
        dispatch(getPrototiposAction())
        // dispatch(cleanPrototipoAction())
        // eslint-disable-next-line 
    }, [])

    const setEdit = (id) => {
        dispatch( editPrototipoAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch(deletePrototipoAction(id))
    }
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Nombre', field: 'nombre', cellStyle: { 'textAlign':'center', width: '45%'}},
        {title: 'Desarrollo', field: 'desarrollo.descripcion', cellStyle: { 'textAlign':'center', width: '45%'}},
    ]

    if(loading) return <Spinner/>

    return ( 
        <>
        <div className="flex">
            <Button className={"bg-devarana-graph text-white mb-4 block uppercase"} onClick={ () => navigate(-1)}> Volver </Button>
            <Button className={"bg-devarana-midnight text-white mb-4 block ml-auto uppercase"} onClick={ () => navigate("create")}><i className="fa-solid fa-plus"></i> nuevo</Button>
        </div>

        { prototipo && prototipo.length > 0 ? 
            <Table 
            header = {header} 
            body={prototipo}
            setEdit={setEdit}
            showItem={false}
            deleteItem={deleteItem}
            title={'Prototipo de elementos'} 
            /> 
            : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
        
        }
        </>
     );
}
 
export default AdminPrototipo;