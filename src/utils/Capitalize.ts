export default function capitalize(value:string){
    return value ? value.substring(0,1).toUpperCase() + value.substring(1):""
}