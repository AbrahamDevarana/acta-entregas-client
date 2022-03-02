const LayoutLogin = (props) => {
    const { children } = props
    
    return ( 
        <div className="h-screen w-screen flex p-5 bg-devarana-graph">
            {children}
        </div>
     );
}
 
export default LayoutLogin;