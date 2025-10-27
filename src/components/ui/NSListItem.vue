<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed } from 'nativescript-vue';

export interface NSListItemProps {
  title: string;
  subtitle?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  class?: string;
}

const props = withDefaults(defineProps<NSListItemProps>(), {
  title: '',
  subtitle: '',
  leadingIcon: '',
  trailingIcon: '',
  class: '',
});

const itemClass = computed(() => {
  return cn('px-4 py-3 bg-background border-b border-border', props.class);
});
</script>

<template>
  <GridLayout :class="itemClass" columns="auto, *, auto" rows="auto">
    <Label
      v-if="leadingIcon"
      col="0"
      :text="leadingIcon"
      class="text-2xl mr-3"
      verticalAlignment="center"
    />

    <StackLayout
      :col="leadingIcon ? 1 : 0"
      verticalAlignment="center"
    >
      <Label
        :text="title"
        class="text-base font-medium mb-1"
        textWrap="true"
      />
      <Label
        v-if="subtitle"
        :text="subtitle"
        class="text-sm text-muted-foreground"
        textWrap="true"
      />
    </StackLayout>

    <Label
      v-if="trailingIcon"
      col="2"
      :text="trailingIcon"
      class="fas text-sm text-muted-foreground ml-3"
      verticalAlignment="center"
    />
  </GridLayout>
</template>
