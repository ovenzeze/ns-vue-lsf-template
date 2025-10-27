<script lang="ts" setup>
import { inject, ref } from 'nativescript-vue';
import type { Component } from 'vue';
import { useDialog } from '../../composables/useDialog';
import { SimpleThemeManager } from '../../utils/theme';
import NSLabel from '../ui/NSLabel.vue';
import NSSeparator from '../ui/NSSeparator.vue';
import NSSwitch from '../ui/NSSwitch.vue';
import AboutPage from './AboutPage.vue';
import TermsPage from './TermsPage.vue';

interface SubPageConfig {
  title: string;
  component: Component;
  props?: Record<string, unknown>;
}

const navigateToSubPage = inject('navigateToSubPage') as ((config: SubPageConfig) => void) | undefined;
const { showActionSheet } = useDialog();

const userName = ref('NativeScript Developer');
const userEmail = ref('alex.m@design.studio');
const notificationsEnabled = ref(true);

const stats = [
  { label: 'Components', value: '15' },
  { label: 'Projects', value: '8' },
  { label: 'Themes', value: '2' },
];

const menuItems = [
  { icon: '\uf186', title: 'Theme', subtitle: 'Appearance settings' },
  { icon: '\uf05a', title: 'About', subtitle: 'App information' },
  { icon: '\uf15c', title: 'Terms of Service', subtitle: 'User agreement' },
  { icon: '\uf023', title: 'Privacy Policy', subtitle: 'Privacy information' },
];

async function selectTheme() {
  try {
    const selectedTheme = await showActionSheet('Select Theme', 'Cancel', ['Light', 'Dark', 'Auto']);
    if (!selectedTheme) return;
    const themeId = selectedTheme.toLowerCase();
    await SimpleThemeManager.switchTheme(themeId);
  } catch (error) {
    console.log('Theme selection cancelled', error);
  }
}

function openSubPage(title: string, component: Component, props?: Record<string, unknown>) {
  if (navigateToSubPage) {
    navigateToSubPage({ title, component, props });
  } else {
    console.log(`[ProfilePage] Unable to navigate to sub page: ${title}`);
  }
}

function onMenuItemTap(item: (typeof menuItems)[number]) {
  switch (item.title) {
    case 'Theme':
      selectTheme();
      break;
    case 'About':
      openSubPage('About', AboutPage);
      break;
    case 'Terms of Service':
      openSubPage('Terms of Service', TermsPage, { initialTab: 'terms' });
      break;
    case 'Privacy Policy':
      openSubPage('Privacy Policy', TermsPage, { initialTab: 'privacy' });
      break;
    default:
      console.log(`Tapped: ${item.title}`);
      break;
  }
}

function getMenuIconColor(title: string): string {
  const colorMap: Record<string, string> = {
    'Theme': '#8b5cf6',         // Purple (secondary)
    'About': '#3b82f6',          // Blue (primary)
    'Terms of Service': '#10b981', // Green (success)
    'Privacy Policy': '#ef4444',  // Red (destructive)
  };
  return colorMap[title] || '#6b7280'; // Default gray
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-4">
      <StackLayout class="card-elevated bg-card p-5 mb-2 rounded-lg" style="androidElevation: 2;">
        <StackLayout class="text-center mb-5">
          <NSLabel variant="heading" :text="userName" class="text-center mb-1 text-xl text-white" />
          <Label :text="userEmail" class="text-center text-muted-foreground text-sm" />
        </StackLayout>

        <GridLayout columns="*, *, *" class="mb-4" style="height: 50;">
          <StackLayout
            v-for="(stat, index) in stats"
            :key="index"
            :col="index"
            class="text-center"
          >
            <Label :text="stat.value" class="text-xl font-bold text-primary mb-1" />
            <Label :text="stat.label" class="text-xs text-muted-foreground" />
          </StackLayout>
        </GridLayout>
      </StackLayout>

      <Label text="PREFERENCES" class="section-header mt-4 mb-4" />

      <StackLayout class="card-flat bg-card mb-2 rounded-lg" style="androidElevation: 2;">
        <StackLayout class="px-4 py-3">
          <GridLayout columns="auto, *, auto" rows="auto">
            <Label
              text="&#xf0f3;"
              col="0"
              class="fas text-2xl"
              style="color: #f59e0b; width: 32; text-align: center; margin-right: 16;"
              verticalAlignment="center"
            />
            <StackLayout col="1" verticalAlignment="center">
              <Label text="Notifications" class="font-medium text-base" />
              <Label text="Message alerts" class="text-sm text-muted-foreground" />
            </StackLayout>
            <NSSwitch
              col="2"
              verticalAlignment="center"
              v-model="notificationsEnabled"
              @update:modelValue="(val) => console.log('Notifications:', val)"
            />
          </GridLayout>
        </StackLayout>
      </StackLayout>

      <Label text="GENERAL" class="section-header mt-3 mb-4" />

      <StackLayout class="card-flat bg-card mb-6 rounded-lg" style="androidElevation: 2;">
        <StackLayout
          v-for="(item, index) in menuItems"
          :key="index"
          @tap="() => onMenuItemTap(item)"
        >
          <StackLayout class="px-4 py-3">
            <GridLayout columns="auto, *, auto" rows="auto">
              <Label 
                :text="item.icon" 
                col="0" 
                class="fas text-2xl"
                style="width: 32; text-align: center; margin-right: 16;"
                :style="`color: ${getMenuIconColor(item.title)};`"
                verticalAlignment="center" 
              />
              <StackLayout col="1" verticalAlignment="center">
                <Label :text="item.title" class="font-medium text-base" />
                <Label :text="item.subtitle" class="text-sm text-muted-foreground" />
              </StackLayout>
              <Label text="&#xf054;" col="2" class="fas text-sm text-primary" verticalAlignment="center" />
            </GridLayout>
          </StackLayout>
          <NSSeparator v-if="index < menuItems.length - 1" class="mx-4" />
        </StackLayout>
      </StackLayout>

      <Label text="Version 1.0.0" class="text-center text-muted-foreground text-sm mt-4 mb-4" />
    </StackLayout>
  </ScrollView>
</template>
