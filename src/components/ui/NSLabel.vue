<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed } from 'nativescript-vue';

export interface NSLabelProps {
  text?: string;
  variant?: 'default' | 'muted' | 'heading' | 'subheading';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  class?: string;
}

const props = withDefaults(defineProps<NSLabelProps>(), {
  text: '',
  variant: 'default',
  size: 'base',
  class: '',
});

const labelClass = computed(() => {
  const variantClasses = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    heading: 'text-foreground font-bold font-display',
    subheading: 'text-muted-foreground font-semibold',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  return cn(
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class
  );
});
</script>

<template>
  <Label :text="text" :class="labelClass">
    <slot />
  </Label>
</template>
