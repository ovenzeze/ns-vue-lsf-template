import { View } from '@nativescript/core';
// Try different import methods for bottomsheet
let showBottomSheet: any;
try {
  showBottomSheet = require('@nativescript-community/ui-material-bottomsheet').showBottomSheet;
} catch (e) {
  console.warn('Failed to import showBottomSheet, using fallback');
  showBottomSheet = () => {
    console.warn('showBottomSheet not available');
  };
}

export interface BottomSheetOptions {
  view: any; // Can be a Vue component instance
  props?: Record<string, any>; // Props to pass to the Vue component
  // Add other options from the plugin as needed
  trackingScrollView?: string;
}

export function useBottomSheet() {
  const show = (options: BottomSheetOptions) => {
    showBottomSheet({
      view: options.view,
      props: options.props,
      trackingScrollView: options.trackingScrollView,
    });
  };

  return {
    showBottomSheet: show,
  };
}
