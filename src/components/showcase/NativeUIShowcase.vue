<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSCard from '../ui/NSCard.vue';

const sliderValue = ref(50);
const segmentedIndex = ref(0);
</script>

<template>
  <StackLayout>
    <!-- Slider -->
    <Label text="SLIDER" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <GridLayout columns="*, auto" rows="auto" class="mb-3">
          <Label 
            col="0"
            text="Volume Control" 
            class="text-sm font-medium"
            verticalAlignment="center"
          />
          <Label 
            col="1"
            :text="`${Math.round(sliderValue)}%`" 
            class="text-sm font-semibold text-primary"
            verticalAlignment="center"
          />
        </GridLayout>
        <Slider
          :value="sliderValue"
          minValue="0"
          maxValue="100"
          class="mb-2"
          @valueChange="(args) => sliderValue = args.value"
        />
        <Label 
          text="Native iOS/Android slider component"
          class="text-xs text-muted-foreground"
        />
      </StackLayout>
    </NSCard>

    <!-- Segmented Bar -->
    <Label text="SEGMENTED BAR" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="View Mode" class="text-sm font-medium mb-3" />
        <SegmentedBar
          :selectedIndex="segmentedIndex"
          @selectedIndexChange="(args) => segmentedIndex = args.value"
          class="mb-3"
        >
          <SegmentedBarItem title="List" />
          <SegmentedBarItem title="Grid" />
          <SegmentedBarItem title="Map" />
        </SegmentedBar>
        <Label 
          :text="`Selected: ${['List', 'Grid', 'Map'][segmentedIndex]}`"
          class="text-sm text-muted-foreground text-center"
        />
      </StackLayout>
    </NSCard>

    <!-- Activity Indicator -->
    <Label text="ACTIVITY INDICATOR" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Native Loading Spinner" class="text-sm font-medium mb-3" />
        <ActivityIndicator
          :busy="true"
          class="mb-3"
          horizontalAlignment="center"
        />
        <Label 
          text="Platform-native activity indicator (iOS UIActivityIndicatorView / Android ProgressBar)"
          class="text-xs text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </NSCard>

    <!-- Search Bar -->
    <Label text="SEARCH BAR" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Native Search" class="text-sm font-medium mb-3" />
        <SearchBar
          hint="Search..."
          class="mb-2"
        />
        <Label 
          text="Native iOS UISearchBar / Android SearchView component"
          class="text-xs text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </NSCard>

    <!-- Date Picker -->
    <Label text="DATE PICKER" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Select Date" class="text-sm font-medium mb-3" />
        <DatePicker
          class="mb-2"
        />
        <Label 
          text="Native date picker with platform-specific UI"
          class="text-xs text-muted-foreground"
        />
      </StackLayout>
    </NSCard>

    <!-- Time Picker -->
    <Label text="TIME PICKER" class="section-header mb-3" />
    <NSCard :elevation="2" class="p-5 mb-4">
      <StackLayout>
        <Label text="Select Time" class="text-sm font-medium mb-3" />
        <TimePicker
          class="mb-2"
        />
        <Label 
          text="Native time picker with platform-specific UI"
          class="text-xs text-muted-foreground"
        />
      </StackLayout>
    </NSCard>
  </StackLayout>
</template>

