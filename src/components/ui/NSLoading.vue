<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSLoadingProps {
  busy?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<NSLoadingProps>(), {
  busy: true,
  size: 'md',
  class: '',
});

const loadingClass = computed(() => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return cn(sizeClasses[props.size], props.class);
});
</script>

<template>
  <ActivityIndicator
    :busy="busy"
    :class="loadingClass"
  />
</template>
