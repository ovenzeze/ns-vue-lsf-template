<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed } from 'nativescript-vue';

export interface NSCardProps {
  elevation?: number;
  class?: string;
}

const props = withDefaults(defineProps<NSCardProps>(), {
  elevation: 2,
  class: '',
});

const cardClass = computed(() => {
  return cn('card', props.class);
});

const cardStyle = computed(() => {
  return `androidElevation: ${props.elevation};`;
});
</script>

<template>
  <StackLayout :class="cardClass" :style="cardStyle">
    <slot />
  </StackLayout>
</template>
