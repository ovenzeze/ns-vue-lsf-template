<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSStackProps {
  orientation?: 'vertical' | 'horizontal';
  spacing?: number;
  class?: string;
}

const props = withDefaults(defineProps<NSStackProps>(), {
  orientation: 'vertical',
  spacing: 0,
  class: '',
});

const stackClass = computed(() => {
  return cn(props.class);
});
</script>

<template>
  <StackLayout
    :orientation="orientation"
    :class="stackClass"
  >
    <slot />
  </StackLayout>
</template>
