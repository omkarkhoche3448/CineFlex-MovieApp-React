import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",

    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzEwNTRjNjlmOWRmYjFjMzAzZDhiNWNkZDIyMWYxOSIsInN1YiI6IjY2NjZkNjRiNTgwMzA3OGM5NjFjMmFmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DOa_RTCuqKo9kMYxKzzo3qdnyMvmquxyiBnfnWPaCEs'
    }
});

export default instance;
