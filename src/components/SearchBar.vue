<script setup>
import { ref, computed } from 'vue'
import Button from './Button.vue'

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeHolder: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search-container">
    <label for="search-input" class="label">
      {{ label }}
    </label>

    <input
      id="search-input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeHolder"
      type="search"
    />
  </div>

  <Button text="Reset" @click="$emit('update:modelValue', '')" :disabled="modelValue === ''" />
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.label {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
  letter-spacing: 0.5px;
}

input {
  width: 100%;
  padding: 0.7rem;

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
</style>
