<script lang="ts" setup>
import NSAvatar from '../ui/NSAvatar.vue';
import NSButton from '../ui/NSButton.vue';
import NSCard from '../ui/NSCard.vue';
import NSLabel from '../ui/NSLabel.vue';
import NSSwitch from '../ui/NSSwitch.vue';
</script>

<template>
  <StackLayout>
    <NSLabel text="Card Showcase" variant="heading" class="mb-4" />

    <!-- Scenario 1: User Profile Card (Elevated) -->
    <NSLabel text="User Profile Card (Elevated)" variant="subheading" class="mb-2" />
    <NSCard :elevation="2" class="card-elevated bg-card p-4 mb-4 rounded-lg">
      <GridLayout rows="auto, auto" columns="auto, *">
        <NSAvatar
          row="0"
          col="0"
          rowSpan="2"
          initials="CZ"
          size="lg"
          class="mr-4"
        />
        <Label
          row="0"
          col="1"
          text="Clay Zhang"
          class="text-xl font-bold"
        />
        <Label
          row="1"
          col="1"
          text="NativeScript & Vue Developer. Building beautiful and performant mobile apps."
          class="text-sm text-muted-foreground"
          textWrap="true"
        />
      </GridLayout>
    </NSCard>

    <!-- Scenario 2: Notification Settings Card (Flat) -->
    <NSLabel text="Notification Settings (Flat)" variant="subheading" class="mt-4 mb-2" />
    <NSCard :elevation="1" class="card-flat bg-card mb-4 rounded-lg">
      <StackLayout class="p-4">
        <GridLayout columns="auto, *, auto" rows="auto">
          <Label 
            col="0" 
            text="&#xf0f3;" 
            class="fas text-2xl"
            style="color: #3b82f6; width: 32; text-align: center; margin-right: 16;"
            verticalAlignment="center"
          />
          <StackLayout col="1" verticalAlignment="center">
            <Label text="Push Notifications" class="font-medium text-base" />
            <Label text="Receive updates on new messages." class="text-sm text-muted-foreground" textWrap="true" />
          </StackLayout>
          <NSSwitch col="2" :modelValue="true" verticalAlignment="center" />
        </GridLayout>
      </StackLayout>
    </NSCard>

    <!-- Scenario 3: Upgrade Plan Card (Default) -->
    <NSLabel text="Feature Promotion Card" variant="subheading" class="mt-4 mb-2" />
    <NSCard :elevation="1" class="bg-card p-4 rounded-lg">
      <StackLayout>
        <Label 
          text="&#xf005;" 
          class="fas text-3xl mb-3" 
          style="color: #fbbf24;"
        />
        <Label 
          text="Unlock Premium Features" 
          class="text-xl font-bold mb-2" 
        />
        <Label 
          text="Get unlimited access to all our features and priority support by upgrading your plan." 
          class="text-sm text-muted-foreground mb-4" 
          textWrap="true" 
        />
        <NSButton variant="primary">Upgrade to Pro</NSButton>
      </StackLayout>
    </NSCard>
  </StackLayout>
</template>
