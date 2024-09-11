import landingPage from '../assets/landing.png'
import appDownLoad from '../assets/appDownload.png'

export default function HomePage(){
    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 px-8 bg-white rounded-lg shadow-md flex flex-col gap-5 py-8 text-center -mt-16 mx-auto">
                <h2 className="text-4xl text-orange-600 font-bold tracking-tight">Tuck into Takeaway today</h2>
                <span className="text-xl">Food is just a clickaway</span>
            </div>

            <div className='grid md:grid-cols-2'>
                <div>
                    <img 
                     className=''
                     src={landingPage} />
                </div>
                <div className='px-4 text-center space-y-2 '>
                    <h3 className='text-3xl font-bold tracking-tighter'>Order takeaway even faster!</h3>
                    <p>Download the PandaEats App for faster ordering and personalized recommendation</p>
                    <img 
                        className='mx-auto text-slate-400'
                    src={appDownLoad} />
                </div>
            </div>
        </div>
    )
}