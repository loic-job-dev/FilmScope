import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'fr-FR'
    }
})

export async function getPopularFilms(page) {
    const { data } = await api.get('/movie/popular', { params: { page } })
    return data.results  // tableau de films
}

export async function searchFilms(query) {
    if (!query.trim()) return []
    const { data } = await api.get('/search/movie', { params: { query } })
    return data.results
}

export async function getFilmDetail(id) {
    const { data } = await api.get(`/movie/${id}`)
    return data
}

// Construire l'URL d'une affiche
export function getPosterUrl(posterPath, size = 'w500') {
    if (!posterPath) return '/placeholder-poster.png'
    return `${import.meta.env.VITE_TMDB_IMAGE_URL.replace('w500', size)}${posterPath}`
}