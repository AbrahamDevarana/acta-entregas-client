import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDesarrollosAction, cleanDesarrolloAction } from "../../../actions/desarrolloActions";
import Button from "../../../components/button";
// import Button from "../../../components/button";
import Spinner from '../../../components/spinner';


const AdminDesarrollos = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const desarrollo = useSelector( state => state.desarrollo.desarrollo)
    const loading = useSelector(state => state.desarrollo.loading)

    useEffect(() => {
      dispatch(getDesarrollosAction())

      dispatch(cleanDesarrolloAction())
    
      // eslint-disable-next-line
    }, [])
    if(loading) return <Spinner/>

    return (     
        <div className='max-w-[1000px] m-auto w-full px-5 py-10'>
            <Button className={"bg-devarana-midnight text-white mb-4 block ml-auto uppercase"} onClick={ () => navigate("create")}><i className="fa-solid fa-plus"></i> Nuevo Desarrollo </Button>
            <div className="grid grid-cols-3 md:gap-10">
                { desarrollo && desarrollo.length > 0 ? 
                    desarrollo.map((item, index) => (
                        <div key={index} className="shadow border rounded">
                            <img src={`${process.env.REACT_APP_URL}/verDesarrollo/${item.id}`} alt={`${item.descripcion}`} className="w-full h-[180px]"/>
                            <div className="px-10 py-4">
                                <p className="text-center"> {item.descripcion} </p>
                                <p className="py-2"> Etapas: { item.etapas? item.etapas.length : 0  } </p>
                                <Button className={"bg-devarana-graph text-white block uppercase w-full"} onClick={ () => navigate(`edit/${item.id}`)}> Ver </Button>
                                
                            </div>
                        </div>
                    ))    
                    :
                    null
                }
            </div>
        </div>
     );
}
 
export default AdminDesarrollos;