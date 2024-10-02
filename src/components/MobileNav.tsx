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
import { links } from "@/utils/navLinks";
import { Link } from "react-router-dom";

export default function MobileNav(){
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0()
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
                <SheetDescription className="hidden">
                    Navlinks drop down
                </SheetDescription>
                {isAuthenticated ? (
                        <div className="flex flex-col gap-2 text-center">
                            {links.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="py-2  hover:text-orange-500 font-semibold rounded-md"
                                >
                                {link.name}
                                </Link>
                            ))}
                            <Button
                                onClick={()=>logout()}
                                className='bg-orange-300 hover:bg-orange-400'
                            >
                                Log out
                            </Button>
                        </div>
                    ): (
                        <Button
                            className="w-full font-bold bg-orange-500"
                            onClick={async()=>await loginWithRedirect()}
                        >
                            Log in
                        </Button>
                    )}
            </SheetContent>
        </Sheet>
    )
}