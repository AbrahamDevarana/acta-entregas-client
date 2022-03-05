import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate()
    // console.log(`isItConnected ${window.navigator.onLine}`);
    // window.addEventListener('online', () => console.log('Became online'));
    // window.addEventListener('offline', () => console.log('Became offline'));
    
    return ( 
        <>
            <div className="bg-devarana-gray h-screen w-screen flex">
                <div className="m-auto max-w-[500px] w-full">
                    <h1 htmlFor="" className="text-white text-center font-mulish text-3xl"> Buscar Departamento </h1>
                    <Input type="text" placeholder="Ingresa número de departamento" className="block w-full border rounded-md px-3 py-2 shadow-md my-2"/>
                    <Select className="block w-full">
                        <option value="" disabled selected> -- Seleccione una opción </option>
                    </Select>
                    <Button className="text-white bg-devarana-pink my-3" onClick={()=> navigate('/departamento')}>
                        Buscar
                    </Button>
                </div>
            </div>
        </>
    );
}
 
export default Home;