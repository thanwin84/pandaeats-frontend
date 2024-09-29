import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { 
    Form, 
    FormField, 
    FormControl, 
    FormItem, 
    FormLabel, 
    FormMessage,
    FormDescription
 } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components'
import { User } from '@/types'
import { useEffect } from 'react'

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address line is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "Country is required")
})

export type UserFormData = z.infer<typeof formSchema>


type props = {
    isLoading?: boolean,
    onSave: (userProfileData: UserFormData)=>void,
    title?: string,
    buttonText?: string,
    className?: string,
    user: User
}

export default function UserProfileForm({
    onSave,
    isLoading=false,
    title = "User Profile",
    buttonText="Submit",
    className,
    user
}:props){
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: user
    })
    useEffect(()=>{
        form.reset(user)
    },[user, form])
    
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSave)}
                className={`bg-gray-50 text-gray-800 px-6 py-8  space-y-3 rounded-md shadow-md ${className}`}>
                <div>
                    <h2 className='text-2xl font-bold'>{title}</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className='bg-white' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field}  className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({field})=>(
                            <FormItem className='w-full'>
                                <FormLabel>AddressLine1</FormLabel>
                                <FormControl>
                                    <Input {...field}  className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({field})=>(
                            <FormItem className='w-full'>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field}  className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({field})=>(
                            <FormItem className='w-full'>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field}  className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? <LoadingButton className='w-full' />: (
                    <Button type='submit' className='w-full bg-orange-400 hover:bg-orange-500'>
                        {buttonText}
                    </Button>
                )}
                
            </form>
        </Form>
    )
}

