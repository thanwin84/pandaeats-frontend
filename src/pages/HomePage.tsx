import landingPage from '../assets/landing.png'
import appDownLoad from '../assets/appDownload.png'
import { SearchBar } from '@/components'
import { useNavigate } from 'react-router-dom'
import { SearchForm } from '@/components/SearchBar'

export default function HomePage(){
    const navigate = useNavigate()

    function handleSearchSubmit(formValues: SearchForm){
        navigate(`search/${formValues.searchQuery}`)
    }
    return (
        <div className="flex flex-col gap-12">
            <div className="lg:w-3/5 md:w-4/5 w-5/6 px-6 bg-white rounded-lg shadow-lg flex flex-col gap-5 py-8 text-center -mt-16 mx-auto">
                <h2 className="text-3xl text-orange-600 font-bold tracking-tight">Tuck into Takeaway today</h2>
                <span className="text-xl text-gray-600">Food is just a clickaway!</span>
                <SearchBar 
                    placeHolder='Type city name' 
                    onSave={handleSearchSubmit}
                />
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