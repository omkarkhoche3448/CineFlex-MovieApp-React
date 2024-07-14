import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Cards from '../components/common/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../components/common/Loader';
import DropDown from '../components/DropDown';
import { HiOutlineRefresh } from 'react-icons/hi';
import SearchBar from '../components/common/SearchBar';

const Trending = () => {
    document.title = "MovieFlex | Trending";

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [sortOption, setSortOption] = useState("popularity.desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(
                `/trending/${category}/${duration}`,
                {
                    params: {
                        page: page,
                        sort_by: sortOption,
                        query: searchQuery
                    }
                }
            );

            if (data.results.length > 0) {
                setTrending((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error fetching trending data: ", error);
            setLoading(false);
        }
    };

    const refreshHandler = () => {
        setPage(1);
        setTrending([]);
        GetTrending();
    };

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const handleDurationChange = (selectedDuration) => {
        setDuration(selectedDuration);
    };

    const handleReset = () => {
        setCategory("all");
        setDuration("day");
        setSortOption("popularity.desc");
        setSearchQuery("");
        setSearchResults([]);
        setLoading(true);
        refreshHandler();
    };

    const handleSortChange = (selectedSort) => {
        setSortOption(selectedSort);
    };

    useEffect(() => {
        refreshHandler();
    }, [category, duration, sortOption, searchQuery]);

    return (
        loading ? (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        ) : (
            <div className="w-full mx-auto px-4">
                <div className="lg:w-[77%] mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 mt-32 items-center">
                    <DropDown
                        title="Trending"
                        options={[
                            { id: "all", name: "All" },
                            { id: "movie", name: "Movies" },
                            { id: "tv", name: "TV Shows" }
                        ]}
                        func={handleCategoryChange}
                        defaultValue={category}
                    />
                    <DropDown
                        title="Duration"
                        options={[
                            { id: "day", name: "Day" },
                            { id: "week", name: "Week" },
                            { id: "month", name: "Month" }
                        ]}
                        func={handleDurationChange}
                        defaultValue={duration}
                    />
                    <DropDown
                        title="Sort By"
                        options={[
                            { id: "popularity.desc", name: "Most Popular" },
                            { id: "release_date.desc", name: "Most Recent" },
                            { id: "vote_average.desc", name: "Most Rating" }
                        ]}
                        func={handleSortChange}
                        defaultValue={sortOption}
                    />

                    <SearchBar query={searchQuery} setQuery={setSearchQuery} setSearchResults={setSearchResults} />

                    <button
                        className="bg-red-400 w-fit  flex flex-row items-center justify-center text-white rounded px-4 py-2 mt-4 lg:mt-0"
                        onClick={handleReset}
                    >
                        <HiOutlineRefresh className="inline-block w-5 h-5 mr-2" />
                        Reset
                    </button>
                </div>

                {searchQuery.length > 0 && searchResults.length > 0 ? (
                    <Cards data={searchResults} />
                ) : (
                    <InfiniteScroll
                        dataLength={trending.length}
                        next={GetTrending}
                        hasMore={hasMore}
                        loader={<Loader />}
                        className="mt-10"
                    >
                        <Cards data={trending} />
                    </InfiniteScroll>
                )}
            </div>
        )
    );
};

export default Trending
