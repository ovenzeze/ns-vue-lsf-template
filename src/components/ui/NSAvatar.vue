<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSAvatarProps {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

const props = withDefaults(defineProps<NSAvatarProps>(), {
  src: '',
  initials: '?',
  size: 'md',
  class: '',
});

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const avatarClass = computed(() => {
  return cn(
    'rounded-full bg-muted',
    props.class
  );
});

const avatarSize = computed(() => sizeMap[props.size]);
</script>

<template>
  <GridLayout
    :width="avatarSize"
    :height="avatarSize"
    :class="avatarClass"
  >
    <Image
      v-if="src"
      :src="src"
      stretch="aspectFill"
      class="rounded-full"
    />
    <Label
      v-else
      :text="initials"
      class="text-muted-foreground font-semibold text-center"
      verticalAlignment="center"
    />
  </GridLayout>
</template>
