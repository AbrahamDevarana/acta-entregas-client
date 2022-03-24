import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlertAction, showAlertAction } from "../../actions/alertActions";
import ErrorDisplay from "../../components/errors";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";
import { getViviendasAction } from "../../actions/viviendaActions";

import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";


const Registro = () => {

    const dispatch = useDispatch()
    
    const viviendas = useSelector( state => state.vivienda.vivienda)
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.seccion.errors)
    
    const [dropDown, setDropDown] = useState(false)
    const [viviendaList, setViviendaList] = useState({})
    const [cliente, setCliente] = useState({
        name: '',
        email: '',
        vivienda: '',
        clienteForm: true,
        asesor: '',
        tipoEntrega: ''
    });

    const {name, email, vivienda, asesor, tipoEntrega} = cliente

    const handleChange = e => {
        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    useEffect ( () => {
        setViviendaList(viviendas)
    }, [viviendas])

    const handleLoad = () => {
        dispatch(getViviendasAction())
        setDropDown(!dropDown)
    }

    const handleSearch = (e) => {
        filter(e.target.value)
    }

    const filter = (word) => {
        const result = viviendas.filter( item => item.folio.includes(word))
        setViviendaList(result)
    }

    const handleSelect = (vivienda) => {
        setCliente({
            ...cliente,
            vivienda
        });
        setDropDown(false)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if( email.trim() === '' || name.trim() === '' || vivienda !== ''){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }
        dispatch(hideAlertAction())

        if(true){
            setCliente({
                name: '',
                email: '',
                clienteForm: true,
                vivienda: '',
                asesor: '',
                tipoEntrega: ''
            })
        }

        // console.log(dispatch(createNewUsuarioAction(cliente)));
    }

    return ( 
        <div className="bg-devarana-gray h-screen w-screen flex flex-col transition-all duration-1000 ease-in-out">
            <div className="m-auto max-w-[800px] w-full transition-all duration-1000 ease-in-out">
                <ErrorDisplay alert={alert} errors={errors} />
                <h1 className="text-white text-center font-mulish text-3xl pb-10"> Registrar Cliente </h1>
                <form onSubmit={handleSubmit}>
                   <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                        <div className="col-span-1">
                            <label htmlFor="name" className="text-devarana-pearl"> Nombre de cliente </label>
                            <Input id="name" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" placeholder="Nombre" onChange={handleChange}  name="name" value={name} />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="name" className="text-devarana-pearl"> E-mail del cliente </label>
                            <Input id="name" className="block w-full border rounded-md px-3 py-1 shadow-md my-2" placeholder="E-mail"  onChange={handleChange} name="email" value={email} />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="name" className="text-devarana-pearl"> Asesor </label>
                            <Select className="block w-full" defaultValue={'DEFAULT'} name="asesor" value={asesor}>
                                <option value="DEFAULT" disabled> -- Seleccione un :::: -- </option>
                                <option value=""> Estefanía </option>
                                <option value=""> Antonio </option>
                            </Select>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="name" className="text-devarana-pearl" name="tipoEntrega" value={tipoEntrega}> Tipo Entrega </label>
                            <Select className="block w-full" defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled> -- Seleccione tipo de entrega -- </option>
                                <option value="">Demo</option>
                                <option value="">Entrega</option>
                                <option value="">Pre Entrega</option>
                            </Select>
                        </div>


                        <div className="col-span-2 group">
                            <Button onClick={handleLoad} className="text-devarana-pearl" type="button"> Buscar Vivienda   { dropDown ? <AiOutlineUp className="inline" /> : <AiOutlineDown className="inline" /> }  </Button>
                            <div className={`w-full bg-white bordershadow-sm rounded-sm my-2 p-2 ${ dropDown? "block" : "hidden" }`}>
                                <Input onChange={handleSearch} className="w-full border rounded-md px-3 py-2 shadow-md my-2" placeholder="Buscar Vivienda"/>
                                <ul className="max-h-32 overflow-y-scroll">
                                    {viviendaList && viviendaList.length > 0?
                                        viviendaList.map(( item, i ) => (
                                            <li key={i} onClick={() => handleSelect(item)} className="hover:bg-gray-200 cursor-pointer"> {item.folio} </li>
                                        ))
                                        :
                                        null
                                    }
                                </ul>
                            </div>
                            { cliente.vivienda? 
                                <h2 className="text-devarana-pearl font-mulish py-4">Vivienda Seleccionado: {cliente.vivienda.folio}</h2>
                                :
                                null
                            }
                        </div>
                        <div className="py-2">
                            <Button type="submit" className="bg-devarana-pink text-white"> Registrar </Button>
                        </div>
                   </div>
                </form>
            </div>
        </div>
     );
}
 
export default Registro;