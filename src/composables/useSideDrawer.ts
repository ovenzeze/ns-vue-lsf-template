import { RootLayout, View } from '@nativescript/core';

let drawer: RootLayout | null = null;
let currentView: View | null = null;

export function useSideDrawer() {
  const openDrawer = (view: View, options: any = {}) => {
    // 如果已有打开的 drawer，先关闭
    if (drawer && currentView) {
      drawer.close(currentView);
    }
    // 创建新的 RootLayout 并打开
    drawer = new RootLayout();
    drawer.open(view, options);
    currentView = view;
  };

  const closeDrawer = () => {
    if (drawer && currentView) {
      drawer.close(currentView);
      drawer = null;
      currentView = null;
    }
  };

  return {
    openDrawer,
    closeDrawer,
  };
}
