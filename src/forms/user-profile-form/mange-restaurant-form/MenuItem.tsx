import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"


type Props = {
    index: number,
    remove: (index:number)=> void
}

export default function MenuItem({index, remove}: Props){
    const {control} = useFormContext()
    
    return (
        <div className="flex items-stretch gap-3">
                <FormField
                    control={control}
                    name={`menuItem.${index}.name`}
                    render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`menuItem.${index}.price`}
                    render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button 
                    type="button" 
                    className="mt-8" 
                    variant="destructive"
                    onClick={()=>remove(index)}
                >
                    Remove
                </Button>
            </div>
    )
}