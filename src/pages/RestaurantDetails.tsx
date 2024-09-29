import { useGetRestaurantById } from "@/api/RestaurantApi";
import MenuItem from "@/components/restaurant-details/MenuItem";
import RestaurantInfo from "@/components/restaurant-details/RestaurantInfo";
import OrderSummary from "@/components/restaurant-details/OrderSummary";
import Layout from "@/layouts/Layout";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useParams } from "react-router-dom";
import { useCheckoutSession } from "@/api/OrderApi";

type Props = {
  className?: string;
};

export type CartItem = {
    _id: string
    name: string
    quantity: number
    price: number
}

export type MenuItem = {
    _id: string
    name: string
    price: number
}
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
export default function RestaurantDetails({
    
}: Props) {
    const {restaurantId} = useParams()
    const {restaurant, isLoading} = useGetRestaurantById()
    const [orderState, setOrderState] = useState<CartItem[]>(()=>{
        const storedItems = sessionStorage.getItem(`orderState-${restaurantId}`)
        return storedItems ?JSON.parse(storedItems): []
    })
    const {
        createCheckout,
        isPending
    } = useCheckoutSession()

    
    useEffect(()=>{
        sessionStorage.setItem(`orderState-${restaurantId}`, JSON.stringify(orderState))
    },[orderState])

    if (isLoading || !restaurant){
        return <div>Loading..</div>
    }
    function addToCart(menuItem:MenuItem){

        const itemExists = orderState.find(item=> item.name === menuItem.name)
        if (!itemExists){
            const newState = [...orderState, {...menuItem, quantity: 1}]
            setOrderState(newState)
        }
    }
    function increaseQuantity(menuItem: MenuItem){
        setOrderState(prev => {
            return prev.map(item=> item.name === menuItem.name ? {...item, quantity: item.quantity + 1}: item)
        })
    }
    function decreaseQuantity(menuItem: MenuItem){
        setOrderState(prev => {
            return prev.map(item=> item.name === menuItem.name ? {...item, quantity: item.quantity - 1}: item)
        })
    }
    function deleteItem(menuItem: MenuItem){
        const newState = orderState.filter(item => item.name !== menuItem.name)
        setOrderState(newState)
    }

    async function onCheckout(formData:UserFormData){
        if (!restaurant){
            return
        }
        const deliveryDetails = {
            email: formData.email as string,
            name: formData.name,
            addressLine1: formData.addressLine1,
            city: formData.city
        }
        const cartItems = orderState.map(item=>({menuItemId:item._id, name: item.name, quantity: item.quantity}))

        const checkoutData:CheckoutSessionRequest = {
            deliveryDetails,
            cartItems: cartItems,
            restaurantId: restaurant._id.toString()
        }
        const data = await createCheckout(checkoutData)
        window.location.href = data.url

    }
    
  return (
    <Layout showHero={false} className="pb-6">
       <AspectRatio ratio={16/4} className="py-4 flex w-[90%] md:w-4/5 mx-auto">
       <img src={restaurant?.imageUrl?.url} className="rounded-md object-cover h-full w-full" />
       </AspectRatio>
       <div className="px-6 grid gap-6 md:grid-cols-[3fr_2fr]">
            <section className="space-y-4">
                <RestaurantInfo 
                    name={restaurant.restaurantName}
                    country={restaurant.country}
                    cuisines={restaurant.cuisines || []}
                    city={restaurant.city}
                />
                <MenuItem
                    className=""
                    items={restaurant?.menuItem || []}
                    addToCart={addToCart}
                />
            </section>
            <OrderSummary 
                className="" 
                deliveryPrice={restaurant.deliveryPrice}
                carts={orderState}
                deleteItem={deleteItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                estimatedDeliveryTime={restaurant.estimatedDeliveryTime}
                onCheckout={onCheckout}
                checkoutLoading={isPending}
            />
       </div>
    </Layout>
  );
}