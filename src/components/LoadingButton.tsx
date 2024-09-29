import {Button} from './ui/button'
import {Loader2} from 'lucide-react'

type Props = {
    className?: string
}

export default function LoadingButton({className}:Props){
    return (
        <Button className={`${className}`} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
        </Button>
    )
}