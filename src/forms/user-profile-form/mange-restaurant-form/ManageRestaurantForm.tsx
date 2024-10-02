import { Form } from "@/components/ui/form"
import { formSchema, RestaurantFormData, Restaurant } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import DetailsForm from "./DetailsForm"
import { Button } from "@/components/ui/button"
import CuisineForm from "./CuisineForm"
import MenuItemsForm from "./MenuItemsForm"
import ImageUploadSection from "./ImageUploadSection"
import { LoadingButton } from "@/components"
import { useEffect } from "react"

type Props = {
    isLoading?: boolean,
    onSave: (restaurantFormData: FormData)=>void,
    className?: string,
    restaurant?: Restaurant
}
export default function ManageRestaurantForm({
    onSave,
    isLoading,
    className,
    restaurant
}:Props){
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:  {
            cuisines: [],
            menuItem: [{name: "", price: 0}],
            restaurantName: "",    // Default value for each field
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0
        }
    })

    useEffect(()=>{
        if (!restaurant) return
        else {
            const {restaurantName, estimatedDeliveryTime, deliveryPrice, cuisines, menuItem, city, country} = restaurant
            form.reset({restaurantName, estimatedDeliveryTime, deliveryPrice, cuisines, menuItem, city, country})
        }
    }, [restaurant])
    
    const onSubmit = (formDataJson: RestaurantFormData)=>{
        //todo- convert formDataJson to a new formData Object
        const {
            restaurantName, 
            city, 
            country, 
            cuisines,
            menuItem, 
            estimatedDeliveryTime, 
            deliveryPrice,
            imageFile
            } = formDataJson
        const formData = new FormData()
        formData.append('restaurantName', restaurantName)
        formData.append('city', city)
        formData.append('country', country)
        formData.append('deliveryPrice', (deliveryPrice).toString())
        formData.append("estimatedDeliveryTime", estimatedDeliveryTime.toString())
        cuisines.forEach((value, index) =>{
            formData.append(`cuisines[${index}]`, value)
        })
        menuItem.forEach((value, index)=>{
            formData.append(`menuItem[${index}][name]`, value.name)
            formData.append(`menuItem[${index}][price]`, (value.price).toString())
        })
        if (imageFile) formData.append('imageFile', imageFile)
        onSave(formData)
        
    }

    
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className={`space-y-8 bg-gray-50 p-10 rounded-lg ${className}`}
            >
                <DetailsForm  className="border-b-2 border-gray-200 pb-6 "/>
                <CuisineForm className="border-b-2 border-gray-200 pb-6" />
                <MenuItemsForm className="border-b-2 border-gray-200 pb-6" />
                <ImageUploadSection imageUrl={restaurant?.imageUrl?.url} />
                {isLoading ? <LoadingButton/>: (
                    <Button type="submit">submit</Button>
                )}
            </form>

        </Form>
    )
}