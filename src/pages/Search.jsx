import React, { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import SearchBar from "../components/common/SearchBar";
import Cards from "../components/common/Card";
import axios from "../utils/axios";
import Loader from "../components/common/Loader";

const Search = () => {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: "all", name: "All" },
        { id: "movie", name: "Movies" },
        { id: "tv", name: "TV Shows" },
    ];

    const getTrending = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/trending/all/day");
            setSearchResults(data.results);
        } catch (error) {
            console.log("Error fetching trending data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const getSearchResults = async () => {
        if (query.trim() === "") {
            getTrending();
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.get(`/search/${category}?query=${query}`);
            setSearchResults(data.results);
        } catch (error) {
            console.log("Error fetching search results: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTrending();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getSearchResults();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, category]);

    return (
        <div className="w-full mx-auto ">
            <div className=" w-[80%] lg:w-[78%] flex flex-col   space-y-3 sm:space-x-5 md:space-x-5  flex-collg: lg:flex-row lg:flex lg:items-center justify-between mx-auto mt-32">
                <div className="mt-3">
                    <DropDown
                        title="Category"
                        options={categories}
                        func={setCategory}
                        defaultValue={category}
                    />
                </div>

                <SearchBar query={query} setQuery={setQuery} setSearchResults={setSearchResults} />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                <div className="w-full">
                    <Cards data={searchResults} title={`${category}`} />
                </div>
            )}
        </div>
    );
};

export default Search;
