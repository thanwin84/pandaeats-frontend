import customFetch from "@/utils/customFetch"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string,
        name: string,
        quantity: number
    }[]
    deliveryDetails: {
        email: string,
        name: string,
        addressLine1: string,
        city: string
    },
    restaurantId: string
}
const baseURL = import.meta.env.VITE_BASE_URL as string

export const useCheckoutSession = ()=>{
    const {getAccessTokenSilently} = useAuth0()

    const createSessionRequest = async(sessionData:CheckoutSessionRequest)=>{
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await customFetch.post(
                `${baseURL}/orders/checkout/create-checkout-session`,
                sessionData,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            return response.data.data
        } catch (error) {
            throw error
        }
    }

    const {
        mutateAsync:createCheckout,
        isPending,
        isError,
        reset,
        error
    } = useMutation(
        {
            mutationFn: createSessionRequest
        }
    )
    if (isError){
        toast.error(error?.message)
        reset()
    }
    return {
        createCheckout,
        isPending
    }
}