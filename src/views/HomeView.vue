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
const displayedFilms = computed(() => (search.value ? searchResults.value : popularFilms.value))

// Variable dynamique pour le numéro de page
const currentPage = computed(() => Number(route.params.page || 1))

//Fonction pour le changement de page
function goToPage(page) {
  if (page < 1) page = 1

  router.push({
    name: 'home',
    params: { page },
  })
}

async function loadFilms(page) {
  isLoading.value = true
  error.value = null
  const startTime = Date.now() // timestamp au début

  try {
    popularFilms.value = await getPopularFilms(page)
  } catch (e) {
    error.value = e
  } finally {
    // calcul du temps écoulé
    const elapsed = Date.now() - startTime
    const remaining = 1500 - elapsed // 1500ms = temps minimal

    // on attend le temps restant si nécessaire
    if (remaining > 0) {
      setTimeout(() => {
        isLoading.value = false
      }, remaining)
    } else {
      isLoading.value = false
    }
  }
}

// watch : réagit aux changements de search
let timeout = null

watch(search, (newQuery) => {
  // search est un ref, donc chaque changement déclenche le watch
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
  }, 800) // 800ms
})

watch(
  () => route.params.page, // route.params.page n'est pas un ref, juste une valeur, donc le watch doit regarder une fonction (getter réactif)
  (newPage) => {
    loadFilms(Number(newPage) || 1)
  },
  { immediate: true },
)
</script>

<template>
  <main>
    <SearchBar v-model="search" />

    <div class="nav_buttons">
      <Button text="Précédent" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" />
      <Button text="Suivant" @click="goToPage(currentPage + 1)" :disabled="currentPage === 50" />
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="loading-gothic">
      <div class="spinner-flame"></div>
      <p class="loading-text">
        Chargement en cours...
      </p>
    </div>

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

    <div class="nav_buttons">
      <Button text="Précédent" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" />
      <Button text="Suivant" @click="goToPage(currentPage + 1)" :disabled="currentPage === 50" />
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

.nav_buttons {
  margin: 2rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  padding: 0.8rem 1.5rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
}

/* Container */
.loading-gothic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  font-family: 'Cinzel', serif;
  color: #ff4d4d;
  text-shadow: 0 0 6px rgba(192, 57, 43, 0.8);
}

/* Texte */
.loading-text {
  font-size: 1.2rem;
  letter-spacing: 1px;
}

/* Spinner avec effet de “flammes” */
.spinner-flame {
  width: 70px;
  height: 70px;
  border: 6px solid rgba(192, 57, 43, 0.15);
  border-top-color: #ff1a1a;
  border-radius: 50%;
  position: relative;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 12px rgba(255, 26, 26, 0.7), 0 0 20px rgba(192, 57, 43, 0.3) inset;
}

/* Ajout de “flammes” pulsantes autour du spinner */
.spinner-flame::before,
.spinner-flame::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, #ff1a1a, rgba(192, 57, 43, 0));
  border-radius: 50%;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  animation: flame 1s infinite alternate;
}

.spinner-flame::after {
  top: auto;
  bottom: -10px;
  animation-delay: 0.5s;
}

/* Animations */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    text-shadow: 0 0 8px rgba(255, 26, 26, 0.7), 0 0 16px rgba(192, 57, 43, 0.5);
  }

  100% {
    text-shadow: 0 0 16px rgba(255, 26, 26, 1), 0 0 32px rgba(192, 57, 43, 0.8);
  }
}

@keyframes flame {
  0% {
    transform: translateX(-50%) scale(0.8);
    opacity: 0.6;
  }

  100% {
    transform: translateX(-50%) scale(1.2);
    opacity: 1;
  }
}
</style>
