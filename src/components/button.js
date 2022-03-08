const Button = ({children, className, ...props}) => {
    
    return ( 
        <button 
            className={`rounded-md border py-1 px-2 font-bold hover:opacity-80 ${className}`}
            {...props}
        >
            {children}
        </button>
     );
}
 
export default Button;