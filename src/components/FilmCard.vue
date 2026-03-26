<script setup>
import { useRouter } from 'vue-router'
import { getPosterUrl } from '@/services/tmdbService'
import Button from './Button.vue';

const router = useRouter()

defineProps({
  film: {
    type: Object,
    required: true,
  },
  isFav: Boolean
})

const emit = defineEmits(['add-favorite'])
</script>

<template>
  <div class="film-card" @click="router.push({ name: 'film', params: { id: film.id } })">
    <div class="left-content">
      <h4>{{ film.title }} ({{ film.year }})</h4>
      <img :src="getPosterUrl(film.poster_path)" :alt="film.title">
    </div>

    <span v-if="isFav" class="favorite-badge">
      ★ Favori
    </span>

    <Button text="Ajouter aux favoris" @click.stop="emit('add-favorite', film)" />
  </div>
</template>

<style scoped>
.film-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.3s;
}

.film-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 44, 255, 0.2);
}

.left-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.left-content h4 {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
  font-weight: 600;
}

.left-content img {
  max-width: 120px;
  border-radius: 4px;
  filter: grayscale(100%) brightness(0.85);
  opacity: 0.9;
  transition: all 0.3s;
}

.left-content img:hover {
  filter: brightness(1) grayscale(0%);
  transform: scale(1.05);
}

h4 {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

img {
  max-width: 120px;
  border-radius: 4px;
  filter: grayscale(100%) brightness(0.8);
  opacity: 0.9;
}

/* Badge Favori */
.favorite-badge {
  position: absolute;
  top: 10px;
  right: 10px;

  background: rgba(107, 44, 255, 0.15);
  color: var(--color-accent);

  border: 1px solid var(--color-accent);
  border-radius: 20px;

  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  backdrop-filter: blur(4px);
  box-shadow: 0 0 8px rgba(107, 44, 255, 0.3);
}
</style>