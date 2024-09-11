import { 
    User as UserIcon, 
    ChevronDown as DownArrowIcon, 
    ChevronUp as UpArrowIcon
} from 'lucide-react'
import { useState } from 'react'
import {DrowDownContent, Navlinks} from '../components'
import { useAuth0 } from '@auth0/auth0-react'


export default function UserDropDownMenu(){
    const [open, setOpen] = useState(false)
    const {user} = useAuth0()

    return (
        <div className='max-w-44 relative'>
            <button
                onClick={()=>setOpen(!open)} 
                className='w-full px-2 py-2 rounded-md flex gap-2 text-orange-500 hover:text-orange-600 hover:bg-gray-50'
            >
                <UserIcon/>
                <span className='text-nowrap'>{user?.name}</span>
                {open ? <UpArrowIcon/>: <DownArrowIcon/>}
            </button>
            {open && (
                <DrowDownContent className='absolute top-12 shadow-md'>
                    <Navlinks className='py-2'/>
                </DrowDownContent>
            )}
        </div>
    )
}

