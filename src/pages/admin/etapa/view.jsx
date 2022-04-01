import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { upgradeEtapaAction, verEtapaAction } from "../../../actions/etapaActions";
import Button from "../../../components/button";

import Spinner from '../../../components/spinner'

import {BsEyeFill} from "react-icons/bs"
import { getPrototiposAction, cleanPrototipoAction } from "../../../actions/prototipoActions";
import ErrorDisplay from "../../../components/errors";

const AdminEtapasView = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingEtapa = useSelector( state => state.etapa.loading)

    const etapa = useSelector( state => state.etapa.etapa)
    const prototiposLista = useSelector( state => state.prototipo.prototipo);
    const {descripcion, prototipos, id} = etapa

    

    // State para asignar Prototipos a Etapa
    const [asignarPrototipo, setAsignarPrototipo] = useState({
        id,
        prototipoNuevo: []
    })
    
 
    const handleCheck = (e) => {        
        const { value, checked } = e.target;
        const { prototipoNuevo } = asignarPrototipo;

        // Case 1: The user checks the box
        if (checked) {
            setAsignarPrototipo({
                ...asignarPrototipo,
                id,
                prototipoNuevo: [...prototipoNuevo, value],
            });
        }
        // Case 2: The user unchecks the box
        else {
            setAsignarPrototipo({
                ...asignarPrototipo,
                id,
                prototipoNuevo:prototipoNuevo.filter((e) => e !== value),
            });
        }
    }

    useEffect(() => {
        dispatch(getPrototiposAction())
        dispatch(verEtapaAction(params.id))
        dispatch(cleanPrototipoAction())
        // eslint-disable-next-line
    }, [])


    const handleAddPrototipos = e => {
        e.preventDefault()
        dispatch(upgradeEtapaAction(asignarPrototipo))

        setAsignarPrototipo({
            id,
            prototipoNuevo: []
        })
    }


    if(loadingEtapa) return <Spinner/>
    return ( 
        <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
            <Button className={"bg-devarana-graph text-white mb-4 block uppercase"} onClick={ () => navigate(-1)}> Volver </Button>
            <ErrorDisplay alert={alert} />
            <h1 className="text-center text-3xl text-devarana-midnight pb-5"> Etapa: {descripcion}</h1>
            { prototipos && prototipos.length > 0 ?
                <>
                <h2 className="text-2xl text-center text-devarana-midnight pb-2 font-extralight">Prototipos Asignados</h2>
                <div className="relative border overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full table-auto">
                        <thead className="bg-devarana-graph bg-opacity-20">
                            <tr>
                                <th className="py-2">Nombre </th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        { prototipos.map( (item, i) => (
                            <tr key={i} className="text-center">
                                <td className="py-2"> {item.nombre} </td>
                                <td className="text-lg text-devarana-midnight inline-flex">
                                    <span className="px-2"><Button onClick={() => navigate(`/admin/prototipo/edit/${item.id}`) } className="border-0"><BsEyeFill/></Button></span>
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
                <h2 className="text-2xl text-center text-devarana-midnight pb-2 font-extralight">Prototipos Disponibles</h2>
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
                }
                <div className="flex">
                    <Button className="bg-devarana-midnight text-devarana-pearl" onClick={handleAddPrototipos}> Asignar Prototipos  </Button>
                    <Button className="bg-devarana-midnight text-devarana-pearl ml-auto" onClick={() => {navigate('/admin/prototipo')}}> Ver Prototipos  </Button>
                </div>
        </div>
     );
}
 
export default AdminEtapasView;