<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import { Application, ApplicationSettings, Device } from '@nativescript/core';
import NSLabel from './NSLabel.vue';
import NSSeparator from './NSSeparator.vue';

// Theme options
const themes = [
  { id: 'light', name: 'Light', description: 'Clean and bright' },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
  { id: 'auto', name: 'Auto', description: 'Follow system' }
];

// Current theme state
const currentTheme = ref('auto');

// Methods
function setTheme(themeId: string) {
  currentTheme.value = themeId;
  applyTheme();
}

function applyTheme() {
  console.log(`[ThemeSelector] Applying theme: ${currentTheme.value}`);
  
  let targetTheme = currentTheme.value;
  
  // Handle auto theme by detecting system theme
  if (currentTheme.value === 'auto') {
    // Get system appearance - fallback to light if not available
    const systemAppearance = Application.systemAppearance();
    targetTheme = systemAppearance === 'dark' ? 'dark' : 'light';
    console.log(`[ThemeSelector] Auto theme resolved to: ${targetTheme} (system: ${systemAppearance})`);
  }
  
  try {
    // Use official NativeScript method to switch CSS files
    const cssFileName = targetTheme === 'dark' ? '~/app-dark.css' : '~/app.css';
    console.log(`[ThemeSelector] Switching to CSS file: ${cssFileName}`);
    
    Application.setCssFileName(cssFileName);
    
    // Also set the root view class as backup for components that might rely on it
    const rootView = Application.getRootView();
    if (rootView) {
      rootView.className = `ns-${targetTheme}`;
      console.log(`[ThemeSelector] Set rootView className: ns-${targetTheme}`);
    }
    
    console.log(`[ThemeSelector] Theme successfully changed to: ${targetTheme}`);
  } catch (error) {
    console.error('[ThemeSelector] Error applying theme:', error);
  }
  
  // Save theme preference
  saveThemePreference();
}

// Initialize theme on mount
function initializeTheme() {
  // Try to get saved theme preference
  const savedTheme = ApplicationSettings.getString('app_theme', 'auto');
  currentTheme.value = savedTheme;
  console.log(`[ThemeSelector] Initializing with saved theme: ${savedTheme}`);
  applyTheme();
}

// Save theme preference
function saveThemePreference() {
  ApplicationSettings.setString('app_theme', currentTheme.value);
  console.log(`[ThemeSelector] Saved theme preference: ${currentTheme.value}`);
}

// Get current theme method
function getCurrentTheme() {
  return currentTheme.value;
}

// Expose methods for parent component
defineExpose({
  setTheme,
  applyTheme,
  initializeTheme,
  getCurrentTheme
});
</script>

<template>
  <StackLayout class="bg-card p-4 mb-4 rounded-lg" style="androidElevation: 1;">
    <NSLabel
      text="Theme"
      variant="heading"
      class="mb-3"
    />
    
    <StackLayout>
      <StackLayout
        v-for="(theme, index) in themes"
        :key="theme.id"
        @tap="setTheme(theme.id)"
      >
        <GridLayout
          columns="auto, *, auto"
          class="list-item-compact"
          rows="auto"
        >
          <!-- Theme indicator -->
          <StackLayout
            col="0"
            class="mr-3"
            verticalAlignment="center"
          >
            <StackLayout
              :class="[
                'w-4 h-4 rounded-full',
                currentTheme === theme.id ? 'bg-primary' : 'bg-muted'
              ]"
            />
          </StackLayout>
          
          <!-- Theme info -->
          <StackLayout col="1" verticalAlignment="center">
            <Label
              :text="theme.name"
              class="font-medium text-base"
            />
            <Label
              :text="theme.description"
              class="text-sm text-muted-foreground"
            />
          </StackLayout>
          
          <!-- Check indicator -->
          <Label
            v-if="currentTheme === theme.id"
            text="&#xf00c;"
            col="2"
            class="fas text-primary"
            verticalAlignment="center"
          />
        </GridLayout>
        
        <NSSeparator v-if="index < themes.length - 1" class="ml-8" />
      </StackLayout>
    </StackLayout>
  </StackLayout>
</template>
