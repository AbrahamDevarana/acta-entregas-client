import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showAlertAction, hideAlertAction } from "../../actions/alertActions";
import { loginAction } from "../../actions/authActions";


const Login = () => {

    const dispatch = useDispatch()
    const alert = useSelector( state => state.alert.alert )
    const errors = useSelector( state => state.auth.errors )

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    // Destructurar el state
    const {email, password} = login

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(email.trim() === '' || password.trim() === ''){
            const alert = {
                msg: "Todos los campos requeridos.",
                classes: "text-center font-bold uppercase text-red-500"
            }
            dispatch(showAlertAction(alert))
            return
        }
        dispatch(hideAlertAction())
        dispatch(loginAction(login))
    }

    return ( 
        <>
           <div className="m-auto p-5 border rounded-lg shadow-lg w-full max-w-[500px] bg-devarana-pearl">
               <h1 className="uppercase font-bold text-center text-3xl py-3">Login</h1>
               { alert? <p className={alert.classes}> {alert.msg} </p> : null }
               { errors ?  
                    Object.values(errors).map( (item, key) => (
                        <p key={key} className="text-red-500 font-bold uppercase text-center"> {item} </p>
                    ))
                : ''}
               <form action="" onSubmit={handleSubmit}>
                    <div className="py-2">
                        <label htmlFor="email" className="px-1 font-bold">E-mail</label>
                        <input type="email" value={email} name="email" id="email" className="border rounded-md block px-3 py-2 shadow-md w-full" placeholder="Ingresa tu e-mail" onChange={handleChange}/>
                    </div>
                    <div className="py-2">
                    <label htmlFor="email" className="px-1 font-bold">Contraseña</label>
                        <input type="password" value={password} name="password" id="password" className="border rounded-md block px-3 py-2 shadow-md w-full" placeholder="Ingresa tu contraseña" onChange={handleChange}/>
                    </div>
                    
                    <div className="py-2">
                        <button type="submit" className="rounded-md border py-2 px-2 font-bold bg-devarana-midnight text-devarana-pearl hover:opacity-80"> Enviar </button>
                    </div>
               </form>
           </div>
        </>
     );
}
 
export default Login;