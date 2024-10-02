import { Order } from "@/types";
import OrderStatusHeader from "./OrderStatusHeader";
import { X } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Separator } from "../ui/separator";

type Props = {
  className?: string
  order: Order
};

export default function OrderCard({
    className,
    order
}: Props) {
    const time = new Date()
    time.setMinutes(order.restaurantDetails.estimatedDeliveryTime)
    const expactedTime = time.toLocaleTimeString()

  return (
    <div className={`px-4 py-4 bg-gray-50 border shadow-sm rounded-md  ${className}`}>
        <OrderStatusHeader
            status={order.status}
            time={expactedTime}
         />
         <div className="py-3 grid md:grid-cols-[3fr_2fr] gap-4">
         <div className="space-y-2 mt-2">
            <div>
                <h2 className="font-semibold">Delivering to:</h2>
                <p className="text-gray-700">{order.userInfo.name}</p>
                <p className="text-gray-700">{order.deliveryDetails.addressLine1}</p>
            </div>
            <ul>
                <h2 className="font-semibold">Your Order</h2>
                {order.cartItems?.map(cartItem=>(
                        <li 
                            key={cartItem._id}
                            className="flex gap-2 items-center text-gray-700"
                        >
                            <span>{cartItem.name}</span>
                            <X size={15} className="" />
                            <span>{cartItem.quantity}</span>
                        </li>
                    ))}
            </ul>
            <Separator/>
            <h2 ><span className="font-semibold">Total Amount: $</span>{order.totalAmount / 1000}</h2>
         </div>
         <AspectRatio ratio={16/4}>
            <img 
                className="h-full w-full rounded-md object-cover"
                src={order.restaurantDetails.imageUrl?.url} 
                alt="restaurant Image" 
                />
         </AspectRatio>
         </div>
    </div>
  );
}