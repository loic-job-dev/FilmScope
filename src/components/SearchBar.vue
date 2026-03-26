<script setup>
import { ref, computed } from 'vue'
import Button from './Button.vue';

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

  <Button text="Rest" @click="$emit('update:modelValue', '')" />
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
</style>