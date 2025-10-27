<script lang="ts" setup>
import { inject, ref } from 'nativescript-vue';
import NSBadge from '../ui/NSBadge.vue';
import NSButton from '../ui/NSButton.vue';
import NSLabel from '../ui/NSLabel.vue';
import NSSeparator from '../ui/NSSeparator.vue';
import { useDialog } from '../../composables/useDialog';

// Get navigation function from parent component
const switchTab = inject('switchTab') as ((tabId: string, categoryId?: string) => void) | undefined;
const { showAlert } = useDialog();


const releaseHighlights = [
  {
    icon: '🧩',
    title: 'UI Components',
    description: 'Buttons, forms, layout & navigation.',
  },
  {
    icon: '🎨',
    title: 'Dual Themes',
    description: 'Light & dark mode with design tokens.',
  },
  {
    icon: '🛠️',
    title: 'Composables',
    description: 'Toast, Dialog & validation helpers.',
  },
];

// 颜色映射
const colorMap = {
  'text-primary': '#3b82f6',    // Blue 500
  'text-success': '#10b981',    // Green 500
  'text-secondary': '#8b5cf6',  // Violet 500
  'text-warning': '#f59e0b',    // Amber 500
  'text-destructive': '#ef4444', // Red 500
  'text-accent': '#06b6d4',     // Cyan 500
};

// Component Library Categories - 选择最重要的6个组件
const componentCategories = [
  { id: 'buttons', title: 'Buttons', subtitle: 'Interactive elements', icon: '\uf0a4', color: 'text-primary' },
  { id: 'inputs', title: 'Form Inputs', subtitle: 'Text fields & forms', icon: '\uf044', color: 'text-success' },
  { id: 'display', title: 'Data Display', subtitle: 'Tables & lists', icon: '\uf06e', color: 'text-secondary' },
  { id: 'feedback', title: 'Feedback', subtitle: 'Alerts & toasts', icon: '\uf0e7', color: 'text-warning' },
  { id: 'layout', title: 'Layout', subtitle: 'Grids & containers', icon: '\uf009', color: 'text-destructive' },
  { id: 'cards', title: 'Cards', subtitle: 'Content containers', icon: '\uf2c2', color: 'text-accent' },
];

// 获取颜色值（根据当前主题）
function getCategoryColor(colorClass: string): string {
  const { SimpleThemeManager } = require('../../utils/theme');
  const isDark = SimpleThemeManager.isDarkTheme();

  if (isDark) {
    // 暗色主题的颜色（稍微调整亮度以确保在暗色背景下可见）
    const darkColorMap = {
      'text-primary': '#60a5fa',    // Blue 400
      'text-success': '#34d399',    // Green 400
      'text-secondary': '#a78bfa',  // Violet 400
      'text-warning': '#fbbf24',    // Amber 400
      'text-destructive': '#f87171', // Red 400
      'text-accent': '#22d3ee',     // Cyan 400
    };
    return darkColorMap[colorClass as keyof typeof darkColorMap] || '#9ca3af';
  } else {
    // 亮色主题的颜色
    return colorMap[colorClass as keyof typeof colorMap] || '#6b7280';
  }
}

const projectStats = [
  { label: 'Components', value: '15', helper: 'UI primitives' },
  { label: 'Showcases', value: '6', helper: 'Demo pages' },
  { label: 'Themes', value: '2', helper: 'Light & Dark' },
];


function navigateToShowcase() {
  if (switchTab) {
    switchTab('discover', 'buttons'); // 默认显示按钮组件
  } else {
    console.log('[HomePage] Navigate to Component Showcase');
  }
}


function navigateToCategory(categoryId: string) {
  if (switchTab) {
    switchTab('discover', categoryId);
    console.log(`[HomePage] Navigate to discover page with category: ${categoryId}`);
  } else {
    console.log(`[HomePage] Navigate to category: ${categoryId}`);
  }
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-5">

      <!-- Hero Section -->
      <StackLayout class="bg-gradient-to-br from-primary-subtle to-secondary-subtle p-5 mb-6 rounded-xl" style="androidElevation: 2;">
        <StackLayout orientation="horizontal" class="mb-4">
          <StackLayout class="flex-1">
            <StackLayout orientation="horizontal" class="mb-3">
              <Label text="&#xf1c0;" class="fas text-3xl text-primary mr-3" />
              <NSLabel
                variant="heading"
                text="NativeScript Vue"
                class="text-3xl"
              />
            </StackLayout>
            <Label
              text="Component Library"
              class="text-xl font-semibold text-muted-foreground mb-2"
            />
            <Label
              text="shadcn/ui inspired components for NativeScript"
              class="text-sm text-muted-foreground leading-relaxed"
            />
          </StackLayout>
          <StackLayout class="justify-center">
            <NSBadge
              variant="success"
              text="Latest"
              horizontalAlignment="center"
            />
          </StackLayout>
        </StackLayout>
      </StackLayout>


      <!-- Component Library Categories -->
      <Label text="COMPONENT LIBRARY" class="section-header mb-4" />
      <StackLayout class="bg-card mb-6 rounded-lg" style="androidElevation: 1;">
        <StackLayout
          v-for="(category, index) in componentCategories"
          :key="category.id"
          @tap="navigateToCategory(category.id)"
        >
          <GridLayout columns="auto, *, auto" class="list-item" rows="auto">
            <Label
              :text="category.icon"
              col="0"
              :class="['fas text-2xl mr-4']"
              :style="`color: ${getCategoryColor(category.color)}; width: 80px; text-align: center; display: inline-block;`"
              verticalAlignment="center"
            />
            <StackLayout col="1" verticalAlignment="center">
              <Label 
                :text="category.title" 
                class="font-semibold text-base mb-1" 
                textWrap="true" 
              />
              <Label
                :text="category.subtitle"
                class="text-sm text-muted-foreground"
                textWrap="true"
              />
            </StackLayout>
            <Label
              text="&#xf054;"
              col="2"
              class="fas text-sm text-primary"
              verticalAlignment="center"
            />
          </GridLayout>
          <NSSeparator v-if="index < componentCategories.length - 1" class="ml-16" />
        </StackLayout>
      </StackLayout>

      <!-- Features Section -->
      <Label text="KEY FEATURES" class="section-header mb-4" />
      <StackLayout class="bg-card mb-6 rounded-lg" style="androidElevation: 1;">
        <StackLayout
          v-for="(feature, index) in releaseHighlights"
          :key="feature.title"
          @tap="() => {}"
        >
          <GridLayout columns="auto, *, auto" class="list-item" rows="auto">
            <Label
              :text="feature.icon"
              col="0"
              class="text-2xl mr-4"
              :style="`width: 80px; text-align: center; display: inline-block;`"
              verticalAlignment="center"
            />
            <StackLayout col="1" verticalAlignment="center">
              <Label :text="feature.title" class="font-semibold text-base mb-1" textWrap="true" />
              <Label
                :text="feature.description"
                class="text-sm text-muted-foreground"
                textWrap="true"
              />
            </StackLayout>
            <Label
              text="&#xf054;"
              col="2"
              class="fas text-sm text-primary"
              verticalAlignment="center"
            />
          </GridLayout>
          <NSSeparator v-if="index < releaseHighlights.length - 1" class="ml-16" />
        </StackLayout>
      </StackLayout>

      <!-- Stats Section -->
      <Label text="PROJECT OVERVIEW" class="section-header mb-4" />
      <StackLayout class="bg-card p-6 mb-6 rounded-lg" style="androidElevation: 1;">
        <GridLayout columns="*, *, *" class="mb-2">
          <StackLayout
            v-for="(stat, index) in projectStats"
            :key="stat.label"
            :col="index"
            class="text-center"
          >
            <Label :text="stat.value" class="text-4xl font-bold text-primary mb-2" />
            <Label :text="stat.label" class="text-sm font-semibold mb-1" textWrap="true" textAlignment="center" />
            <Label
              :text="stat.helper"
              class="text-xs text-muted-foreground"
              textWrap="true"
              textAlignment="center"
            />
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <!-- Call to Action -->
      <NSButton
        variant="primary"
        text="View Component Showcase"
        class="mb-6"
        @tap="navigateToShowcase"
      />
    </StackLayout>
  </ScrollView>
</template>

