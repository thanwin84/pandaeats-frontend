import { useSearchRestuarants } from "@/api/RestaurantApi";
import { CuisinFilter, SearchRestaurants } from "@/components/search-restaurants";
import { SearchForm } from "@/components/SearchBar";
import Layout from "@/layouts/Layout";
import { SearchRestaurantsResponse } from "@/types";
import { createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { cuisineList } from "@/config/CuisineList";

type Props = {
  
};
export type SearchState = {
    searchQuery: string,
    page: number,
    selectedCuisines: string[],
    sortOption: string
}

type SearchContextType = {
    onSave: (formData: SearchForm)=> void,
    resetSearch: ()=> void,
    changePageNumber: (num:number)=> void,
    restuarantResults: SearchRestaurantsResponse | undefined,
    searchState: SearchState,
    city: string | undefined,
    changeSortOption: (value: string)=> void
}

const Context = createContext<SearchContextType | undefined>(undefined)

export default function Search({}: Props) {
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: 'updatedAt'
      })
      const {city} = useParams()
      const {restuarantResults} = useSearchRestuarants(city, searchState)
      const [showMore, setShowMore] = useState(false)
      
      function toggleShowMore(){
        setShowMore(!showMore)
      }
      function onSave(formData:SearchForm){
        setSearchState(prev => ({...prev, searchQuery: formData.searchQuery, page: 1}))
      }
    
      function resetSearch(){
        setSearchState(prev => ({...prev, searchQuery: "", page: 1}))
      }
    
      function changePageNumber(num:number){
        setSearchState(prev => ({...prev, page: num}))
      }
      
      function SelectCuisine(selectedCuisines: string[]){
        setSearchState(prev => ({...prev, page: 1,selectedCuisines: selectedCuisines }))
      }
      function resetQuisineFilter(){
        setSearchState(prev => ({...prev, page: 1, selectedCuisines: []}))
      }
      function changeSortOption(value: string){
        setSearchState(prev => ({...prev, page: 1, sortOption: value}))
      }
console.log(searchState)
    return (
        <Layout showHero={false} className="grid md:grid-cols-[250px_1fr] grid-cols-1" >
            <Context.Provider value={{
                onSave,
                resetSearch,
                changePageNumber,
                restuarantResults,
                searchState,
                city,
                changeSortOption
            }}>
                <CuisinFilter
                    showMore={showMore}
                    toggleShowMore={toggleShowMore}
                    className="md:mb-4"
                    cuisines={cuisineList.map(cuisine => cuisine.name)}
                    onChange={SelectCuisine}
                    selectedCuisines={searchState.selectedCuisines}
                    reset={resetQuisineFilter}
                />
                <SearchRestaurants/>
            </Context.Provider>
        </Layout>
    );
}

export const useSearchContext = ()=> useContext(Context) as SearchContextType