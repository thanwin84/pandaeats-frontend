import SearchBar from "../SearchBar";
import SearchResults from "./SearchResults";
import Pagination from "../pagination/Pagination";
import { useSearchContext } from "@/pages/Search";
import SortOption from "./SortOptions";

type Props = {
    className?: string
  };

export default function SearchRestaurants({
  className
}: Props) {
  const {
    city, 
    onSave, 
    restuarantResults, 
    resetSearch, 
    changePageNumber, 
    searchState,
    changeSortOption
  } = useSearchContext()
  const pages = restuarantResults?.pagination.pages || 0
  
  return (
    <section className={`px-4 space-y-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <SearchBar
          onSave={onSave}
          placeHolder="Search by cuisine or restaurant name"
          className="flex-1"
          searchQuery={searchState.searchQuery}
          onReset={resetSearch}
        />
        <SortOption onChange={changeSortOption} />
      </div>
      <SearchResults 
        restaurantResults={restuarantResults?.data || []}
        city={city || ""} 
      />
      {pages > 1 && (
        <Pagination
          totalPages={restuarantResults?.pagination.pages || 1}
          currentPage={restuarantResults?.pagination.page || 1}
          handlePageChange={changePageNumber}
          position="center"
       />
      )}
    </section>
    );
  }