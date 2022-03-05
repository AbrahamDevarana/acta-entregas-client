const Listado = () => {
    return ( 
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-4">
                    <h1>Terraza</h1>
                    <p>Departamento 505</p>
                </div>
                <div className="col-span-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-6">
                            <ul>
                                <li> ---- Lista de Elementos ----- </li>
                                <li>Piso porcelánico rectificado</li>
                                <li>Ventanería premium en aluminio obscuro</li>
                                <li>Acabado de granito en cocina</li>
                                <li>Monomando tipo extraíble en cocina</li>
                                <li>Piso porcelánico rectificado</li>
                                <li>Ventanería premium en aluminio obscuro</li>
                                <li>Acabado de granito en cocina</li>
                                <li>Monomando tipo extraíble en cocina</li>
                                <li>Piso porcelánico rectificado</li>
                                <li>Ventanería premium en aluminio obscuro</li>
                                <li>Acabado de granito en cocina</li>
                                <li>Monomando tipo extraíble en cocina</li>
                                <li>Piso porcelánico rectificado</li>
                                <li>Ventanería premium en aluminio obscuro</li>
                                <li>Acabado de granito en cocina</li>
                                <li>Monomando tipo extraíble en cocina</li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <ul>
                                <li>-- Si --</li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <ul>
                                <li>-- No --</li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                                <li><input type="radio" name="" id="" /></li>
                            </ul>
                        </div>
                        <div className="col-span-2">
                            <ul>
                                <li>-- Foto --</li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                                <li><button>Subir Foto</button></li>
                            </ul>
                        </div>
                        <div className="col-span-2">
                            <ul>
                                <li>-- Comentarios --</li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                                <li><button>Comentarios</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Listado;