<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed, ref } from 'nativescript-vue';

export interface NSButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'link' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<NSButtonProps>(), {
  variant: 'default',
  size: 'md',
  class: '',
});

const isPressed = ref(false);

const buttonClass = computed(() => {
  const variantClass = `btn-${props.variant}`;
  const sizeClass = `btn-${props.size}`;
  const pressedClass = isPressed.value ? 'btn-pressed' : '';
  
  return cn(variantClass, sizeClass, pressedClass, props.class);
});

function handleTouchDown() {
  isPressed.value = true;
}

function handleTouchUp() {
  isPressed.value = false;
}
</script>

<template>
  <Button 
    :class="buttonClass"
    @touch="(args) => {
      if (args.action === 'down') handleTouchDown();
      else if (args.action === 'up' || args.action === 'cancel') handleTouchUp();
    }"
  >
    <slot />
  </Button>
</template>
