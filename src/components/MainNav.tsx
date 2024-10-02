import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import {
    UserDropDownMenu
} from "../components"
import { Link } from "react-router-dom";

export default function MainNav(){
    const {loginWithRedirect, isAuthenticated} = useAuth0()
    return (
        <>
        {isAuthenticated ? (
            <div className="flex gap-4" >
                <Link to="/order-status" className="my-auto text-orange-500 hover:font-semibold">
                    Order Status
                </Link>
                <UserDropDownMenu/>
                
            </div>
        ): (
            <Button
                variant='ghost'
                className="font-bold hover:text-orange-500 hover:bg-white"
                onClick={async()=> await loginWithRedirect()}
            >
                Login
            </Button>
        )}
        </>
    )
}  