import { Loader2 } from "lucide-react";

type Props = {
    className?: string
}

export default function Spinner({className}:Props) {
    return (
        <Loader2 className={`h-8 w-8 animate-spin text-blue-500 ${className}`} />
    );
}
