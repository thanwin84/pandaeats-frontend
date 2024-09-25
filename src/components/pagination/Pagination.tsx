import { ChevronLeft, ChevronRight } from 'lucide-react'
import PageButton from "./PageButton";

type Props = {
    className?: string,
    totalPages: number,
    currentPage: number,
    handlePageChange: (pageNumber:number)=>void,
    position: "center" | "end" | "start"
}

export default function Pagination({
    handlePageChange,
    totalPages,
    currentPage,
    className,
    position='center'
}:Props){
    const positions = {
        center: "justify-center",
        end: "justify-end",
        start: "justify-start"
    }
    
    const displayPageButtons = ()=>{
        const pageButtons = []
        // first page
        pageButtons.push(
            <PageButton 
                activePage={currentPage===1} 
                pageNumber={1} 
                handlePageChange={handlePageChange}
                key={1}
            />
    )
        if (currentPage > 3){
            pageButtons.push(
                <span className="font-bold px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-md text-blue-700">...</span>
            )
        }
        // before current page
        if (currentPage !== 1 && currentPage !== 2){
            pageButtons.push(
                <PageButton 
                    activePage= {false} 
                    pageNumber={currentPage - 1} 
                    handlePageChange={handlePageChange} 
                    key={2}
                />
            )
        }

        // current page
        if (currentPage !== 1 && currentPage !== totalPages){
            pageButtons.push(
                <PageButton 
                activePage={true}
                pageNumber={currentPage} 
                handlePageChange={handlePageChange} 
                key={3}
                />
            )
        }
        // before last page
        if (currentPage !== totalPages && currentPage !== totalPages - 1){
            pageButtons.push(
                <PageButton 
                activePage={false} 
                pageNumber={currentPage + 1} 
                handlePageChange={handlePageChange} 
                key={4}
            />
            )
        }
        if (currentPage < totalPages - 2){
            pageButtons.push(
                <span key ="dot-2" className="font-bold px-4 py-2 bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-md text-blue-700">...</span>
            )
        }
        //last page

        pageButtons.push(
            <PageButton 
                activePage={currentPage === totalPages} 
                pageNumber={totalPages} 
                handlePageChange={handlePageChange} 
                key={5}
            />
        )
        return pageButtons
    }

    return (
        <div className={`py-6 px-2 w-full flex ${className} ${positions[position]}`}>
            {currentPage > 1 && (
                <button
                    className="mr-2 px-2 py-2 bg-white dark:bg-zinc-900 shadow-lg rounded-md flex gap-1 my-auto items-center hover:bg-orange-400  hover:text-white"
                    onClick={()=>{
                        let pageNumber = currentPage - 1
                        handlePageChange(pageNumber)
                    }}
                >
                    <ChevronLeft />
                    Prev
                </button>
            )}
            <div className="flex gap-2">
                {displayPageButtons()}
            </div>
            
            {currentPage !== totalPages && (
                <button
                    className="ml-2 px-2 py-2   bg-white dark:bg-zinc-900 shadow-lg rounded-md flex gap-1 my-auto items-center hover:bg-orange-400  hover:text-white"

                    onClick={()=> handlePageChange(currentPage + 1)}
                >
                    Next
                    <ChevronRight />
                    
                </button>
            )}
        </div>
    )
}