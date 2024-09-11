import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet" 
import { Menu, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import Navlinks from "./NavLinks";

export default function MobileNav(){
    const {user, isAuthenticated, loginWithRedirect} = useAuth0()
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3 ">
                <SheetTitle className="pb-4 border-b">
                    {!isAuthenticated ? (
                        <span>Welcome to PandaEats.com!</span>
                    ):(
                        <span className="flex gap-4 my-auto">
                            <UserIcon className="text-orange-500 my-auto" size={22} />
                            {user?.email}
                        </span>
                    )}
                </SheetTitle>
                <SheetDescription className="pt-2 mx-auto">
                    {isAuthenticated ? (
                        <Navlinks className=""/>
                    ): (
                        <Button
                            className="w-full font-bold bg-orange-500"
                            onClick={async()=>await loginWithRedirect()}
                        >
                            Log in
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}