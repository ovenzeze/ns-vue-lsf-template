<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed } from 'nativescript-vue';

export interface NSBadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'success';
  text?: string;
  class?: string;
}

const props = withDefaults(defineProps<NSBadgeProps>(), {
  variant: 'default',
  text: '',
  class: '',
});

const badgeClass = computed(() => {
  return cn('badge', `badge-${props.variant}`, props.class);
});
</script>

<template>
  <Label :text="text" :class="badgeClass">
    <slot />
  </Label>
</template>
