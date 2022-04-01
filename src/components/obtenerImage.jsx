const ObtenerImage = ({urlImage}) => {
    const preview = document.querySelector('#preview')

    fetch( `${process.env.REACT_APP_URL}/${urlImage}` )
        .then(result => result.text())
        .then( svg =>  preview.innerHTML = svg)
        
        .catch((err) => {
            console.log(err);
    });

    return ( 
    <>
        <div id="preview"></div>
    </> 
    );
}
 
export default ObtenerImage;