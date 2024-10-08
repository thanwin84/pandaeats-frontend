import customFetch from "@/utils/customFetch"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

const baseURL = import.meta.env.VITE_BASE_URL
   
export const useUserInformation = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const getUserRequest = async()=>{
        const accessToken = await getAccessTokenSilently()
        try {
            const {data} = await customFetch.get(
                `${baseURL}/users`,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
                
            )
            return data.data
           
        } catch (error) {
            
          throw  new Error("Failed to retrieve User information")
        }
    }
    const {
        isPending, 
        error, 
        data:currentUser, 
        isError
    } = useQuery({
        queryKey: ['user-information'],
        queryFn: getUserRequest
    })
    
    
    return {
        isPending,
        currentUser,
        error,
        isError
    }
}

type CreateUserRequest = {
    auth0Id: string,
    email: string
}



export const useCreateUser = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    const createMyUserRequest = async(user:CreateUserRequest)=>{  
        const accessToken = await getAccessTokenSilently()
        try {
            await customFetch.post(
                `${baseURL}/users`,
                user,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    const {
        mutateAsync: createUser,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn:(user:CreateUserRequest)=>createMyUserRequest(user)
    })

    return {
        createUser,
        isError,
        isPending,
        isSuccess
    }
} 

type UserFormData = {
    name:string,
    addressLine1: string,
    city: string,
    country: string
}
export const useUpdateUser = ()=>{
    const {getAccessTokenSilently} = useAuth0()
    
    
    const updateUserRequest = async(formData:UserFormData)=>{
        const accessToken = await getAccessTokenSilently()
        
        try {
            await customFetch.put(
                `${baseURL }/users/profile`,
                formData,
                {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                }
                
            )
           
        } catch (error) {
            
            throw new Error("Faild to Update request")
        }
    }
    const {
        mutateAsync:updateUser,
        isPending,
        isError,
        isSuccess,
        error,
        reset
    } = useMutation({mutationFn:updateUserRequest})
    if (isSuccess){
        toast.success('User profile is updated successfully')
        reset()
    }
    if (isError){
        toast.error(error.toString())
        reset()
    }
    return { 
        updateUser,
        isPending
    }
}

