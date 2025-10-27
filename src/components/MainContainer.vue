<script lang="ts" setup>
import { defaultTabIndex, navigationBarHeight, navigationTabs } from '@/config/navigation';
import { computed, provide, ref } from 'nativescript-vue';
import { isAndroid, isIOS } from '@nativescript/core/platform';
import { markRaw } from 'vue';
import type { Component } from 'vue';
import { CoreTypes, View } from '@nativescript/core';
import NSBottomNavigation from './ui/NSBottomNavigation.vue';

/**
 * 主容器组件 - 管理底部导航和页面切换
 * 
 * 架构说明:
 * - 使用 Frame 和 Page 作为根元素
 * - Page 内部使用 GridLayout 实现固定底部导航栏
 * - ActionBar 的标题根据当前选中的 tab 动态变化
 */

interface SubPageState {
  isSubPage: boolean;
  subPageTitle: string;
  parentTabIndex: number;
  component: Component | null;
  props?: Record<string, unknown>;
}

interface SubPageConfig {
  title: string;
  component: Component;
  props?: Record<string, unknown>;
}

const createDefaultSubPageState = (): SubPageState => ({
  isSubPage: false,
  subPageTitle: '',
  parentTabIndex: -1,
  component: null,
  props: undefined,
});

// 当前选中的 tab 索引
const selectedTabIndex = ref(defaultTabIndex);

// 子页面状态管理
const subPageState = ref<SubPageState>(createDefaultSubPageState());

function resetSubPageState() {
  subPageState.value = createDefaultSubPageState();
}

// 当前显示的页面组件
const currentComponent = computed(() => {
  if (subPageState.value.isSubPage && subPageState.value.component) {
    return subPageState.value.component;
  }
  return navigationTabs[selectedTabIndex.value]?.component;
});

const currentComponentProps = computed(() => {
  if (subPageState.value.isSubPage) {
    return subPageState.value.props || {};
  }
  return {};
});

// 简单的进入/返回过渡标记（1: 前进, -1: 返回, 0: 无动画）
let pendingDirection: 1 | -1 | 0 = 0;

function onContentLoaded(args: { object: View }) {
  const v = args.object;
  if (!v) return;
  const forward = pendingDirection === 1;
  const backward = pendingDirection === -1;
  if (!forward && !backward) return;
  // Pure fade to avoid any horizontal offset artifacts
  v.translateX = 0;
  v.opacity = 0;
  v.animate({
    opacity: 1,
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut,
  }).catch(() => {
    // ignore
  }).finally(() => {
    v.opacity = 1;
    v.translateX = 0;
    pendingDirection = 0;
  });
}

// 当前页面的标题
const currentPageTitle = computed<string>(() => {
  if (subPageState.value.isSubPage) {
    return subPageState.value.subPageTitle;
  }
  return navigationTabs[selectedTabIndex.value]?.title || 'App';
});

// 处理 tab 切换事件
function handleTabChange(index: number) {
  console.log(`📱 Tab changed to: ${navigationTabs[index]?.title} (index: ${index})`);
  selectedTabIndex.value = index;
  // 切换 tab 时退出子页面
  resetSubPageState();
}

// 根据ID切换标签页的函数，提供给子组件使用
function switchTab(tabId: string, categoryId?: string) {
  console.log(`📱 Switching to tab by ID: ${tabId}${categoryId ? `, category: ${categoryId}` : ''}`);
  const tabIndex = navigationTabs.findIndex(tab => tab.id === tabId);
  if (tabIndex !== -1) {
    selectedTabIndex.value = tabIndex;
    resetSubPageState();
    // 如果指定了分类ID，保存到全局状态供目标页面使用
    if (categoryId) {
      // 使用一个全局状态来传递分类ID
      (globalThis as any).__discoverInitialCategory = categoryId;
      console.log(`📱 Set initial category for discover page: ${categoryId}`);
    }
  } else {
    console.error(`Tab with ID "${tabId}" not found`);
  }
}

// 子页面导航函数
function navigateToSubPage(config: SubPageConfig) {
  console.log(`📱 Navigating to sub page: ${config.title}`);
  pendingDirection = 1;
  subPageState.value = {
    isSubPage: true,
    subPageTitle: config.title,
    parentTabIndex: selectedTabIndex.value,
    component: markRaw(config.component),
    props: config.props,
  };
  console.log(`📱 Sub page state:`, subPageState.value);
}

function backToParentPage() {
  console.log(`📱 Back to parent page`);
  if (subPageState.value.parentTabIndex !== -1) {
    selectedTabIndex.value = subPageState.value.parentTabIndex;
  }
  pendingDirection = -1;
  resetSubPageState();
  console.log(`📱 Sub page state:`, subPageState.value);
}

// 提供依赖注入给子组件
provide('switchTab', switchTab);
provide('navigateToSubPage', navigateToSubPage);
provide('backToParentPage', backToParentPage);

// 将配置转换为 NSBottomNavigation 所需的格式
const navItems = computed(() => {
  return navigationTabs.map((tab) => ({
    id: tab.id,
    title: tab.title,
    icon: tab.icon,
    iconType: tab.iconType,
    activeColor: tab.activeColor,
    inactiveColor: tab.inactiveColor,
    badge: tab.badge,
    showDot: tab.showDot,
    customClass: tab.customClass,
  }));
});
</script>

<template>
  <RootLayout>
    <Frame>
      <Page>
        <ActionBar class="action-bar" flat="true">
          <!-- Android back (NavigationButton with font icon) -->
          <NavigationButton
            v-if="subPageState.isSubPage && isAndroid"
            icon="font://&#xf053;"
            class="fas"
            @tap="backToParentPage"
          />
          <!-- iOS back on the left (ActionItem with font icon) -->
          <ActionItem
            v-if="subPageState.isSubPage && isIOS"
            ios.position="left"
            icon="font://&#xf053;"
            class="fas"
            @tap="backToParentPage"
          />
          <Label :text="currentPageTitle" class="font-bold text-lg" />
        </ActionBar>
        
        <!-- 
          GridLayout 布局结构:
          - rows="*, auto": 内容区域自适应高度,底部导航栏高度自适应
        -->
        <GridLayout rows="*, auto" class="bg-background">
          <!-- 内容区域 - 动态显示当前选中的页面 -->
          <ContentView
            row="0"
            class="bg-background"
            :key="subPageState.isSubPage ? 'sub' : 'main'"
            @loaded="onContentLoaded"
          >
            <!-- 使用 v-if 确保每次切换都重新渲染页面 -->
            <component
              :is="currentComponent"
              v-if="currentComponent"
              v-bind="currentComponentProps"
            />
            
            <!-- 兜底显示 - 如果没有配置页面 -->
            <StackLayout v-else verticalAlignment="center" class="text-center">
              <Label text="⚠️ 未配置页面" class="text-2xl mb-4" />
              <Label text="请在 navigation.config.ts 中配置页面组件" class="text-muted-foreground" />
            </StackLayout>
          </ContentView>

          <!-- 底部导航栏 - 固定在底部 -->
          <NSBottomNavigation
            v-if="!subPageState.isSubPage"
            row="1"
            :items="navItems"
            :selectedIndex="selectedTabIndex"
            @update:selectedIndex="handleTabChange"
            class="elevation-8 ios:shadow-lg"
            :height="navigationBarHeight"
          />
        </GridLayout>
      </Page>
    </Frame>
  </RootLayout>
</template>

<style scoped>
/* 
  样式说明:
  - elevation-8: Android 阴影效果
  - ios:shadow-lg: iOS 阴影效果
  - 平台特定样式通过 Tailwind 变体实现
*/
</style>
