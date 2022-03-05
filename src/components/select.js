const Select = ({children, className, ...props}) => {
    return ( 
        <select 
            className={`border rounded-md px-3 py-2 shadow-md my-2 ${className}`}
            {...props}
        >
            {children}
        </select>
     );
}
 
export default Select;