import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { verEtapaAction } from "../../../actions/etapaActions";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Dropzone from "../../../components/dropzone";

import {BsFillTrashFill, BsEyeFill} from "react-icons/bs"

const AdminEtapasView = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const etapa = useSelector( state => state.etapa.etapa)
    const [foto, setFoto] = useState(false)
    const [form, setForm] = useState (false)

    const [ etapaState , setEtapa ] = useState({
        descripcion: '',
        id: '',
        prototipos: [],
    })

    const [ prototipoState, setPrototipo] = useState({
        descripcion_prototipo:  '',
        planosPrototipo: ''
    })



    
    const {descripcion, prototipos, id} = etapa

    const handleChange = e => {
        e.preventDefault()

        setPrototipo({
            ...prototipoState,
            [e.target.name]:e.target.value
        })
    }


    useEffect(() => {
        dispatch(verEtapaAction(params.id))
        setEtapa(etapa)
        // eslint-disable-next-line
    }, [])

    return ( 
        <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
            <h1 className="text-center text-3xl text-devarana-midnight pb-5"> Etapa: {descripcion}</h1>

            { prototipos && prototipos.length > 0 ?

                <>
                <h2 className="text-2xl text-center text-devarana-midnight pb-2">Prototipos</h2>
                <div className="relative border overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full table-auto">
                        <thead className="bg-devarana-graph bg-opacity-20">
                            <tr>
                                <th className="py-2">Nombre </th>
                                <th>Planos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        { prototipos.map( (item, i) => (
                            <tr key={i} className="text-center">
                                <td className="py-2"> {item.nombre} </td>
                                <td> {item.planos} </td>
                                <td className="text-lg text-devarana-midnight inline-flex">
                                    <span className="px-2"><Button className="border-0"><BsEyeFill/></Button></span>
                                    <span className="px-2"><Button className="border-0"><BsFillTrashFill/></Button></span>
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
            <Button className="bg-devarana-midnight text-devarana-pearl" onClick={() => setForm(!form)}> { !form ? 'Agregar Nuevo Prototipo' :  'Ocultar Formulario'} </Button>

            { form? 
                <>
                    <form action="">
                        <div className="py-2">
                            <label htmlFor="" className='text-devarana-midnight'>Nombre Prototipo</label>    
                            <Input className="block w-full border rounded-md px-3 py-1 shadow-md my-2" name="descripcion_prototipo" onChange={handleChange} />
                        </div>
                        <div className="py-2">
                            <label htmlFor="" className='text-devarana-midnight'>Planos</label>    
                            <Dropzone setFoto={setFoto} thumbS="w-full border border-devarana-pink" />
                        </div>

                        <Button className={"bg-devarana-midnight text-white mt-6 block ml-auto"}> Guardar </Button>
                    </form>
                </>
                : null

            }
        </div>
     );
}
 
export default AdminEtapasView;