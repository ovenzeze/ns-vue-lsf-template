<script lang="ts" setup>
import { Device, isAndroid, isIOS, Utils } from '@nativescript/core';
import { onMounted, ref } from 'nativescript-vue';
import { SimpleThemeManager } from '../../utils/theme';
import NSButton from '../ui/NSButton.vue';
import NSLabel from '../ui/NSLabel.vue';
import NSSeparator from '../ui/NSSeparator.vue';

// Intro (short)
const intro = 'An open-source NativeScript-Vue component library inspired by shadcn/ui — cross-platform UI primitives, theming, and composables.';

// Version & environment info
const versionName = ref<string>('');
const buildNumber = ref<string>('');
const platform = Device.os;
const osVersion = Device.osVersion;
const model = Device.model;
const manufacturer = Device.manufacturer;
const theme = ref<string>(SimpleThemeManager.isDarkTheme() ? 'dark' : 'light');

// Contributors (lightweight list; keep in sync with package metadata)
const contributors = ref<Array<{ name: string; role?: string }>>([
  { name: 'ovenzeze', role: 'Maintainer' },
]);

onMounted(() => {
  try {
    if (isIOS) {
      const mainBundle = (global as any).NSBundle.mainBundle;
      versionName.value = String(mainBundle.objectForInfoDictionaryKey('CFBundleShortVersionString') || '');
      buildNumber.value = String(mainBundle.objectForInfoDictionaryKey('CFBundleVersion') || '');
    } else if (isAndroid) {
      const ctx = (Utils as any).ad.getApplicationContext();
      const pm = ctx.getPackageManager();
      const pInfo = pm.getPackageInfo(ctx.getPackageName(), 0);
      versionName.value = String(pInfo.versionName || '');
      const longCode = (pInfo as any).getLongVersionCode ? (pInfo as any).getLongVersionCode() : pInfo.versionCode;
      buildNumber.value = String(longCode);
    }
  } catch (e) {
    console.log('[About] version fetch failed', e);
  }
});

function openGithub() {
  try {
    Utils.openUrl('https://github.com/ovenzeze/ns-vue-starter');
  } catch (e) {
    console.log('[About] openGithub failed', e);
  }
}

function openLicense() {
  try {
    Utils.openUrl('https://github.com/ovenzeze/ns-vue-starter/blob/master/LICENSE');
  } catch (e) {
    console.log('[About] openLicense failed', e);
  }
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-5">
      <!-- Hero Section -->
      <StackLayout class=" rounded-xl mb-6" style="androidElevation: 2;">
        <!-- Header with Icon & Title -->
        <StackLayout class="text-center pt-6 px-6 pb-4">
          <!-- <Label text="&#xf1c0;" class="fas text-5xl text-primary mb-4" /> -->
          <NSLabel 
            text="NativeScript Vue"
            variant="heading"
            size="xl"
            class="text-center mb-1"
          />
          <Label 
            text="Component Library"
            class="text-lg font-semibold text-muted-foreground mb-4"
          />
        </StackLayout>

        <!-- Description -->
        <StackLayout class="px-6 pb-5">
          <Label 
            :text="intro" 
            class="text-sm text-muted-foreground leading-relaxed"
            textWrap="true"
            textAlignment="center"
          />
        </StackLayout>

        <!-- Separator -->
        <!-- <NSSeparator class="mx-4" /> -->

        <!-- Action Buttons -->
        <GridLayout columns="*, *" class="mt-4 mx-6" rows="auto">
          <NSButton 
            col="0"
            variant="primary"
            class="mr-2"
            @tap="openGithub"
          >
            GitHub
          </NSButton>
          <NSButton 
            col="1"
            variant="outline"
            class="ml-2"
            @tap="openLicense"
          >
            License
          </NSButton>
        </GridLayout>

        <!-- License Badge -->
        <Label 
          text="Open Source · MIT License"
          class="text-xs text-muted-foreground text-center mt-4 mb-5"
        />
        
        <!-- Disclaimer -->
        <StackLayout class="mx-4 mb-5">
          <StackLayout class="p-3 rounded-lg" style="background-color: rgba(245, 158, 11, 0.1);">
            <Label 
              text="⚠️ Not an Official NativeScript Project"
              class="text-xs text-center font-semibold mb-1"
              style="color: #f59e0b;"
            />
            <Label 
              text="This is a community-driven component library and not affiliated with NativeScript official team."
              class="text-xs text-center text-muted-foreground"
              textWrap="true"
            />
          </StackLayout>
        </StackLayout>
      </StackLayout>

      <!-- App Information -->
      <Label text="APP INFORMATION" class="section-header mb-4" />
      <StackLayout class="bg-card mb-6 rounded-lg" style="androidElevation: 1;">
        <StackLayout class="px-4 py-3">
          <GridLayout columns="auto, *" rows="auto">
            <Label 
              text="&#xf05a;"
              col="0"
              class="fas text-2xl"
              style="color: #3b82f6; width: 32; text-align: center; margin-right: 16;"
              verticalAlignment="center"
            />
            <GridLayout col="1" columns="*, auto" rows="auto">
              <Label 
                text="Version"
                col="0"
                class="font-medium text-base"
                verticalAlignment="center"
              />
              <Label 
                :text="versionName || 'Development'"
                col="1"
                class="text-base text-foreground"
                verticalAlignment="center"
              />
            </GridLayout>
          </GridLayout>
        </StackLayout>

        <NSSeparator class="mx-4" />

        <StackLayout class="px-4 py-3">
          <GridLayout columns="auto, *" rows="auto">
            <Label 
              text="&#xf3cd;"
              col="0"
              class="fas text-2xl"
              style="color: #10b981; width: 32; text-align: center; margin-right: 16;"
              verticalAlignment="center"
            />
            <GridLayout col="1" columns="*, auto" rows="auto">
              <Label 
                text="Platform"
                col="0"
                class="font-medium text-base"
                verticalAlignment="center"
              />
              <Label 
                :text="`${platform} ${osVersion}`"
                col="1"
                class="text-base text-foreground"
                verticalAlignment="center"
              />
            </GridLayout>
          </GridLayout>
        </StackLayout>

        <NSSeparator class="mx-4" />

        <StackLayout class="px-4 py-3">
          <GridLayout columns="auto, *" rows="auto">
            <Label 
              text="&#xf10b;"
              col="0"
              class="fas text-2xl"
              style="color: #8b5cf6; width: 32; text-align: center; margin-right: 16;"
              verticalAlignment="center"
            />
            <GridLayout col="1" columns="*, auto" rows="auto">
              <Label 
                text="Device"
                col="0"
                class="font-medium text-base"
                verticalAlignment="center"
              />
              <Label 
                :text="`${manufacturer}`"
                col="1"
                class="text-base text-foreground"
                verticalAlignment="center"
                textWrap="false"
              />
            </GridLayout>
          </GridLayout>
        </StackLayout>

        <NSSeparator class="mx-4" />

        <StackLayout class="px-4 py-3">
          <GridLayout columns="auto, *" rows="auto">
            <Label 
              text="&#xf186;"
              col="0"
              class="fas text-2xl"
              style="color: #f59e0b; width: 32; text-align: center; margin-right: 16;"
              verticalAlignment="center"
            />
            <GridLayout col="1" columns="*, auto" rows="auto">
              <Label 
                text="Theme"
                col="0"
                class="font-medium text-base"
                verticalAlignment="center"
              />
              <Label 
                :text="theme"
                col="1"
                class="text-base text-foreground"
                style="text-transform: capitalize;"
                verticalAlignment="center"
              />
            </GridLayout>
          </GridLayout>
        </StackLayout>
      </StackLayout>

      <!-- Contributors -->
                  <!-- Contributors -->
      <Label text="CONTRIBUTORS" class="section-header mb-4" />
      <StackLayout class="bg-card mb-6 rounded-lg" style="androidElevation: 1;">
        <StackLayout
          v-for="(contributor, index) in contributors"
          :key="index"
        >
          <StackLayout class="px-4 py-3">
            <GridLayout columns="auto, *, auto" rows="auto">
              <Label 
                text="&#xf007;"
                col="0"
                class="fas text-2xl"
                style="color: #06b6d4; width: 32; text-align: center; margin-right: 16;"
                verticalAlignment="center"
              />
              <StackLayout col="1" verticalAlignment="center">
                <Label 
                  :text="contributor.name" 
                  class="font-medium text-base" 
                />
                <Label 
                  :text="contributor.role || 'Contributor'"
                  class="text-sm text-muted-foreground" 
                />
              </StackLayout>
              <Label 
                text="&#xf004;"
                col="2"
                class="fas text-sm text-primary"
                verticalAlignment="center"
              />
            </GridLayout>
          </StackLayout>
          <NSSeparator 
            v-if="index < contributors.length - 1" 
            class="mx-4" 
          />
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/* Keep styles minimal to match project conventions */
</style>
