import {z} from 'zod' 
export type User = {
    _id: string,
    name?: string,
    addressLine1?: string,
    city?: string,
    country?: string
    
}


export const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant is required"
    }),
    city: z.string({
        required_error: "city is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryPrice: z.coerce.number({
        invalid_type_error: "must be a valid number",
        required_error: "Delivery price is required"
    }).gte(0, "Price must be a positive number"),
    estimatedDeliveryTime:  z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "must be a valid number"
    }).gte(0, "Time must be postive"),
    cuisines: z.string().array().nonempty("Please select at least one item"),
    menuItem: z.array(
        z.object({
            name: z.string().min(1, 'Name is required'),
            price: z.coerce.number({message: "price is required"})
            .gte(0, "Price must be valid number")
        })
    ),
    imageFile: z.instanceof(File, {message: "Image file is missing"}).optional()

})

export type RestaurantFormData = z.infer<typeof formSchema>
export type RestaurantResponse = {
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: [string, ...string[]];
    menuItem: {
        name: string;
        price: number;
    }[];
    imageUrl?: {
        url: string,
        publicId: string
    }
}
