<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import banner from '@/assets/filmScope.jpg'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" :src="banner" width="400" />

    <div class="wrapper">
      <HelloWorld msg="FilmScope, le site d'entrainement à vue.js" />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  filter: grayscale(100%) brightness(0.8);
  opacity: 0.9;
}

.wrapper {
  text-align: center;
}
</style>
