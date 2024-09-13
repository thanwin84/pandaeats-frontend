import { 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"

type Props = {
    className?: string
}
export default function DetailsForm({className}:Props){
    const {control} = useFormContext()
    return (
        <section className={` ${className}`}>
            <div className="mb-3">
                <h1 className="text-xl font-bold text-slate-800">Form Details</h1>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
            </div>
            <div className="space-y-2">
                <FormField
                    control={control}
                    name="restaurantName"
                    render={({field})=>(
                        <FormItem className="" >
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-3">
                <FormField
                    control={control}
                    name="city"
                    render={({field})=>(
                        <FormItem className="w-full">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="country"
                    render={({field})=>(
                        <FormItem className="w-full">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <FormField
                    control={control}
                    name="deliveryPrice"
                    render={({field})=>(
                        <FormItem className="w-full">
                            <FormLabel>Delivery Price</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="estimatedDeliveryTime"
                    render={({field})=>(
                        <FormItem className="w-full">
                            <FormLabel>Estimated Delivery times(mins)</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                

            </div>
        </section>
    )
}