import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import {
    UserDropDownMenu
} from "../components"

export default function MainNav(){
    const {loginWithRedirect, isAuthenticated} = useAuth0()
    return (
        <>
        {isAuthenticated ? (
            <UserDropDownMenu/>
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