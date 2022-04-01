import StylePlusPlano from "../../assets/img/departamentos/style_plus"; 

const PlanoDepartamento = () => {
    const zonaSeleccion = (e) => {
        console.log(e.target.id);
    }

    return ( 
        <div className="bg-devarana-pearl min-h-screen">
            <StylePlusPlano zonaSeleccion={zonaSeleccion}/> 
        </div>
     );
}
 
export default PlanoDepartamento;