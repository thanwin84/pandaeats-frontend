import { useAuth0 } from "@auth0/auth0-react";
import LoadingButton from "../LoadingButton";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useUserInformation } from "@/api/MyUserApi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

type Props = {
  className?: string
  onCheckout: (formData:UserFormData)=> void
  checkoutLoading: boolean
};

export default function CheckoutButton({
   onCheckout,
   checkoutLoading
}: Props) {
    const {
        isAuthenticated,
        isLoading:isAuthLoading,
        loginWithRedirect
    } = useAuth0()
    const {pathname} = useLocation()
    const {
        isPending:getUserLoading,
        currentUser
    } = useUserInformation()
    
    async function onLogin(){
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }
    if (isAuthLoading || !currentUser || getUserLoading){
        return <LoadingButton className="w-full" />
    }
    if (!isAuthenticated){
        return (
            <Button
                className="bg-orange-500 hover:bg-orange-600 w-full"
                onClick={onLogin}
            >
                Login to Checkout
            </Button>
        )
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className='w-full bg-orange-400 hover:bg-orange-500'>
                Go to checkout
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 p-0">
            <DialogHeader>
                <DialogTitle className="hidden">Confirm Form details</DialogTitle>
                <DialogDescription>
                    <UserProfileForm
                        user={currentUser} 
                        isLoading={checkoutLoading}
                        onSave={onCheckout}
                        title="Confirm your address"
                        buttonText="Continue to payment"
                    />
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}