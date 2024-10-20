<script setup lang="ts">
export type Typography = 'label-1-regular' |
    'label-2-regular' |
    'label-3-regular' |
    'label-4-regular' |
    'label-5-regular' |
    'paragraph-1-regular' |
    'paragraph-2-regular' |
    'paragraph-3-regular' |
    'paragraph-4-regular' |
    'title-1-semibold' |
    'title-2-semibold' |
    'title-3-semibold' |
    'title-4-semibold' |
    'title-5-semibold' |
    'subtitle-1-semibold' |
    'subtitle-2-semibold' |
    'subtitle-3-semibold' |
    'subtitle-4-semibold'


export interface TextProps {
    typography: Typography
}

const props = defineProps<TextProps>()
</script>

<template>
    <div :class="['text', props.typography]">
        <slot></slot>
    </div>
</template>

<style scoped>
.text {}

.title-1-semibold {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 0.5px;
}

.title-2-semibold {
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0.5px;
}

.title-3-semibold {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.25px;
}

.title-4-semibold {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.25px;
}

.title-5-semibold {
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0;
}

.subtitle-1-semibold {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0;
}

.subtitle-2-semibold {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0;
}

.subtitle-3-semibold {
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0;
}

.subtitle-4-semibold {
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0;
}

.paragraph-1-regular {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.25px;
}

.paragraph-2-regular {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.25px;
}

.paragraph-3-regular {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
}

.paragraph-4-regular {
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.25px;
}

.label-1-regular {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.5px;
}

.label-2-regular {
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.5px;
}

.label-3-regular {
    font-size: 8px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.5px;
}

.label-4-regular {
    font-size: 6px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0.5px;
}

.label-5-regular {
    font-size: 5px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0.5px;
}
</style>
