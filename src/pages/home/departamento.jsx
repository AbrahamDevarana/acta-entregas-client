import { useNavigate } from "react-router-dom";
import DptoPlano from "../../assets/img/cliente/dptoPlano.png"

const PlanoDepartamento = () => {
    const navigate = useNavigate()
    return ( 
        <>
            <div>
                Departamento bla bla bla
            </div>
            <img src={DptoPlano} alt="" className="w-full" onClick={()=> navigate('listado')}/>
        </>
     );
}
 
export default PlanoDepartamento;