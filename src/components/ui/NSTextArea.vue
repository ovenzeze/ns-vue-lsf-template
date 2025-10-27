<script lang="ts" setup>
import { computed } from 'nativescript-vue';
import { cn } from '@/lib/utils';

export interface NSTextAreaProps {
  modelValue?: string;
  placeholder?: string;
  hint?: string;
  class?: string;
}

const props = withDefaults(defineProps<NSTextAreaProps>(), {
  modelValue: '',
  placeholder: '',
  hint: '',
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const textAreaClass = computed(() => {
  return cn(
    'bg-background text-foreground border border-input rounded-lg px-4 py-3 text-base min-h-24',
    props.class
  );
});

function onTextChange(args: any) {
  emit('update:modelValue', args.value);
}
</script>

<template>
  <TextView
    :text="modelValue"
    :hint="placeholder || hint"
    :class="textAreaClass"
    @textChange="onTextChange"
  />
</template>
