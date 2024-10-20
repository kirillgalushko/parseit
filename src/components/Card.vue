<script setup lang="ts">

interface Card {
    background?: 'default' | 'secondary';
    stretched?: boolean;
}

interface NonInteractiveCard extends Card {
    interactive?: false;
    onClick?: (event: MouseEvent) => void;
}

interface InteracviveCard extends Card {
    interactive: true;
    onClick: (event: MouseEvent) => void;
}

export type CardProps = NonInteractiveCard | InteracviveCard

const props = withDefaults(defineProps<CardProps>(), {
    interactive: false,
    background: 'default',
})

</script>

<template>
    <component :is="props.interactive ? 'button' : 'div'"
        :class="['card', props.background, { interactive: props.interactive, stretched: props.stretched }]"
        @click="onClick">
        <slot></slot>
    </component>
</template>

<style scoped>
.card {
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 12px;
}

.default {
    background-color: transparent;
}

.secondary {
    background-color: var(--color-bg-secondary);
}

.interactive {
    text-align: initial;
    transition: background-color 0.2s;
    cursor: pointer;
}

.interactive:hover {
    background-color: var(--color-bg-secondary);
}

.stretched {
    width: 100%;
}
</style>