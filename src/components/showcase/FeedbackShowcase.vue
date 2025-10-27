<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSButton from '../ui/NSButton.vue';
import NSLoading from '../ui/NSLoading.vue';
import NSProgress from '../ui/NSProgress.vue';
import NSSeparator from '../ui/NSSeparator.vue';
import NSCard from '../ui/NSCard.vue';
import { useDialog } from '../../composables/useDialog';

const { showAlert, showConfirm, showActionSheet } = useDialog();

const isLoading = ref(false);
const progress = ref(65);

async function handleAlertDemo() {
  await showAlert({
    title: 'Alert Dialog',
    message: 'This is a native alert dialog!',
    okButtonText: 'Got it'
  });
}

async function handleConfirmDemo() {
  const result = await showConfirm({
    title: 'Confirm Action',
    message: 'Do you like this component?',
    okButtonText: 'Yes',
    cancelButtonText: 'No'
  });

  await showAlert({
    title: 'Result',
    message: result ? '👍 Awesome!' : '👎 We\'ll improve it!',
    okButtonText: 'OK'
  });
}

async function handleActionSheetDemo() {
  const result = await showActionSheet(
    'Choose an action',
    'Cancel',
    ['Copy', 'Share', 'Delete']
  );
  
  if (result !== 'Cancel') {
    await showAlert({
      title: 'Selected',
      message: `You chose: ${result}`,
      okButtonText: 'OK'
    });
  }
}

function toggleLoading() {
  isLoading.value = !isLoading.value;
  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
}
</script>

<template>
  <StackLayout>
    <!-- Loading Indicator -->
    <Label text="LOADING INDICATOR" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Loading Sizes" class="text-sm font-medium mb-3" />
        <GridLayout columns="*, *, *" rows="auto, auto" class="mb-4">
          <StackLayout col="0" row="0" class="text-center">
            <NSLoading :busy="true" size="sm" class="mb-2" />
          </StackLayout>
          <StackLayout col="1" row="0" class="text-center">
            <NSLoading :busy="true" size="md" class="mb-2" />
          </StackLayout>
          <StackLayout col="2" row="0" class="text-center">
            <NSLoading :busy="true" size="lg" class="mb-2" />
          </StackLayout>
          
          <Label col="0" row="1" text="Small" class="text-xs text-muted-foreground text-center" />
          <Label col="1" row="1" text="Medium" class="text-xs text-muted-foreground text-center" />
          <Label col="2" row="1" text="Large" class="text-xs text-muted-foreground text-center" />
        </GridLayout>

        <NSSeparator class="mb-4" />

        <Label text="Interactive Demo" class="text-sm font-medium mb-3" />
        <NSButton 
          variant="secondary" 
          :text="isLoading ? 'Loading...' : 'Toggle Loading'"
          @tap="toggleLoading"
          class="mb-3"
        />
        <NSLoading :busy="isLoading" size="md" />
      </StackLayout>
    </NSCard>

    <!-- Progress Bar -->
    <Label text="PROGRESS BAR" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <GridLayout columns="*, auto" rows="auto" class="mb-2">
          <Label 
            col="0"
            text="Upload Progress" 
            class="text-sm font-medium"
            verticalAlignment="center"
          />
          <Label 
            col="1"
            :text="`${progress}%`" 
            class="text-sm font-semibold text-primary"
            verticalAlignment="center"
          />
        </GridLayout>
        <NSProgress :value="progress" :maxValue="100" class="mb-4" />
        
        <GridLayout columns="*, *">
          <NSButton 
            col="0"
            variant="outline" 
            size="sm"
            text="-10%"
            @tap="() => progress = Math.max(0, progress - 10)"
            class="mr-1"
          />
          <NSButton 
            col="1"
            variant="outline" 
            size="sm"
            text="+10%"
            @tap="() => progress = Math.min(100, progress + 10)"
            class="ml-1"
          />
        </GridLayout>
      </StackLayout>
    </NSCard>

    <!-- Dialogs -->
    <Label text="DIALOGS" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label 
          text="Native dialog components using useDialog composable"
          class="text-sm text-muted-foreground mb-3"
          textWrap="true"
        />
        <NSButton 
          variant="primary" 
          text="Show Alert"
          @tap="handleAlertDemo"
          class="mb-2"
        />
        <NSButton 
          variant="secondary" 
          text="Show Confirm"
          @tap="handleConfirmDemo"
          class="mb-2"
        />
        <NSButton 
          variant="outline" 
          text="Show Action Sheet"
          @tap="handleActionSheetDemo"
        />
      </StackLayout>
    </NSCard>
  </StackLayout>
</template>

