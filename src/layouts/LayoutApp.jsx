import { useLocation, useNavigate } from "react-router-dom";
const LayoutApp = (props) => {

    const { children } = props
    const location = useLocation()
    const navigate = useNavigate()
        
    return ( 
        <>
        { location.pathname !== "/" ?
        <div className="grid grid-cols-2">
            <button onClick={() => navigate("/")} className="text-center bg-devarana-gray text-white py-2 hover:opacity-80 auto"> Home </button>
            <button onClick={()=> navigate(-1)} className="text-center bg-devarana-gray text-white py-2 hover:opacity-80 col-span-1"> Volver </button> 
        </div>
        : "" } 
            {children}
        </>
     );
}
 
export default LayoutApp;