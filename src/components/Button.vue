<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button v-bind="$attrs">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  padding: 0.4rem 0.8rem;
  background-color: var(--color-accent);
  color: var(--color-background-soft);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

button:hover {
  background-color: var(--color-accent-soft);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(192, 57, 43, 0.4);
}

button:disabled {
  background-color: #2a2a35;
  color: #777;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
  transform: none;
}

button:disabled:hover {
  background-color: #2a2a35;
  transform: none;
  box-shadow: none;
}
</style>
