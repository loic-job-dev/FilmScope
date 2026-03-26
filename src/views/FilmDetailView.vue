<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFilmDetail, getPosterUrl } from '@/services/tmdbService'

// useRoute() : accès aux infos de la route courante (params, query...)
const route = useRoute()
// useRouter() : navigation programmatique
const router = useRouter()

const film = ref(null)
const isLoading = ref(false)
const error = ref(null)

async function loadFilm(id) {
  isLoading.value = true
  error.value = null
  try {
    film.value = await getFilmDetail(id)
  } catch (e) {
    error.value = e
  } finally {
    // finally s'exécute toujours, même en cas d'erreur
    isLoading.value = false
  }
}

onMounted(() => {
  // route.params.id contient la valeur du :id dans l'URL
  const idFilm = Number(route.params.id)
  loadFilm(idFilm)
})
</script>

<template>
  <main class="film-detail">
    <!-- État de chargement -->
    <div v-if="isLoading" class="loading-gothic">
      <Spinner text="Chargement en cours..." />
    </div>

    <div v-if="!film">
      <h2>Film introuvable...</h2>
    </div>

    <div v-else>
      <img :src="getPosterUrl(film.poster_path)" :alt="film.title" class="poster" />

      <div class="info">
        <h1>{{ film.title }}</h1>
        <h2>{{ film.release_date }}</h2>
        <p>{{ film.overview }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.film-detail {
  padding: 2rem;
}

.content {
  display: flex;
  gap: 2rem;
  align-items: center;

  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 2rem;

  box-shadow: 0 4px 15px rgba(107, 44, 255, 0.1);
}

/* Affiche */
.poster {
  max-width: 220px;
  border-radius: 6px;
  filter: grayscale(100%) brightness(0.85);
  transition: all 0.3s;
}

.poster:hover {
  filter: brightness(1) grayscale(0%);
  transform: scale(1.05);
}

/* Infos */
.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info h1 {
  color: var(--color-heading);
  font-size: 2rem;
  font-weight: 600;
}

.info h2 {
  color: var(--color-text);
  opacity: 0.7;
  font-weight: 400;
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

/* Responsive */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
  }

  .info {
    align-items: center;
  }
}
</style>
