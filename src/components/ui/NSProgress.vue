<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSProgressProps {
  value: number;
  maxValue?: number;
  class?: string;
}

const props = withDefaults(defineProps<NSProgressProps>(), {
  value: 0,
  maxValue: 100,
  class: '',
});

const progressClass = computed(() => {
  return cn('bg-primary', props.class);
});
</script>

<template>
  <Progress
    :value="value"
    :maxValue="maxValue"
    :class="progressClass"
  />
</template>
