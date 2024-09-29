import capitalize from "@/utils/Capitalize";
import CuisineTags from "../search-restaurants/CuisineTags";

type Props = {
    className?: string
    name: string
    country: string
    cuisines: string[]
    city: string
  };
  
  export default function RestaurantInfo({
      className,
      name,
      country,
      cuisines,
      city
  }: Props) {
    return (
      <div className={`rounded-md shadow-md border px-4 py-4 ${className}`}>
        <h1 className="font-bold text-2xl text-gray-800">{capitalize(name)}</h1>
        <span className="text-base text-gray-700">{capitalize(city)}, {capitalize(country)}</span>
        <CuisineTags cuisines={cuisines} className="mt-4" />
      </div>
    );
  }