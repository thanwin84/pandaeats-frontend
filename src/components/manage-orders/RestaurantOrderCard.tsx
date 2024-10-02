import { MyOrder, OrderStatus } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useEffect, useState } from "react";
import { useUpdateOrderStatus } from "@/api/OrderApi";

type Props = {
  className?: string
  order: MyOrder
  deliveryTime: number
  orderNumber: number
};

export default function RestaurantOrderCard({
  order,
  deliveryTime,
  orderNumber
}: Props) {
  const time = new Date(order.createdAt)
  const {
    updateOrderStatus,
    isPending
  } = useUpdateOrderStatus()
  time.setMinutes(deliveryTime)
  const [status, setStatus] = useState<OrderStatus>(order.status)
  function handleStatusChange(value:OrderStatus){
    setStatus(value)
    updateOrderStatus({orderId: order._id.toString() as string, status: value})
  }
  useEffect(()=>{
    setStatus(order.status)
  }, [order])
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid grid-cols-1 gap-2 md:grid-cols-4 pb-1">
            <span>Customer Name: <span className="font-normal">{order?.user.name}</span></span>
            <span>Delivery Address: <span className="font-normal">{order?.user.addressLine1}, {order.user.city}</span></span>
            <span>Time: <span className="font-normal">{time.toLocaleTimeString()}</span></span>
            <span>Total Cost: <span className="font-normal">{order.totalAmount}</span></span>
            
        </CardTitle>
        <Separator/>
        <CardDescription>
          Order number: {orderNumber + 1}
        </CardDescription>
        
        <CardContent className="p-0 space-y-2">
          <p className="font-medium">Ordered Items list:</p>
          <ul className="pl-2">
            {order.cartItems?.map((cartItem, index)=>(
              <li 
                className="flex gap-2 items-center mb-1"
                key={cartItem._id}
              >
                <span className="px-2 border rounded-md">{index + 1}</span>
                <span>{cartItem.quantity}</span>
                <X size={15} />
                <span>{cartItem.name}</span>
              </li>
            ))}
          </ul>
          <Separator/>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`order-status-${order._id}`}>
              What is the current status of this Order?
            </Label>
            <Select 
              value={status} 
              onValueChange={(value:OrderStatus)=> handleStatusChange(value)}
              disabled={isPending}
              >
              <SelectTrigger id={`order-status-${order._id}`} className="w-full border rounded-md text-start pl-3 py-1" >
                <SelectValue placeholder="Select order status"  />
              </SelectTrigger>
              <SelectContent position="popper">
                {Object.keys(ORDER_STATUS).map(key =>(
                  <SelectItem value={ORDER_STATUS[key].value}>
                    {ORDER_STATUS[key].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
      </CardHeader>
    </Card>
  );
}

