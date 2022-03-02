const Layout = (props) => {

    const { children } = props
    
    return ( 
        <>
        <div className="grid grid-cols-2">
            <button className="text-center bg-devarana-gray text-white py-2 hover:opacity-80"> Home </button>
            <button className="text-center bg-devarana-gray text-white py-2 hover:opacity-80"> Back </button>
        </div>
            {children}
        </>
     );
}
 
export default Layout;