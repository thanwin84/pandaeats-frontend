import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

type props = {
    className?: string
}

export default function Navlinks({className}:props){
    const {logout} = useAuth0()

    return (
        <span className={`font-semibold  flex flex-col text-center space-y-2 ${className}`}>
            <Link 
                className='py-2 hover:bg-orange-400 hover:text-white rounded-md'
                to="/user-profile">
                User Profile
            </Link>
            <Link 
                className='py-2 hover:bg-orange-400 hover:text-white rounded-md'
                to="/restaurant-management">
                Manage Restaurant
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