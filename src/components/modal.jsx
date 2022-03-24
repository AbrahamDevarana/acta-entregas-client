import Button from "./button";


const Modal = ({title, children, className, modal, showModal, ...props}) => {
    return ( 
        <>
            <div className={`fixed inset-0 z-20 overflow-y-auto ${ !modal ? "invisible opacity-0" : "opacity-100" } ease-in-out transition-all duration-300`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="relative inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full m-auto w-10/12">
                        <div className="absolute -right-5 -top-5 z-20"><Button onClick={() => showModal(false)} className={"border-0 rounded-full bg-white"}><i className="fa-solid fa-xmark px-1"></i></Button></div>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="my-3 text-center w-full">
                                    <h3 className="py-2 text-3xl leading-6 text-gray-900 uppercase font-bold" id="modal-title">{title}</h3>
                                    <div className="mt-2">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button onClick={() => showModal(false)} className="bg-devarana-graph text-white" >Salir</Button>
                            </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Modal;