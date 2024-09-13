import { Checkbox } from "@/components/ui/checkbox"
import { FormItem, FormControl, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

type Item = {
    id: number,
    name: string
}

type Props = {
    item: Item,
    field: ControllerRenderProps<FieldValues, "cuisines">
}

export default function CuisineCheckBox({item, field}:Props){
    
    return (
        <FormItem className="flex gap-4 items-center space-x-1 space-y-0">
            <FormControl>
                <Checkbox
                className=""
                    checked={field.value?.includes(item.name)}
                    onCheckedChange={(checked)=>{
                        return checked
                        ? field.onChange([...field.value, item.name])
                        :field.onChange(field.value?.filter((value:string) =>value !== item.name))
                    }}
                    />
            </FormControl>
            <FormLabel className="">
                {item.name}
            </FormLabel>
        </FormItem>
    )
}