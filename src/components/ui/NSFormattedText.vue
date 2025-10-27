<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  text: string;
  class?: string;
}>();

interface TextSegment {
  text: string;
  bold: boolean;
}

// Parse markdown **bold** syntax
const segments = computed<TextSegment[]>(() => {
  const result: TextSegment[] = [];
  const regex = /(\*\*.*?\*\*)/g;
  const parts = props.text.split(regex);
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      result.push({
        text: part.slice(2, -2),
        bold: true
      });
    } else if (part) {
      // Normal text
      result.push({
        text: part,
        bold: false
      });
    }
  });
  
  return result;
});
</script>

<template>
  <FormattedString>
    <Span
      v-for="(segment, index) in segments"
      :key="index"
      :text="segment.text"
      :fontWeight="segment.bold ? 'bold' : 'normal'"
      :class="props.class"
    />
  </FormattedString>
</template>
