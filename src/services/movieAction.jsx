import { loadMovie } from "../slices/movieSlice";
import axios from "../utils/axios";

export const asyncloadmovie = (id) => async (dispatch) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        const credits = await axios.get(`/movie/${id}/credits`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t => t.english_name),
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
            cast: credits.data.cast,
        };

        dispatch(loadMovie(theultimatedetails));
    } catch (error) {
        console.log("Error: ", error);

    }
}
export const removeMovie = () => (dispatch) => {
    dispatch(loadMovie(null));
};
