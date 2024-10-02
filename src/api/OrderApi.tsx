import { MyOrder, Order } from "@/types"
import customFetch from "@/utils/customFetch"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@tanstack/react-query"
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

export const useGetMyOrders = (category:string)=>{
    const {getAccessTokenSilently} = useAuth0()

    const getMyOrdersRequest = async():Promise<Order[]>=>{
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await customFetch.get(
                `${baseURL}/orders?category=${category}`,
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
        data: myOrders,
        isLoading
    } = useQuery(
        {
            queryKey: ['myorders', category],
            queryFn: getMyOrdersRequest,
            refetchInterval: category === 'present'? 5000: false
        }
    )
    return {
        myOrders,
        isLoading
    }
}

export const useGetMyRestaurantOrders = ()=>{
    const {getAccessTokenSilently} = useAuth0()

    const getMyRestaurantOrders = async():Promise<MyOrder[]>=>{
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await customFetch.get(
                `${baseURL}/orders/my-orders`,
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
        data: orders,
        isLoading
    } = useQuery(
        {
            queryKey: ['my-restaurant-orders'],
            queryFn: getMyRestaurantOrders
        }
    )
    return {
        orders,
        isLoading
    }
}
type UpdateStatusType = {
    orderId: string
    status: string
}
export const useUpdateOrderStatus = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const updateOrderStatusRequest = async(data:UpdateStatusType)=>{
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await customFetch.patch(
                `${baseURL}/orders/${data.orderId}/update-status`,
                {status: data.status},
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            
        } catch (error) {
            
            throw error
        }
    }
    const {
        mutate:updateOrderStatus,
        isSuccess,
        isError,
        isPending,
        reset
    } = useMutation({mutationFn:updateOrderStatusRequest})

    if (isSuccess){
        toast.success("Order status is updated successfully")
        reset()
    }
    if (isError){
        toast.error("Something went wrong while updating")
        reset()
    }
    return {
        isPending,
        updateOrderStatus
    }
}