import { MenuItem as MenuItemType } from "@/pages/RestaurantDetails";
import { Plus } from "lucide-react";



type Props = {
  className?: string
  items: MenuItemType[]
  addToCart: (item: MenuItemType)=> void

};

export default function MenuItem({
    className,
    items,
    addToCart
}: Props) {

  return (
    <div className={`${className}`}>
        <h2 className="font-bold text-xl">Menu</h2>
        <ul>
            {items?.map(item => (
                <li 
                    key={item._id}
                    className="px-4 py-2 flex justify-between gap-2 mt-2 rounded-md border shadow-sm"
                >
                    <p className="flex gap-2">
                        <span>{item.name}</span>
                        <span className="font-semibold">${item.price}</span>
                    </p>
                    <button
                        onClick={()=>addToCart(item)}
                    >
                        <Plus className=" hover:text-orange-500" />
                    </button>
                </li>
            ))}
        </ul>
    </div>
  );
}