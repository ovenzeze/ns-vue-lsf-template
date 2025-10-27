<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSInput from '../ui/NSInput.vue';
import NSTextArea from '../ui/NSTextArea.vue';
import NSSwitch from '../ui/NSSwitch.vue';
import NSCard from '../ui/NSCard.vue';

const switchValue = ref(true);
const inputValue = ref('');
const textAreaValue = ref('Sample text...');
</script>

<template>
  <StackLayout>
    <!-- Text Input -->
    <Label text="TEXT INPUT" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Default Input" class="text-sm font-medium mb-2" />
        <NSInput
          v-model="inputValue"
          placeholder="Enter your name..."
          class="mb-4"
        />
        
        <Label text="Email Input" class="text-sm font-medium mb-2" />
        <NSInput
          placeholder="[email protected]"
          keyboardType="email"
          class="mb-4"
        />
        
        <Label text="Password Input" class="text-sm font-medium mb-2" />
        <NSInput
          placeholder="Enter password"
          secure="true"
        />
      </StackLayout>
    </NSCard>

    <!-- Text Area -->
    <Label text="TEXT AREA" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Multi-line Input" class="text-sm font-medium mb-2" />
        <NSTextArea
          v-model="textAreaValue"
          placeholder="Enter longer text..."
        />
      </StackLayout>
    </NSCard>

    <!-- Switch Toggle -->
    <Label text="SWITCH TOGGLE" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <GridLayout columns="*, auto" rows="auto" class="mb-4">
        <StackLayout col="0" verticalAlignment="center">
          <Label text="Enable Notifications" class="font-medium text-base mb-1" />
          <Label 
            :text="switchValue ? 'Enabled' : 'Disabled'" 
            class="text-sm text-muted-foreground"
          />
        </StackLayout>
        <NSSwitch
          col="1"
          v-model="switchValue"
          verticalAlignment="center"
        />
      </GridLayout>
      
      <Label 
        text="Native iOS/Android switch component with platform-specific styling"
        class="text-xs text-muted-foreground"
        textWrap="true"
      />
    </NSCard>
  </StackLayout>
</template>

