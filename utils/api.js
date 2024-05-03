import axios from 'axios'

export const Base_URL = "https://api.themoviedb.org/3";
const NEXT_PUBLIC_TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

export const headers = {
    Authorization: "bearer " + NEXT_PUBLIC_TMDB_TOKEN
}

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(Base_URL + url, {
            headers,
            params
        })
        return data;
    } catch (err) {
        console.log(err)
        return err;
    }
}