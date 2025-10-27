<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { computed, ref, watch } from 'nativescript-vue';

export interface BottomNavItem {
  id?: string;
  title: string;
  icon?: string;
  iconType?: 'solid' | 'regular';
  activeColor?: string;
  inactiveColor?: string;
  badge?: number;
  showDot?: boolean;
  customClass?: string;
}

export interface NSBottomNavigationProps {
  items: BottomNavItem[];
  selectedIndex?: number;
  class?: string;
}

const props = withDefaults(defineProps<NSBottomNavigationProps>(), {
  selectedIndex: 0,
  class: '',
});

const emit = defineEmits<{
  'update:selectedIndex': [index: number];
}>();

const currentIndex = ref(props.selectedIndex);

// 监听外部 selectedIndex 变化
watch(
  () => props.selectedIndex,
  (newIndex) => {
    currentIndex.value = newIndex;
  }
);

const navClass = computed(() => {
  return cn('bg-card', props.class);
});

function selectTab(index: number) {
  currentIndex.value = index;
  emit('update:selectedIndex', index);
}

// 获取 tab 的颜色类（简化版）
function getTabClasses(item: BottomNavItem, isActive: boolean): string {
  return 'text-center transition-all duration-200';
}


// 获取 tab 的内联样式
function getTabStyle(item: BottomNavItem, isActive: boolean): string {
  if (isActive && item.activeColor) {
    return `color: ${item.activeColor};`;
  }
  if (!isActive && item.inactiveColor) {
    return `color: ${item.inactiveColor};`;
  }
  return '';
}
</script>

<template>
  <GridLayout :class="navClass" :columns="items.map(() => '*').join(', ')" height="60">
    <StackLayout
      v-for="(item, index) in items"
      :key="item.id || index"
      :col="index"
      orientation="vertical"
      verticalAlignment="center"
      @tap="selectTab(index)"
      :class="cn(getTabClasses(item, currentIndex === index), item.customClass)"
      :style="getTabStyle(item, currentIndex === index)"
      class="py-2"
    >
      <!-- 图标容器 -->
      <GridLayout width="28" height="28" horizontalAlignment="center" class="mb-1">
        <!-- 图标 -->
        <Label
          v-if="item.icon"
          :text="item.icon"
          :class="['text-xl', item.iconType === 'regular' ? 'far' : 'fas']"
          verticalAlignment="center"
          horizontalAlignment="center"
          style="font-size: 20;"
        />
        
        <!-- 徽章数字 -->
        <Label
          v-if="item.badge && item.badge > 0"
          :text="item.badge > 99 ? '99+' : item.badge.toString()"
          class="badge-number text-white font-bold rounded-full"
          style="font-size: 10; min-width: 18; height: 18; text-align: center; margin-top: -10; margin-right: -14;"
          horizontalAlignment="right"
          verticalAlignment="top"
        />

        <!-- 红点提示 -->
        <Label
          v-else-if="item.showDot"
          class="badge-dot rounded-full"
          style="width: 8; height: 8; margin-top: -4; margin-right: -10;"
          horizontalAlignment="right"
          verticalAlignment="top"
        />
      </GridLayout>
      
      <!-- 标题 -->
      <Label
        :text="item.title"
        :class="currentIndex === index ? 'text-primary font-semibold' : 'text-muted-foreground'"
        class="text-2xs"
        style="font-size: 11;"
      />
    </StackLayout>
  </GridLayout>
</template>
