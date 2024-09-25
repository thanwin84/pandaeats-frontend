import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect } from "react"

const formSchema = z.object({
    searchQuery: z.string().min(1, "This field is required")
})
export type SearchForm = z.infer<typeof formSchema>

type Props = {
    className?: string,
    onSave: (formData:SearchForm)=>void,
    onReset?: ()=>void,
    searchQuery?:string,
    placeHolder: string
}

export default function SearchBar(
    {
        className,
        onReset,
        onSave,
        searchQuery="",
        placeHolder
    }:Props
){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery
        }
    })
    function handleClear(){
        form.reset({searchQuery})
        if (onReset){
            onReset()
        }
    }
    useEffect(()=>{
        form.reset({searchQuery})
    },[searchQuery])

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSave)} 
                className={`flex px-4 py-2 justify-between rounded-md border ${form.formState.errors.searchQuery?.message ? "border-red-500": ""} ${className}`} 
            >
                <Search size={28}  strokeWidth={2.5} className="text-orange-400 my-auto" />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({field})=>(
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input 
                                    {...field} 
                                    placeholder={placeHolder} 
                                    className="border-none outline-none shadow-none focus-visible:ring-0" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    {(
                        <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={handleClear}
                    >
                        clear
                    </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-orange-400"
                    >
                        Search
                    </Button>
                </div>
            </form>
        </Form>
    )
}