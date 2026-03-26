import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'fr-FR',
  },
})

export async function getPopularFilms(page) {
  const { data } = await withMinDelay(api.get('/movie/popular', { params: { page } }))
  return data.results // tableau de films
}

export async function searchFilms(query) {
  if (!query.trim()) return []

  const { data } = await withMinDelay(api.get('/search/movie', { params: { query } }))
  return data.results
}

export async function searchByYear(year) {
    if (!year || isNaN(year)) return []

    const { data } = await withMinDelay(api.get('/discover/movie', { params: { primary_release_year: year, sort_by: 'popularity.desc' } }))
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

// Fonctions pour "forcer" le timer et voir le spinner
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function withMinDelay(promise, minDelay = 1500) {
  const start = Date.now()

  const result = await promise

  const elapsed = Date.now() - start
  if (elapsed < minDelay) {
    await sleep(minDelay - elapsed)
  }

  return result
}
