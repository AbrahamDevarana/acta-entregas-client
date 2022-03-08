const ErrorDisplay = ({errors, alert}) => {
    return ( 
        <>
        { alert? <p className={alert.classes}> {alert.msg} </p> : null }
        { errors ?  
        Object.values(errors).map( (item, key) => (
            <p key={key} className="text-red-500 font-bold uppercase text-center"> {item} </p>
        ))
        : ''}
        </>
     );
}
 
export default ErrorDisplay;