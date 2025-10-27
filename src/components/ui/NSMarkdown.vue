<script lang="ts" setup>
import { computed } from 'nativescript-vue';

const props = defineProps<{
  content: string;
}>();

interface MarkdownBlock {
  type: 'heading' | 'paragraph' | 'list-item' | 'empty';
  level?: number; // for headings: 1-6
  text: string;
  indent?: number; // for list items
}

// Simple Markdown parser for NativeScript
function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.split('\n');
  const blocks: MarkdownBlock[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Empty line
    if (line.trim() === '') {
      blocks.push({ type: 'empty', text: '' });
      continue;
    }

    // Heading (# ## ### etc)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].replace(/\*\*/g, ''), // Remove bold markers
      });
      continue;
    }

    // List item (- or * or numbered)
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const indent = Math.floor(listMatch[1].length / 2);
      blocks.push({
        type: 'list-item',
        text: listMatch[3].replace(/\*\*/g, ''), // Remove bold markers
        indent,
      });
      continue;
    }

    // Regular paragraph
    blocks.push({
      type: 'paragraph',
      text: line.replace(/\*\*/g, ''), // Remove bold markers
    });
  }

  return blocks;
}

const parsedBlocks = computed(() => parseMarkdown(props.content));
</script>

<template>
  <StackLayout class="markdown-container">
    <StackLayout
      v-for="(block, index) in parsedBlocks"
      :key="index"
      :class="[
        block.type === 'empty' ? 'mb-2' : '',
        block.type === 'heading' ? 'mb-3' : '',
        block.type === 'paragraph' ? 'mb-3' : '',
        block.type === 'list-item' ? 'mb-2' : '',
      ]"
    >
      <!-- Heading -->
      <Label
        v-if="block.type === 'heading'"
        :text="block.text"
        textWrap="true"
        :class="[
          block.level === 1 ? 'text-2xl font-bold text-foreground' : '',
          block.level === 2 ? 'text-xl font-bold text-foreground mt-4' : '',
          block.level === 3 ? 'text-lg font-semibold text-foreground mt-3' : '',
          block.level && block.level >= 4 ? 'text-base font-semibold text-foreground mt-2' : '',
        ]"
      />

      <!-- Paragraph -->
      <Label
        v-else-if="block.type === 'paragraph'"
        :text="block.text"
        textWrap="true"
        class="text-sm text-foreground leading-relaxed"
      />

      <!-- List Item -->
      <GridLayout
        v-else-if="block.type === 'list-item'"
        columns="auto, *"
        :style="`margin-left: ${(block.indent || 0) * 16};`"
      >
        <Label
          col="0"
          text="•"
          class="text-sm text-primary mr-2"
          verticalAlignment="top"
        />
        <Label
          col="1"
          :text="block.text"
          textWrap="true"
          class="text-sm text-foreground leading-relaxed"
        />
      </GridLayout>
    </StackLayout>
  </StackLayout>
</template>

<style scoped>
.markdown-container {
  padding: 16;
}
</style>
