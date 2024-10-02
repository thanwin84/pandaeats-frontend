import { OrderStatus as OrderStatusType } from "@/types";
import { Progress } from "../ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  className?: string;
  status: OrderStatusType,
  time: string
};

export default function OrderStatusHeader({
    className,
    status,
    time
}: Props) {
  
  return (
    <div className={`space-y-2 ${className}`}>
        <h1 className="text-gray-600 flex text-xl font-bold  justify-between">
            <span>Order Status: {ORDER_STATUS[status].label}</span>
            <span>{ORDER_STATUS[status].value === "delivered" ?"Completed Order": `Expacted by: ${time}`}</span>
        </h1>
        <Progress value={ORDER_STATUS[status].progressValue} />
    </div>
  );
}