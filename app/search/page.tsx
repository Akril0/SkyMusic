import getSongsByTitle from "@/ations/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "@/app/search/components/SearchContent";

interface SearchProps{
    searchParams:{
        title:string,
    }
}

const Search:React.FC<SearchProps> = async ({searchParams}) => {
    const songs =await getSongsByTitle(searchParams.title)

    return (
        <div
            className='
                bg-gray-200
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            '
        >
            <Header className='from-gray-200'>
                <div className='mb-2 flex flex-col gap-y-6'>
                    <h1 className='text-black text-3xl font-semibold'>
                        Search
                    </h1>
                    <SearchInput/>
                </div>

            </Header>
            <SearchContent songs={songs}/>
        </div>
    );
};

export default Search;
