import { useCreateRestaurant, useGetMyRestaurant, useUpdateRestaurant } from "@/api/RestaurantApi";
import Spinner from "@/components/Spinner";
import ManageRestaurantForm from "@/forms/user-profile-form/mange-restaurant-form/ManageRestaurantForm";
import Layout from "@/layouts/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantOrderList from "@/components/manage-orders/RestaurantOrderList";

export default function ManageRestaurant(){
    const {isPending, createRestaurant} = useCreateRestaurant()
    const {data:restaurant, isPending:restaurantDataLoading} = useGetMyRestaurant()
    const {isPending:updateLoading, updateRestaurant} = useUpdateRestaurant()
    
    
    if (restaurantDataLoading){
        return (
            <div className="h-screen w-full">
                <Spinner className="mx-auto my-auto" />
            </div>
        )
    }
    const isEditing = !!restaurant
    const tabs = {manageOrders: "manageOrders", manageRestaurant: "manageRestaurant"}
    return (
        <Layout showHero={false} className="py-4 px-8">
            <Tabs defaultValue={tabs.manageRestaurant}  >
                <TabsList className="flex">
                    <TabsTrigger className="flex-1" value={tabs.manageRestaurant}>Manage Restaurant</TabsTrigger>
                    <TabsTrigger className="flex-1" value={tabs.manageOrders}>Manage Orders</TabsTrigger>
                </TabsList>
                <TabsContent value={tabs.manageRestaurant}>
                    <ManageRestaurantForm
                        isLoading={isEditing ? updateLoading: isPending}
                        onSave={restaurant ? updateRestaurant: createRestaurant}
                        restaurant = {restaurant}
                    />
                </TabsContent>
                <TabsContent value={tabs.manageOrders} >
                    <RestaurantOrderList  deliveryPrice={restaurant?.deliveryPrice} />
                </TabsContent>
            </Tabs>
            
        </Layout>
    )
}