<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
const app = 'FilmScope'
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      {{ app }}, la webApp au style gothique qui vous fait aimer le cinéma !
    </h3>
    <nav class="navbar">
      <RouterLink to="/1">Menu principal</RouterLink>
      <RouterLink to="/favorites">Favoris</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 2.8rem;
  letter-spacing: 1px;
  color: var(--color-heading);
  text-shadow: 0 0 10px rgba(192, 57, 43, 0.4);
  /* glow rouge */
}

h3 {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.8;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;

  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 10px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* LIENS */
.navbar a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.5px;

  padding: 0.4rem 0.8rem;
  border-radius: 6px;

  transition: all 0.3s;
}

/* HOVER */
.navbar a:hover {
  color: var(--color-accent);
  background-color: rgba(192, 57, 43, 0.4);
  /* rouge hover */
}

/* LIEN ACTIF */
.navbar a.router-link-exact-active {
  color: var(--color-accent);
  background-color: rgba(192, 57, 43, 0.25);
  box-shadow: 0 0 8px rgba(192, 57, 43, 0.4);
  /* glow rouge */
}
</style>
