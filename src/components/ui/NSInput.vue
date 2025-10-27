<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed } from 'nativescript-vue';

export interface NSInputProps {
  modelValue?: string;
  placeholder?: string;
  keyboardType?: 'datetime' | 'email' | 'integer' | 'number' | 'phone' | 'url';
  secure?: boolean;
  hint?: string;
  class?: string;
}

const props = withDefaults(defineProps<NSInputProps>(), {
  modelValue: '',
  placeholder: '',
  secure: false,
  hint: '',
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputClass = computed(() => {
  return cn('input', props.class);
});

const keyboardTypeMap = {
  datetime: 'datetime',
  email: 'email',
  integer: 'integer',
  number: 'number',
  phone: 'phone',
  url: 'url',
};

function onTextChange(args: any) {
  emit('update:modelValue', args.value);
}
</script>

<template>
  <TextField
    :text="modelValue"
    :hint="placeholder || hint"
    :keyboardType="keyboardType ? keyboardTypeMap[keyboardType] : undefined"
    :secure="secure"
    :class="inputClass"
    @textChange="onTextChange"
  />
</template>
