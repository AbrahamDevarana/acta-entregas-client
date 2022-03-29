import { useCallback, useMemo, useState } from "react";
import { useDropzone } from 'react-dropzone'

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

const Dropzone = ({setFoto, thumbS}) => {

  const thumbSize = thumbS? thumbS : "w-36 pb-4"

  const [files, setFiles] = useState([]);
  
  const fileType = "image/jpeg, image/png, .svg"

  const onDrop = useCallback(acceptedFiles => {
      const preview = document.getElementById("preview")
      
        if(preview){
          preview.innerHTML = ""
        }
        
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        setFoto(acceptedFiles[0])
      }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: fileType,
        minSize: 0,
        maxSize: 2048000
    });

      const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);

      const thumbs = files.map(file => (
        <div key={file.name}>
          <img
            className={`m-auto  ${thumbSize}`}
            src={file.preview}
            alt={file.name}
          />
        </div>
      ));
    return ( 
        // <div {...getRootProps()} className="p-4 border shadow rounded hover:bg-devarana-graph hover:bg-opacity-30">
        //     <input className="border shadow rounded px-2 py-4" {...getInputProps()} />
        //     <div>Arrastra tu aquí o da click.</div>
        // </div>
        <section>
            <aside className="m-auto">
                {thumbs}
            </aside>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
            <div>
                {isDragAccept && (<p>Imagen Válida</p>)}
                {isDragReject && (<p>Archivo no es válido</p>)}
                {!isDragActive && (<p>Arrastra tu imagen o da click</p>)}
            </div>
            </div>
            
        </section>
     );
}


 
export default Dropzone;