import { useNavigate } from "react-router-dom";
import Button from "../../components/button";



const Busqueda = () => {

    const navigate = useNavigate()

    return ( 
        <>
        <div className="h-screen w-screen flex bg-devarana-graph">
            <div className="m-auto">
            <h1 className="font-mulish text-white text-8xl">Tu Depa!</h1>
                <Button className={"block mx-auto my-10 text-white bg-devarana-pink text-2xl "} onClick={() => {navigate("/residencia")}}>Comenzar</Button>
            </div>
        </div>
        </>
     );
}
 
export default Busqueda;