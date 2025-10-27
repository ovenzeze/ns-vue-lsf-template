<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSSwitchProps {
  modelValue?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<NSSwitchProps>(), {
  modelValue: false,
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const switchClass = computed(() => {
  return cn('bg-primary', props.class);
});

function onCheckedChange(args: any) {
  emit('update:modelValue', args.value);
}
</script>

<template>
  <Switch
    :checked="modelValue"
    :class="switchClass"
    @checkedChange="onCheckedChange"
  />
</template>
