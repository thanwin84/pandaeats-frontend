import customFetch from "@/utils/customFetch"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

const baseURL = import.meta.env.VITE_BASE_URL

export const useCreateRestaurant = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const createRestaurantRequest = async(formData:FormData)=>{
        const accessToken =await  getAccessTokenSilently()
        
        try {
            await customFetch.post(
                `${baseURL}/restaurants`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
        } catch (error) {
            if (error instanceof Error){
                const axiosError = error as any
                throw new Error(axiosError?.response?.data.message)
            }
            throw new Error("An unknown error has occured")

        }
    }
    const {
        mutateAsync: createRestaurant,
        isPending,
        isError,
        isSuccess,
        error,
        reset
    } = useMutation({
        mutationFn: createRestaurantRequest
    })
    if (isError){
        toast.error(error.message)
        reset()
    }
    if (isSuccess){
        toast.success("Restaurant is created successfuly")
        reset()
    }
    return {
        createRestaurant,
        isPending
    }
}

export const useGetMyRestaurant = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const getMyRestaurantRequest = async()=>{
        const accessToken = await getAccessTokenSilently()
        try {
            const response = await customFetch.get(`${baseURL}/restaurants`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data.data
        } catch (error) {
            if (error instanceof Error){
                const axiosError = error as any
                throw new Error(axiosError?.response?.data.message)
            }
            throw new Error("An unknown error has occured")
        }
    }
    const {
        data,
        isError,
        isPending
    } = useQuery({
        queryKey: ['my-restaurant'],
        queryFn: getMyRestaurantRequest
    })
    return {
        data,
        isPending
    }
}

export const useUpdateRestaurant = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const updateRestaurantRequest = async(formData:FormData)=>{
        const accessToken =await  getAccessTokenSilently()
        
        try {
            await customFetch.put(
                `${baseURL}/restaurants`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
        } catch (error) {
            console.log(error)
            if (error instanceof Error){
                const axiosError = error as any
                throw new Error(axiosError?.response?.data.message)
            }
            throw new Error("An unknown error has occured")

        }
    }
    const {
        mutateAsync: updateRestaurant,
        isPending,
        isError,
        isSuccess,
        error,
        reset
    } = useMutation({
        mutationFn: updateRestaurantRequest,
        retry: 1
    })
    if (isError){
        toast.error(error.message)
        reset()
    }
    if (isSuccess){
        toast.success("Restaurant is updated successfuly")
        reset()
    }
    return {
        updateRestaurant,
        isPending
    }
}