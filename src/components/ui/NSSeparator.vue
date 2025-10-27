<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  class?: string;
}

const props = withDefaults(defineProps<NSSeparatorProps>(), {
  orientation: 'horizontal',
  class: '',
});

const separatorClass = computed(() => {
  const baseClass = props.orientation === 'horizontal' ? 'separator' : 'separator-vertical';
  return cn(baseClass, props.class);
});

</script>

<template>
  <ContentView
    :class="separatorClass"
  />
</template>
