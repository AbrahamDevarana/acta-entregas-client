import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setRelacionAction, verEtapaAction } from "../../../actions/etapaActions";
import Button from "../../../components/button";

import Spinner from '../../../components/spinner'

import {BsEyeFill} from "react-icons/bs"
import { getPrototipoAction, cleanPrototipoAction } from "../../../actions/prototipoActions";
import ErrorDisplay from "../../../components/errors";

const AdminEtapasView = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingEtapa = useSelector( state => state.etapa.loading)

    const etapa = useSelector( state => state.etapa.etapa)
    const prototiposLista = useSelector( state => state.prototipo.prototipo);
    const loadingPrototipos = useSelector( state => state.prototipo.loading);
    const desarrollo = useSelector( state => state.desarrollo.edit)
    const {descripcion, prototipos, id, desarrollo_id} = etapa

    
    // State para asignar Prototipos a Etapa
    const [asignarPrototipo, setAsignarPrototipo] = useState({
        id,
        prototipoNuevo: []
    })
   
    const { prototipoNuevo } = asignarPrototipo
    const [change, setChange] = useState(false)

    const handleCheck = (e) => {        
        const { value, checked } = e.target;
        const { prototipoNuevo } = asignarPrototipo;
 
        // Case 1: The user checks the box
        if (checked) {
            setAsignarPrototipo({
                ...asignarPrototipo,
                prototipoNuevo: [...prototipoNuevo, Number(value)],
            });

        }
        // Case 2: The user unchecks the box
        else {
            setAsignarPrototipo({
                ...asignarPrototipo,
                prototipoNuevo:prototipoNuevo.filter((e) => e !== Number(value)),
            });
        }

        setChange(true)
        
    }


    useEffect(() => {
        if(change){
            handleSubmit()
        }
        setChange(false)
        
    }, [change]);

    const handleSubmit = () => {
        dispatch(setRelacionAction(asignarPrototipo))
    }

    useEffect(() => {
        
        dispatch(verEtapaAction(params.id)) 
        dispatch(getPrototipoAction(desarrollo.id))
        dispatch(cleanPrototipoAction())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
   
    }, []);

    useEffect(() => {
        setAsignarPrototipo({
            ...asignarPrototipo,
            id:id,
            prototipoNuevo: prototipos ? prototipos.map( item => item.id) : []
        })
    }, [prototipos]);

    if(loadingEtapa) return <Spinner/>
    return ( 
        <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
            <Button className={"bg-devarana-graph text-white mb-4 block uppercase"} onClick={ () => navigate(-1)}> Volver </Button>
            <ErrorDisplay alert={alert} />
            <h1 className="text-center text-3xl text-devarana-midnight pb-5"> Desarrollo: {desarrollo? desarrollo.descripcion : null }</h1>
            <h2 className="text-center text-2xl text-devarana-midnight pb-5"> Etapa: {descripcion}</h2>
            { prototiposLista && prototiposLista.length > 0 ?
                <>
                <h2 className="text-2xl text-center text-devarana-midnight pb-2 font-extralight">Prototipos Asignados</h2>
                <div className="relative border overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full table-auto">
                        <thead className="bg-devarana-graph bg-opacity-20">
                            <tr>
                                <th className="py-2">Nombre </th>
                                <th>Ver</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            loadingPrototipos?
                            <tr>
                                <td colSpan={3}><Spinner/></td>
                            </tr>
                            :                        
                            prototiposLista.map( (item, i) => (
                                <tr key={i} className="text-center">
                                    <td className="py-2"> {item.nombre} </td>
                                    <td>{(prototipoNuevo.filter( element => item.id === element).length > 0)? <span className="px-2"><Button onClick={() => navigate(`/admin/prototipo/edit/${item.id}`) } className="border-0"><BsEyeFill/></Button></span>:null}</td>
                                    <td className="text-lg text-devarana-midnight inline-flex">
                                        <label className="relative flex justify-between items-center group p-2 text-xl">
                                            <input type="checkbox" onChange={handleCheck} value={item.id} checked={( prototipoNuevo.filter( element => item.id === element).length > 0 )} className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer" />
                                            <span className="cursor-pointer w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                                        </label>
                                    </td>
                                </tr>
                            ) ) 
                        }
                        </tbody>
                    </table>
                </div>
                </>
                :
                <p>No hay prototipos existentes</p>
            }
            <hr className="my-10"/>
                {/* <h2 className="text-2xl text-center text-devarana-midnight pb-2 font-extralight">Prototipos Disponibles</h2>
                {prototiposLista && prototiposLista.length > 0 && prototipos?
                    <div className="grid grid-cols-3 my-6">
                        {prototiposLista.map(( item, i ) => (
                            <div key={i} className="col-span-1 items-center text-center">
                                <label htmlFor={`chck-${item.id}`}> {item.nombre}</label>
                                <input type="checkbox" id={`chck-${item.id}`} value={item.id} className="rounded-md shadow-md my-1 mx-2" onChange={handleCheck} />
                            </div>
                        ))}

                    </div>
                    :
                    null
                } */}
                <div className="flex">
                    <Button className="bg-devarana-midnight text-devarana-pearl ml-auto" onClick={() => {navigate('/admin/prototipo')}}> Ver Prototipos  </Button>
                </div>
        </div>
     );
     
}


 
export default AdminEtapasView;
