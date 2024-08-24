import axios from "./axios";

export const getTitleImage = async (id, type) => {
  try {
    const endpoint = type === 'movie' ? `/movie/${id}/images` : `/tv/${id}/images`;
    const { data } = await axios.get(endpoint);
    const images = data.logos || data.posters || data.backdrops;
    const titleImg =
      images.find((image) => image.iso_639_1 === "en") || images[0];
    return titleImg ? `https://image.tmdb.org/t/p/original${titleImg.file_path}` : null;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};
