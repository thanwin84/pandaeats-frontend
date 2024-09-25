import { Check, ChevronDown, ChevronUp } from "lucide-react";


type Props = {
    className?: string
    onChange: (options:string[])=>void
    reset: ()=> void
    cuisines: string[]
    selectedCuisines: string[]
    showMore: boolean,
    toggleShowMore: ()=> void
  };
  
  export default function CuisinFilter({
    className,
    onChange,
    cuisines,
    selectedCuisines,
    showMore,
    toggleShowMore,
    reset
  }: Props) {
    
    function handleChange(value:string){
      const newSelectCuisines = selectedCuisines.includes(value) ? selectedCuisines.filter(cuisine => cuisine !== value):
      [...selectedCuisines, value]
      selectedCuisines = newSelectCuisines
      onChange(newSelectCuisines)
    }
    const last = showMore ? 7: -1
    return (
      <div className={`px-4 pt-4 ${className}`}>
        <div className="flex justify-between mb-2">
          <h2 className="font-bold text-gray-700">Filter by Cusine</h2>
          <button 
            onClick={reset}
            className="text-blue-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
        <div>
          {cuisines.slice(0, last)?.map(cuisine => {
            const isSelected = selectedCuisines.includes(cuisine)
            return (
              <div key={cuisine}>
                <input
                  id={cuisine}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={()=>handleChange(cuisine)}
                />
                <label htmlFor={cuisine} className="flex justify-between px-4 py-1 border mt-1 rounded-md cursor-pointer">
                  {cuisine}
                  {isSelected && (
                    <Check 
                      size={20} 
                      strokeWidth={2} 
                      className="text-green-500"
                    />
                  )}
                </label>
              </div>
            )
          })}
        </div>
        <div className="flex justify-center pt-3">
        <button 
          onClick={toggleShowMore}
          className="flex gap-1 hover:underline">
          {showMore ? "View more": "View less"}
          {showMore ? <ChevronDown  />: <ChevronUp/>}
        </button>
        </div>
      </div>
    );
  }

