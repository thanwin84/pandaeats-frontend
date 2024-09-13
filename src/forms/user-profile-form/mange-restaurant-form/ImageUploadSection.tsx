import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

type Props = {
    className?:string,
    imageUrl?: string
}
const description = 'Add an image that will be displayed on your restaurant listing in the search results.Adding a new image will overite the existing one'
export default function ImageUploadSection({className, imageUrl}:Props){
    const {control} = useFormContext()
    const [file, setFile] = useState<File | null>(null)
    const [fileUrl, setFileUrl] = useState(imageUrl || "")
    
    return (
        <section className={`${className}`}>
            <div className="mb-3">
                <h2 className='text-xl font-bold text-slate-800'>Image</h2>
                <FormDescription>
                    {description}
                </FormDescription>
            </div>
           
            <div className="flex flex-col gap-8 w-[50%] lg:w-[40%]">
                <div>
                    <img src={fileUrl} />
                </div>
            <FormField
                control={control}
                name="imageFile"
                render={(({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input 
                                className="bg-white"
                                type='file' 
                                accept=".jpg, .jpeg, .png"
                                onChange={(e)=>{
                                    const file = e.target.files?.[0]
                                    field.onChange(e.target.files ? e.target.files[0]:null)
                                    if (file)setFileUrl(URL.createObjectURL(file))
                                }}
                                />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ))}
            />
            </div>
        </section>
    )
}