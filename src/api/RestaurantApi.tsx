
import { SearchState } from "@/pages/Search"
import { Restaurant, SearchRestaurantsResponse } from "@/types"
import customFetch from "@/utils/customFetch"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
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

export const useSearchRestuarants = (city:string="", searchState:SearchState)=>{
    const searchRestaurantRequest = async():Promise<SearchRestaurantsResponse>=>{
        const params = new URLSearchParams()
        params.append("searchQuery", searchState.searchQuery)
        params.append("page", searchState.page.toString())
        searchState.selectedCuisines.forEach(option =>{
            params.append("selectedCuisines", option)
        })
        params.append('sortOption', searchState.sortOption)
        console.log(searchState.sortOption)

        try {
            const {data} = await customFetch.get(`${baseURL}/restaurants/search/${city}?${params.toString()}`)
            return data.data
        } catch (error) {
            if (error instanceof Error){
                const axiosError = error as any
                throw new Error(axiosError?.response?.data.message)
            }
            throw new Error("An unknown error has occured")
        }
    }
    const {
        data:restuarantResults,
        isLoading
    } = useQuery(
        {
            queryKey: ['matched-restaurant-response', searchState],
            queryFn: searchRestaurantRequest
        }
    )
    return {
        restuarantResults,
        isLoading
    }
}

export const useGetRestaurantById = ()=>{
    const {restaurantId} = useParams()
    const getRestaurantByIdRequest = async():Promise<Restaurant|never>=>{
        try {
            const response = await customFetch.get(`${baseURL}/restaurants/${restaurantId}`)
            return response.data.data
        } catch (error) {
            throw error
        }
    }
    const {
        data: restaurant,
        isLoading
    } = useQuery(
        {
            queryKey: ['restaurantbyId'],
            queryFn: getRestaurantByIdRequest
        }
    )
    return {
        restaurant,
        isLoading
    }
}