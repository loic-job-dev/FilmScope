<script setup>
import FilmCard from '@/components/FilmCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

defineProps({
  list: {
    type: Array,
    required: true,
  },
  search: {
    type: String,
    required: false,
  },
})

const favoriteStore = useFavoriteStore()

function handleToggle(film) {
  favoriteStore.toggleFavorite(film)
}
</script>

<template>
  <div class="film-list">
    <FilmCard
      v-for="film in list"
      :key="film.id"
      :film="film"
      :is-fav="favoriteStore.isFavorite(film.id)"
      @add-favorite="handleToggle"
    />
  </div>
</template>

<style scoped>
.film-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
