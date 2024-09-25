
type props = {
    children: React.ReactNode
    className?:string
}
export default function DrowDownContent(
    {children, className}: props
){
    return (
        <div className={`bg-white z-30 py-3 px-2 w-full border text-center text-orange-500 flex flex-col gap-2 rounded-md ${className}`}>
                {children}
        </div>
    )
}

