<script setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="spinner-flame"></div>
    <p class="loading-text">
        {{ text }}
    </p>
</template>

<style scoped>
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