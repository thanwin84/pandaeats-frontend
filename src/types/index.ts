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
export type Restaurant = {
    _id: string,
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: [string, ...string[]];
    menuItem: {
        name: string;
        price: number;
        _id: string
    }[];
    imageUrl?: {
        url: string,
        publicId: string
    }
}
export type CartItem = {
    _id: string
    name: string
    quantity: number
    price: number
}
type deliveryDetails = {
    email: string,
    name: string,
    addressLine1: string,
    city: string
}
export type OrderStatus = 'placed'| "paid"| "inProgress"| "delivered" | "outForDelivery"
export type Order = {
    _id: string,
    restaurant: string,
    user: string,
    deliveryDetails: deliveryDetails,
    cartItems: CartItem[],
    status: OrderStatus,
    createdAt:string,
    updatedAt: string,
    totalAmount: number,
    userInfo: User,
    restaurantDetails: Restaurant
}
export type MyOrder = {
    _id: string,
    restaurant: string,
    deliveryDetails: deliveryDetails,
    cartItems: CartItem[],
    status: OrderStatus,
    createdAt:string,
    updatedAt: string,
    totalAmount: number,
    user: User
}


export type SearchRestaurantsResponse = {
    data: Restaurant[],
    pagination: {
        total: number,
        page: number,
        pages: number
    }
}