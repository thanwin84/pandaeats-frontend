import { useCreateRestaurant, useGetMyRestaurant, useUpdateRestaurant } from "@/api/RestaurantApi";
import Spinner from "@/components/Spinner";
import ManageRestaurantForm from "@/forms/user-profile-form/mange-restaurant-form/ManageRestaurantForm";
import Layout from "@/layouts/Layout";

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
    return (
        <Layout showHero={false} className="py-4 px-8">
            <ManageRestaurantForm
                isLoading={isEditing ? updateLoading: isPending}
                onSave={restaurant ? updateRestaurant: createRestaurant}
                restaurant = {restaurant}
            />
        </Layout>
    )
}