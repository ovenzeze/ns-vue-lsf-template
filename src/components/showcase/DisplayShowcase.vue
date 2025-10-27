<script lang="ts" setup>
import NSBadge from '../ui/NSBadge.vue';
import NSAvatar from '../ui/NSAvatar.vue';
import NSListItem from '../ui/NSListItem.vue';
import NSSeparator from '../ui/NSSeparator.vue';
import NSCard from '../ui/NSCard.vue';
</script>

<template>
  <StackLayout>
    <!-- Badges -->
    <Label text="BADGES" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Badge Variants" class="text-sm font-medium mb-3" />
        <WrapLayout>
          <NSBadge text="Default" variant="default" class="mr-2 mb-2" />
          <NSBadge text="Primary" variant="primary" class="mr-2 mb-2" />
          <NSBadge text="Secondary" variant="secondary" class="mr-2 mb-2" />
          <NSBadge text="Success" variant="success" class="mr-2 mb-2" />
          <NSBadge text="Destructive" variant="destructive" class="mb-2" />
        </WrapLayout>
      </StackLayout>
    </NSCard>

    <!-- Avatars -->
    <Label text="AVATARS" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Avatar Sizes" class="text-sm font-medium mb-3" />
        <GridLayout columns="*, *, *, *" rows="auto, auto">
          <StackLayout col="0" row="0" class="text-center">
            <NSAvatar fallback="SM" size="sm" class="mb-2" horizontalAlignment="center" />
          </StackLayout>
          <StackLayout col="1" row="0" class="text-center">
            <NSAvatar fallback="MD" size="md" class="mb-2" horizontalAlignment="center" />
          </StackLayout>
          <StackLayout col="2" row="0" class="text-center">
            <NSAvatar fallback="LG" size="lg" class="mb-2" horizontalAlignment="center" />
          </StackLayout>
          <StackLayout col="3" row="0" class="text-center">
            <NSAvatar fallback="XL" size="xl" class="mb-2" horizontalAlignment="center" />
          </StackLayout>
          
          <Label col="0" row="1" text="Small" class="text-xs text-muted-foreground text-center" />
          <Label col="1" row="1" text="Medium" class="text-xs text-muted-foreground text-center" />
          <Label col="2" row="1" text="Large" class="text-xs text-muted-foreground text-center" />
          <Label col="3" row="1" text="X-Large" class="text-xs text-muted-foreground text-center" />
        </GridLayout>
      </StackLayout>
    </NSCard>

    <!-- List Items -->
    <Label text="LIST ITEMS" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <NSListItem
          title="Settings"
          subtitle="Configure your preferences"
          leadingIcon="⚙️"
          trailingIcon="›"
          class="mb-2"
        />
        <NSSeparator class="mb-2" />
        <NSListItem
          title="Notifications"
          subtitle="Manage your alerts"
          leadingIcon="🔔"
          trailingIcon="›"
          class="mb-2"
        />
        <NSSeparator class="mb-2" />
        <NSListItem
          title="Privacy"
          subtitle="Control your data"
          leadingIcon="🔒"
          trailingIcon="›"
        />
      </StackLayout>
    </NSCard>
  </StackLayout>
</template>

