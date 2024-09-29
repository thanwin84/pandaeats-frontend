import { Dot } from "lucide-react";

type Props = {
  className?: string
  cuisines: string[]
  
};

export default function CuisineTags({
    className,
    cuisines
}: Props) {
  return (
    <ul 
        className={`flex text-gray-600 flex-wrap  ${className}`}
        aria-label="cuisine types"
    >
        {cuisines?.map((cuisine, index)=>(
        <li key={cuisine} className="flex">
            {cuisine}
            {index !== cuisines.length -1 && <Dot aria-hidden={true} />}
            {index !== cuisines.length - 2 && (
                <span className="sr-only">and</span>
            )}
        </li>
        ))}
    </ul>
  );
}