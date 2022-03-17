import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../actions/authActions"

const LayoutLogin = (props) => {
    const { children } = props
    
    const dispatch = useDispatch()
    const check = useSelector(state => state.auth)
    const {auth, loading} = check

    const navigate = useNavigate()
    useEffect( () => {
        dispatch( getUserInfo())
        // eslint-disable-next-line
    }, [])

    if(auth && !loading) {
        navigate("/admin")
    } 

    return ( 
        <div className="h-screen w-screen flex p-5 bg-devarana-graph">
            {children}
        </div>
     );
}
 
export default LayoutLogin;