<script setup>
import { ref, computed } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Rechercher un film..." type="search" />

  <button @click="$emit('update:modelValue', '')">Reset</button>
</template>

<style scoped>
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
  box-shadow: 0 2px 8px rgba(107, 44, 255, 0.4);
}
</style>