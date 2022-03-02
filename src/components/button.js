const Button = ({children, className, ...props}) => {
    
    return ( 
        <button className="rounded-md border py-2 px-2 font-bold hover:opacity-80">
            {props}
        </button>
     );
}
 
export default Button;