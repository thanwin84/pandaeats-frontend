import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cuisineList } from "@/config/CuisineList"
import { useFormContext } from "react-hook-form"
import CuisineCheckBox from "./CuisineCheckBox"

type Props = {
    className?: string
}
export default function CuisineForm({className}:Props){
    const {control} = useFormContext()
    return (
        <section className={` ${className}`}>
            <div className="mb-4">
                <FormLabel className="text-xl font-bold text-slate-800">Cuisine</FormLabel>
                <FormDescription>
                    Create your menu and give each item a name and price
                </FormDescription>
            </div>
            <FormField 
                control={control}
                name="cuisines"
                render={()=>(
                    <FormItem className="">
                        <div className="grid grid-cols-2  lg:grid-cols-4 md:grid-cols-3  space-y-3">
                            {cuisineList.map((item)=>(
                                <FormField
                                    key={item.name}
                                    control={control}
                                    name="cuisines"
                                    render = {({field})=>{
                                        return (
                                        <CuisineCheckBox field={field} item={item} />
                                        )
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}
            />

        </section>
    )
}