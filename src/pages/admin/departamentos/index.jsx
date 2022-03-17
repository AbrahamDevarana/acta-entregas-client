import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDepartamentoAction, editDepartamentoAction, getDepartamentosAction, cleanDepartamentoAction } from '../../../actions/departamentoActions';
import Select from '../../../components/select';
import Table from '../../../components/Table'


const AdminDepartamentos = () => {

    const departamento = useSelector(state => state.departamento.departamento)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect ( ()=> { 
        dispatch(getDepartamentosAction())
        dispatch(cleanDepartamentoAction())
    }, [])

    const setEdit = (id) => {
        dispatch( editDepartamentoAction(id) )
        navigate(`edit/${id}`)
    }


    const deleteItem = ( id ) => {
        dispatch(deleteDepartamentoAction(id))
    }
    const header = [
        // {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Numero', field: 'folio', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'Piso', field: 'piso', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'Fecha Pre Entrega', field: 'fechaPreEntrega', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>rowData.fechaPreEntrega === null ? "No Asignada" : "" },        
        {title: 'Fecha Entrega', field: 'fechaEntrega', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>  rowData.fechaEntrega === null ? "No Asignada" : "" },
        {title: 'Tipo Departamento', field: 'tipoDepartamento', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>rowData.tipoDepartamento === null ? "No Asignada" : rowData.tipoDepartamento},
        {title: 'Cliente', field: 'cliente', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>rowData.cliente === null ? "No Asignado" : "" },
        {title: 'Status', field: 'status_id', cellStyle: { 'textAlign':'center', width: '10%'}},
    ]

    return ( 
        <>
        
        <h1>Buscador:</h1>
        <div className='grid grid-cols-4 py-2'>

            <div>
                <label htmlFor="piso" className='inline-block w-full'>Piso:</label>
                <Select id="piso">
                    <option value=""> -- Seleccione --</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                    <option value="">5</option>
                    <option value="">6</option>
                    <option value="">7</option>
                    <option value="">8</option>
                    <option value="">9</option>
                    <option value="">10</option>
                    <option value="">11</option>
                </Select>
            </div>
            <div>
                <label htmlFor="status" className='inline-block w-full'>Status:</label>
                <Select id="status">
                    <option value="">-- Seleccione --</option>
                    <option value="">Entregado</option>
                    <option value="">Problemas</option>
                    <option value="">Disponible</option>
                    <option value="">Asignado</option>
                </Select>
            </div>
        </div>

        { departamento && departamento.length > 0 ? 
            <Table 
            header = {header} 
            body={departamento}
            setEdit={setEdit}
            showItem={false}
            deleteItem={false}
            title={'Listado de departamentos'} 
            /> 
            : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
        
        }
        </>
     );
}
 
export default AdminDepartamentos;