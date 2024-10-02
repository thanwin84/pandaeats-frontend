import { OrderStatus } from "@/types"

type OrderStatusType = {
    label: string,
    value: OrderStatus,
    progressValue: number
}

export const ORDER_STATUS:Record<string, OrderStatusType> = {
    placed: {label: "Placed", value: 'placed', progressValue: 0},
    paid: {label: "Awaiting Restaurant Confirmation", value: 'paid', progressValue: 25},
    inProgress: {label: "In progess", value: 'inProgress', progressValue: 50},
    outForDelivery: {label: "Out for Delivery", value: 'outForDelivery', progressValue: 75},
    delivered:{label: "Delivered", value: 'delivered', progressValue: 100}
    
}