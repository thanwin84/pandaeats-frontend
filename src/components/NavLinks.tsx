import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

type props = {
    className?: string
    close?: ()=> void
}

export default function Navlinks({className, close}:props){
    const {logout} = useAuth0()

    return (
        <span className={`font-semibold  flex flex-col text-center space-y-1 ${className}`}>
            <Link 
                onClick={close}
                className='py-2 hover:bg-orange-300 hover:text-white rounded-md'
                to="/user-profile">
                User Profile
            </Link>
            <Link 
             onClick={close}
                className='py-2 hover:bg-orange-300 hover:text-white rounded-md'
                to="/restaurant-management">
                Manage Restauranrt
            </Link>
            
            <Button
                onClick={()=>logout()}
                className='bg-orange-300 hover:bg-orange-400'
            >
                Log out
            </Button>
        </span>
    )
}