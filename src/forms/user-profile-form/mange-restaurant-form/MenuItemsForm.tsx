import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItem from "./MenuItem"

type MenuItem = {
    name: string,
    price: number
}
type Props = {
    className?: string
}


export default function MenuItemsForm({className}: Props){
    const {control} = useFormContext()
    const {fields, append, remove} = useFieldArray({
        control,
        name: "menuItem"
    })
    
    function appendItem(){
        append({name: "", price: 0})
    }
    function removeItem(ind:number){
        remove(ind)
    }
    return (
        <section className={`${className}`}>
            <div className="mb-3">
                <h1 className="text-xl font-bold text-slate-800">Menu Item</h1>
                <FormDescription>
                    Create your menu and give each item a name and a price.
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="menuItem"
                render={()=>(
                    <div className={`mb-4`}>
                        {fields.map((_, id)=>(
                            <FormItem key={id}>
                                <MenuItem key={id} index={Number(id)} remove={()=>removeItem(id)}/>
                            </FormItem>
                        ))}
                    </div>
                )}
            />
            <Button 
                type="button"
                className=""
                onClick={appendItem}
            >
                Add Menu Item
            </Button>
        </section>
    )
}

<div>
    <div>
        <div></div>
        <div></div>
    </div>
</div>