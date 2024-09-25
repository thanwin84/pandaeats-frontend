import { useNavigate } from "react-router-dom";
import SearchResultCard from "./SearchResultCard";
import { Restaurant } from "@/types";

type Props = {
  className?: string
  restaurantResults: Restaurant[],
  city: string
};

export default function SearchResults({
    className,
    restaurantResults,
    city
}: Props) {
  const navigate = useNavigate()
  function handleChangeLocation(){
    navigate("/")
  }
  return (
    <div className={` ${className}`}>
        <div className="flex gap-4 ml-2">
            <h1 className="font-bold text-gray-700">
            {restaurantResults.length} Restaurants found in {city}
            </h1>
            <button
            onClick={handleChangeLocation}
            className="font-normal pl-2 text-blue-500 hover:text-blue-600 hover:underline"
            >
                Change Location
            </button> 
        </div>
        <div className="mt-4">
          {restaurantResults?.map(restaurant=>(
            <SearchResultCard
              key={restaurant.restaurantName}
              restaurant={restaurant}
            />
          ))}
        </div>
    </div>
  );
}