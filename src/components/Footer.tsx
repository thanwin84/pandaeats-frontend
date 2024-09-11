
export default function Footer(){
    return (
        <footer className="bg-orange-600 text-white px-4 py-4 grid md:grid-cols-2">
            <h4 className="text-xl text-center md:text-start">PandaEats</h4>
            <div className="flex gap-3 justify-end mx-auto md:mx-0">
                <span>Privacy policy</span>
                <span>Terms and services</span>
            </div>
        </footer>
    )
}