import { Restaurant } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {  Timer, Banknote } from 'lucide-react';
import CuisineTags from "./CuisineTags";
import DeliveryInfo from "./DelivertyInfo";
import { Link } from "react-router-dom";


type Props = {
    className?: string;
    restaurant: Restaurant
  };
  
  export default function SearchResultCard({
    className,
    restaurant
  }: Props) {
    
    return (
      <article className={`w-full py-2 px-4 rounded-md border grid grid-cols-[2fr_3fr] mb-3 ${className} shadow-sm`} >
        <AspectRatio ratio={16/ 6} className="bg-muted" >
          <img 
            src={restaurant?.imageUrl?.url} 
            className="rounded-md h-full w-full object-cover" 
            alt={"Image of "+restaurant.restaurantName}
          />
        </AspectRatio>
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-2">
          <div className="flex flex-col space-y-2">
            <Link 
              to={`/restaurants/${restaurant._id}`}
              className="hover:underline"
            >
              <h2 className="text-xl font-bold text-gray-700">
                {restaurant.restaurantName}
              </h2>
            </Link>
            <CuisineTags cuisines={restaurant.cuisines} />
          </div>
          <div className="text-gray-600 space-y-2 md:pt-9">
            <DeliveryInfo
             ariaLabel="Estimated Delivery time"
             icon={<Timer/>} 
             text={`${restaurant.estimatedDeliveryTime || 'N/A'} mins`}
            />
            <DeliveryInfo
             ariaLabel="delivery price"
             icon={<Banknote/>} 
             text={`Delivery from ${restaurant.deliveryPrice || 'N/A'} `}
            />
          </div>
        </div>
      </article>
    );
  }