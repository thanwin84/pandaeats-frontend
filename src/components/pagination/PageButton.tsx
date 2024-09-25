
type Props = {
    pageNumber: number,
    activePage: boolean,
    handlePageChange:(pageNumber:number)=>void
}

export default function PageButton({pageNumber, activePage, handlePageChange}:Props){
    const pageBtnStyle = "px-4 py-2 bg-white   shadow-md rounded-md border  hover:bg-orange-400 border-slate-300 hover:text-white"
    const activePageBtnStyle = "px-4 py-2 rounded-md text-white bg-orange-500 dark:bg-blue-800"
    return (
        <button
            className={activePage ? activePageBtnStyle: pageBtnStyle}
            key={pageNumber}
            onClick={()=>handlePageChange(pageNumber)}
        >
            {pageNumber}
        </button>
    )
}