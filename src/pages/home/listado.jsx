import { useState } from "react";
import Button from "../../components/button";
import Modal from "../../components/modal";

const Listado = () => {

    const [modal, showModal] = useState(false)


    return ( 
        <>
            <div className="grid grid-cols-12 p-10">
                <div className="md:col-span-4 col-span-2">
                    <h1>Terraza</h1>
                    <p>Departamento 505</p>
                </div>
                <div className="md:col-span-8 col-span-10">

                    <table class="table-auto w-full">
                        <thead>
                            <tr>
                                <th>Eleventos a evaluar</th>
                                <th>Cumple</th>
                                <th>No Cumple</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Piso porcelánico rectificado</td>
                                <td><input type="radio" name="op1" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>
                                <td><input onClick={ () => showModal(true) } type="radio" name="op1" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>

                            </tr>
                            <tr>
                                <td>Ventanería premium en aluminio obscuro</td>
                                <td><input type="radio" name="op2" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>
                                <td><input onClick={ () => showModal(true) }  type="radio" name="op2" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>

                            </tr>
                            <tr>
                                <td>Acabado de granito en cocina</td>
                                <td><input type="radio" name="op3" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>
                                <td><input onClick={ () => showModal(true) } type="radio" name="op3" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>

                            </tr>
                            <tr>
                                <td>Monomando tipo extraíble en cocina</td>
                                <td><input type="radio" name="" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>
                                <td><input onClick={ () => showModal(true) } type="radio" name="op4" id="" className="block w-full border rounded-md px-3 py-2 mx-auto my-2"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal title={"Subir información"} modal={modal} showModal={showModal}>
                
                <div>
                    <Button className={"bg-devarana-pink text-white py-8 px-8"}>Subir Foto</Button>
                    <Button className={"bg-devarana-pink text-white py-8 px-8"}>Comentario</Button>
                </div>
                <div className="border shadow my-4 py-2 px-2">
                    <div className="grid grid-cols-3 gap-5">
                        <div className="p-4 bg-devarana-blue rounded-md h-32"> Foto </div>
                        <div className="p-4 bg-devarana-blue rounded-md h-32"> Foto </div>
                        <div className="p-4 bg-devarana-blue rounded-md h-32"> Foto </div>
                    </div>
                </div>
                <div className="border shadow my-4 py-2 px-2">
                    <label htmlFor="">Escribe un breve resumen del problema</label>
                    <textarea name="" id=""  className="block w-full border shadow-sm rounded-md px-3 py-2 mx-auto my-2"></textarea>
                    <Button className={"bg-devarana-pink text-white"}>Guardar</Button>
                </div>
            </Modal>
        </>
     );
}
 
export default Listado;