import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editResidenciaAction, getResidenciasAction, cleanResidenciaAction } from '../../../actions/residenciaActions';
import Select from '../../../components/select';
import Table from '../../../components/Table'
import Spinner from '../../../components/spinner';
import Modal from '../../../components/modal';
import Button from '../../../components/button';
import SingleCalendar from '../../../components/singleCalendar'

import {BsBoxArrowInRight} from "react-icons/bs"


const AdminResidencias = () => {

    const residencia = useSelector(state => state.residencia.residencia)
    const loadingresidencia = useSelector(state => state.residencia.loading)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect ( ()=> { 
        dispatch(getResidenciasAction())
        dispatch(cleanResidenciaAction())
        // eslint-disable-next-line 
    }, [])

    const setEdit = (id) => {
        dispatch( editResidenciaAction(id) )
        navigate(`edit/${id}`)
    }

    const [modal, showModal] = useState(false)
    const [programacion, setProgramacion ] = useState({
        datetime: "",
        text: ""
    })


    const handleAgendar = e => {

    }

    const header = [
        // {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'Numero', field: 'folio', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'Piso', field: 'piso', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'Fecha Pre Entrega', field: 'fechaPreEntrega', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>rowData.fechaPreEntrega === null ? <Button className="inline-flex" onClick={(e) => {showModal(true)}}> Agendar <BsBoxArrowInRight className='my-auto mx-2'/> </Button> : "" },        
        {title: 'Fecha Entrega', field: 'fechaEntrega', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>  rowData.fechaEntrega === null ? <Button className="inline-flex" onClick={(e) => {showModal(true)}}> Agendar <BsBoxArrowInRight className='my-auto mx-2'/> </Button> : "" },
        {title: 'Prototipo', field: 'tipoResidencia', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData =>rowData.tipoResidencia === null ? "No Asignado" : rowData.tipoResidencia},
        {title: 'Tipo', field: 'tipoResidencia', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => rowData.tipo === 1? "Departamento" : ""},
        {title: 'Cliente', field: 'cliente', cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData =>rowData.cliente === null ? "No Asignado" : "" },
        {title: 'Status', field: 'status_id', cellStyle: { 'textAlign':'center', width: '10%'}},
    ]

    if(loadingresidencia) return <Spinner/>

    return ( 
        <>
        
        <div>
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

            { residencia && residencia.length > 0 ? 
                <Table 
                header = {header} 
                body={residencia}
                setEdit={setEdit}
                showItem={false}
                deleteItem={false}
                title={'Listado de residencias'} 
                /> 
                : <p className="text-2xl text-red-500 font-bold text-center uppercase"> No se encontraron resultados </p> 
            
            }
        </div>
        {/* Modal Information */}

            <Modal modal={modal} showModal={showModal} title="Agendar Cita">
                <h2 className='py-2 text-2xl text-devarana-pink'>Fecha seleccionada: { programacion.text !== "" ? programacion.text : "No Seleccionada" }</h2>
                <Button className="bg-devarana-midnight text-white block w-full my-4">Agendar</Button>
                <SingleCalendar setProgramacion={setProgramacion} programacion={programacion} ></SingleCalendar>
            </Modal>    
        </>
     );
}
 
export default AdminResidencias;