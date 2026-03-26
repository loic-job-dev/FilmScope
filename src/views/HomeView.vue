<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import FilmList from '@/components/FilmList.vue'
import SearchBar from '@/components/SearchBar.vue'
import Button from '@/components/Button.vue'
import { getPopularFilms, searchFilms } from '@/services/tmdbService'
import { useRoute, useRouter } from 'vue-router'


// useRoute() : accès aux infos de la route courante (params, query...)
const route = useRoute()
// useRouter() : navigation programmatique
const router = useRouter()

const search = ref('')
const popularFilms = ref([])
const searchResults = ref([])
const isLoading = ref(false)
const error = ref(null)

// Afficher les résultats de recherche ou les films populaires
const displayedFilms = computed(() =>
  search.value ? searchResults.value : popularFilms.value
)

async function loadFilms(page) {
  isLoading.value = true
  error.value = null
  try {
    popularFilms.value = await getPopularFilms(page)
  } catch (e) {
    error.value = e
  } finally {
    // finally s'exécute toujours, même en cas d'erreur
    isLoading.value = false
  }
}

// watch : réagit aux changements de searchQuery
let timeout = null

watch(search, (newQuery) => {
  clearTimeout(timeout)

  timeout = setTimeout(async () => {
    if (!newQuery.trim()) {
      searchResults.value = []
      return
    }

    isLoading.value = true
    try {
      searchResults.value = await searchFilms(newQuery)
    } finally {
      isLoading.value = false
    }
  }, 400) // 400ms
})

// onMounted : chargement initial au montage du composant
onMounted(() => {
  // route.params.id contient la valeur du :id dans l'URL
  const page = Number(route.params.page)
  loadFilms(page)
})
</script>

<template>
  <main>
    <SearchBar v-model="search" />

    <!-- État de chargement -->
    <div v-if="isLoading" class="loading">Chargement...</div>

    <!-- État d'erreur -->
    <div v-else-if="error" class="error">
      Erreur : {{ error.message }}
      <button @click="loadFilms">Réessayer</button>
    </div>

    <div v-else>
      <div v-if="search !== ''">
        <p>{{ displayedFilms.length }} résultat(s)</p>
      </div>

      <div v-if="displayedFilms.length === 0">
        <h3>Liste de films vide !</h3>
      </div>

      <div v-else>
        <FilmList :list="displayedFilms" />
      </div>
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
  box-shadow: 0 0 8px rgba(107, 44, 255, 0.3);
}

h2 {
  margin: 1rem 0;
  color: var(--color-heading);
}

h3 {
  color: #888;
}
</style>