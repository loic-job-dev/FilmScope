<script setup>
import { ref, computed } from 'vue'
import FilmList from '@/components/FilmList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const search = ref('')

const favoriteStore = useFavoriteStore()

const filteredFavoriteFilms = computed(() => favoriteStore.getFilteredFavorites(search.value))
</script>

<template>
  <main>
    <SearchBar label="Recherche par titre" v-model="search" place-holder="Titre du film..." />

    <div v-if="search !== ''">
      <p>{{ filteredFavoriteFilms.length }} résultat(s)</p>
    </div>

    <div v-if="filteredFavoriteFilms.length === 0">
      <h3>Liste de films vide !</h3>
    </div>
    <div v-else>
      <FilmList :list="filteredFavoriteFilms" />
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}

input {
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1.5rem;

  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text);

  border-radius: 6px;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 8px rgba(192, 57, 43, 0.4);
}

h2 {
  margin: 1rem 0;
  color: var(--color-heading);
}

h3 {
  color: #888;
}
</style>
