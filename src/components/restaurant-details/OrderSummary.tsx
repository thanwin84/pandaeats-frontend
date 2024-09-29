import {  Minus, Plus, Trash, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { CartItem, MenuItem } from "@/pages/RestaurantDetails";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";

type Props = {
    className?: string
    carts: CartItem[]
    deliveryPrice: number
    deleteItem: (item: MenuItem)=> void
    increaseQuantity: (item: MenuItem)=> void
    decreaseQuantity: (item: MenuItem)=> void
    estimatedDeliveryTime: number
    onCheckout: (formData:UserFormData)=> void
    checkoutLoading: boolean

  };
  
  export default function OrderSummary({
      className,
      carts,
      deliveryPrice=0,
      deleteItem,
      increaseQuantity,
      decreaseQuantity,
      estimatedDeliveryTime,
      onCheckout,
      checkoutLoading
  }: Props) {
    const totalPrice = carts?.reduce((prev, current)=> prev + (current.price * current.quantity), 0) + deliveryPrice || 0
    return (
      <div className={`w-full space-y-4 p-4 rounded-md shadow-md border ${className}`}>
        <div className="text-xl font-semibold flex justify-between">
            <h3>Your Order</h3>
            <span>Total: ${totalPrice}</span>
        </div>
        {carts && <Separator />}
        {carts.length === 0 && (
            <div className="flex justify-center">
                <span className="text-sm">Your cart is empty. Click menu items to add to the cart</span>
            </div>
        )}
        <ul className="space-y-2">
            {carts?.map(item => (
                <li 
                    key={item._id} 
                    className="flex justify-between"
                >
                    <p className="flex flex-1 gap-3 ">
                        <span className="px-2 my-auto flex-shrink-0">{item.quantity}</span>
                        <span className="flex items-center"><X size={15} className=""/></span>
                        <span className="">{item.name} (${item.price})</span>
                    </p>
                    <p className="flex flex-1 items-center gap-2">
                        <button
                            onClick={()=>decreaseQuantity(item)}
                            disabled={item.quantity === 1}
                        >
                            <Minus size={18} className="text-gray-700" />
                        </button>
                        <span>${item.price * item.quantity}</span>
                        <button
                            onClick={()=>increaseQuantity(item)}
                        >
                            <Plus size={18} className="text-gray-700" />
                        </button>
                    </p>
                    <button
                        onClick={()=>deleteItem(item)}
                    >
                        <Trash size={18} className="text-gray-400 hover:text-red-400" />
                    </button>
                </li>
            ))}
        </ul>
        <Separator />
        <div>
            <div className="flex justify-between">
                <span>Delivery Price</span>
                <p>${deliveryPrice}</p>
            </div>
            <p className="text-sm text-orange-500">Estimated Delivary time: {estimatedDeliveryTime}mins</p>
        </div>
        <Separator />
        <CheckoutButton 
            checkoutLoading={checkoutLoading}
            onCheckout={onCheckout} 
        />
      </div>
    );
  }