<script lang="ts" setup>
import NSButton from '../ui/NSButton.vue';
import NSCard from '../ui/NSCard.vue';
import { useDialog } from '../../composables/useDialog';

const { showAlert } = useDialog();

async function handleButtonDemo() {
  await showAlert({
    title: 'Button Clicked',
    message: 'NSButton component works perfectly!',
    okButtonText: 'Great!'
  });
}
</script>

<template>
  <StackLayout>
    <!-- Button Variants -->
    <Label text="BUTTON VARIANTS" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Primary" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="primary" text="Primary Button" class="mb-4" @tap="handleButtonDemo" />
        
        <Label text="Secondary" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="secondary" text="Secondary Button" class="mb-4" />
        
        <Label text="Destructive" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="destructive" text="Destructive Button" class="mb-4" />
        
        <Label text="Ghost" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="ghost" text="Ghost Button" class="mb-4" />
        
        <Label text="Outline" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="outline" text="Outline Button" />
      </StackLayout>
    </NSCard>

    <!-- Button Sizes -->
    <Label text="BUTTON SIZES" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Small" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="primary" size="sm" text="Small Button" class="mb-4" />
        
        <Label text="Medium (Default)" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="primary" size="md" text="Medium Button" class="mb-4" />
        
        <Label text="Large" class="text-xs text-muted-foreground mb-2" />
        <NSButton variant="primary" size="lg" text="Large Button" />
      </StackLayout>
    </NSCard>

    <!-- Button Groups -->
    <Label text="BUTTON GROUPS" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Horizontal Group" class="text-xs text-muted-foreground mb-3" />
        <GridLayout columns="*, *, *" class="mb-4">
          <NSButton col="0" variant="outline" text="Left" size="sm" class="mr-1" />
          <NSButton col="1" variant="outline" text="Center" size="sm" class="mx-1" />
          <NSButton col="2" variant="outline" text="Right" size="sm" class="ml-1" />
        </GridLayout>
        
        <Label text="Action Buttons" class="text-xs text-muted-foreground mb-3" />
        <GridLayout columns="*, *" class="mb-2">
          <NSButton col="0" variant="outline" text="Cancel" class="mr-1" />
          <NSButton col="1" variant="primary" text="Confirm" class="ml-1" />
        </GridLayout>
      </StackLayout>
    </NSCard>
  </StackLayout>
</template>

