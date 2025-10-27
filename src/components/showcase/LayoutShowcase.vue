<script lang="ts" setup>
import { useSideDrawer } from '@/composables/useSideDrawer';
import { useBottomSheet } from '@/composables/useBottomSheet';
import ActionSheet from './ActionSheet.vue';
import NSButton from '../ui/NSButton.vue';
import NSLabel from '../ui/NSLabel.vue';
import { StackLayout, Label } from '@nativescript/core';

const { openDrawer, closeDrawer } = useSideDrawer();
const { showBottomSheet } = useBottomSheet();

function openNativeDrawer() {
  const drawerContent = new StackLayout();
  drawerContent.className = 'p-4 bg-card';
  const label = new Label();
  label.text = 'Native Drawer Content';
  drawerContent.addChild(label);

  openDrawer(drawerContent, {
    shadeCover: {
      color: '#000000',
      opacity: 0.7,
      tapToClose: true,
    },
    animation: {
      enterFrom: {
        translateX: -300,
        duration: 300,
        curve: 'easeOut',
      },
      exitTo: {
        translateX: -300,
        duration: 300,
        curve: 'easeIn',
      },
    },
  });
}

function openNativeBottomSheet() {
  showBottomSheet({
    view: ActionSheet,
    props: {
      title: 'Native Action Sheet',
      items: [
        { text: 'Native Take Photo' },
        { text: 'Native Choose from Library' },
        { text: 'Native Choose File' },
        { text: 'Native Copy Link' },
      ],
    },
    trackingScrollView: 'scrollView',
  });
}
</script>

<template>
  <StackLayout>
    <!-- Drawer Section -->
    <StackLayout class="mb-6">
      <NSLabel
        text="Drawer / Side Menu (Native)"
        class="text-xl font-bold mb-3"
      />
      <NSLabel
        text="Uses a native implementation for smooth, hardware-accelerated animations."
        class="text-sm text-muted-foreground mb-4"
        textWrap="true"
      />
      
      <GridLayout columns="*" class="mb-2">
        <NSButton
          col="0"
          variant="default"
          text="Open Native Drawer"
          class="mr-2"
          @tap="openNativeDrawer"
        />
      </GridLayout>
    </StackLayout>

    <!-- Bottom Sheet Section -->
    <StackLayout class="mb-6">
      <NSLabel
        text="Bottom Sheets (Native)"
        class="text-xl font-bold mb-3"
      />
      <NSLabel
        text="Uses @nativescript-community/ui-material-bottomsheet for a native feel."
        class="text-sm text-muted-foreground mb-4"
        textWrap="true"
      />
      
      <GridLayout columns="*" class="mb-2">
        <NSButton
          col="0"
          variant="secondary"
          text="Open Native Bottom Sheet"
          class="mr-2"
          @tap="openNativeBottomSheet"
        />
      </GridLayout>
    </StackLayout>
  </StackLayout>
</template>
