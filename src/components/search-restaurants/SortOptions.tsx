import { useState } from "react";

type Props = {
  className?: string
  onChange: (value: string)=> void
};

const options = [
    {
        name: "Best Match",
        value: "updatedAt"
    },
    {
        name: "Estimated Delivery Time",
        value: "estimatedDeliveryTime"
    },
    {
        name: "Delivery Price",
        value: "deliveryPrice"
    }
    
]

export default function SortOption({
    className,
    onChange
}: Props) {
    const [option, setOption] = useState(options[0])
    const [open, setOpen] = useState(false)
    function handleClick(value: {name:string,value: string}){
        onChange(value.value)
        setOption(value)
        setOpen(!open)
    }
  return (
    <div className={`relative ${className}`}>
        <p 
            className="rounded-md border px-4 py-2 cursor-pointer"
            onClick={()=>setOpen(!open)}
        >
            Sorted By: {option.name}
            </p>
        {open && (
            <ul className="w-full rounded-md bg-white z-2 top-12 px-4 py-2 border absolute">
            {options.map(option => (
                <li 
                    onClick={()=>handleClick(option)}
                    className="rounded-md px-2 py-2 hover:bg-gray-100 cursor-pointer"
                    key={option.value}
                >
                    {option.name}
                </li>
            ))}
        </ul>
        )}
    </div>
  );
}