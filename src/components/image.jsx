import Spinner from '../components/spinner'


const Image = ({ fileName, alt, className, status, ...props}) => {
    if(error) return {alt}
    return ( 
        <>
            {loading ? 
                <Spinner/>
            :
                <img src={image} alt={alt} {...props} className={className} />
            }
        </>
     );
}
 
export default Image;