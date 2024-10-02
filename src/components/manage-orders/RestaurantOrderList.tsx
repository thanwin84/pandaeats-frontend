import { useGetMyRestaurantOrders } from "@/api/OrderApi";
import RestaurantOrderCard from "./RestaurantOrderCard";
import Spinner from "../Spinner";

type Props = {
  className?: string;
  deliveryPrice?: number
};

export default function RestaurantOrderList({
    deliveryPrice,
    className
}: Props) {
    const {orders, isLoading} = useGetMyRestaurantOrders()
    
    
    if (isLoading){
        return <Spinner className="mx-auto my-auto" />
    }
    if (!orders || orders.length === 0){
        return (
            <div>
                <p className="text-center text-gray-400 text-lg">You have not registered any restaurant or Customer has not placed any order yet.</p>
            </div>
        )
    }
   
  return (
    <div className={`space-y-3 ${className}`}>
        {orders?.map((order, index)=>(
            <RestaurantOrderCard 
                key={order._id} 
                order={order}
                deliveryTime={deliveryPrice || 0}
                orderNumber={index}
                
            />
        ))}
    </div>
  );
}