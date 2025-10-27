<script lang="ts" setup>
import { ref, computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSTabsProps {
  selectedIndex?: number;
  class?: string;
}

const props = withDefaults(defineProps<NSTabsProps>(), {
  selectedIndex: 0,
  class: '',
});

const emit = defineEmits<{
  'update:selectedIndex': [index: number];
}>();

const currentIndex = ref(props.selectedIndex);

const tabsClass = computed(() => {
  return cn('bg-background', props.class);
});

function onSelectedIndexChanged(args: any) {
  currentIndex.value = args.newIndex;
  emit('update:selectedIndex', args.newIndex);
}
</script>

<template>
  <TabView
    :selectedIndex="currentIndex"
    :class="tabsClass"
    @selectedIndexChanged="onSelectedIndexChanged"
  >
    <slot />
  </TabView>
</template>
