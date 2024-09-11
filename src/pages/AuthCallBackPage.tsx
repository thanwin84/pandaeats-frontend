import { useCreateUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallBackPage(){
    const {user} = useAuth0()
    const {createUser} = useCreateUser()
    const hasCreated = useRef(false)
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        if (user?.sub && user?.email && !hasCreated.current){
            createUser({auth0Id: user.sub, email: user.email})
            hasCreated.current = true
        }
        navigate("/")
       
    },[user, navigate, createUser])
    return <div>loading...</div>
}