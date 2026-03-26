import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
    // STATE : données réactives du store
    const favorites = ref([])

    // GETTERS : données dérivées (équivalent computed)
    const favoriteCount = computed(() => favorites.value.length)

    function isFavorite(filmId) {
        return favorites.value.some(f => f.id === filmId)
    }
  
    // ACTIONS : fonctions qui modifient le state
    function addFavorite(film) {
        if (!isFavorite(film.id)) {
            favorites.value.push(film)
            _persist()
        }
    }

    function removeFavorite(filmId) {
        favorites.value = favorites.value.filter(f => f.id !== filmId)
        _persist()
    }

    function toggleFavorite(film) {
        isFavorite(film.id) ? removeFavorite(film.id) : addFavorite(film)
    }

    // Persistance localStorage (bonus)
    function initStore() {
        const saved = localStorage.getItem('filmscope-favorites')
        if (saved) favorites.value = JSON.parse(saved)
    }

    function _persist() {
        localStorage.setItem('filmscope-favorites', JSON.stringify(favorites.value))
    }

    function getFilteredFavorites(search) {
        return favorites.value.filter(film =>
            film.title.toLowerCase().includes(search.trim().toLowerCase())
        )
    }

    return { favorites, favoriteCount, isFavorite, addFavorite, removeFavorite, toggleFavorite, initStore, getFilteredFavorites }
})
