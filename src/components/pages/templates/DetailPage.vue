<script lang="ts" setup>
import { ref, inject } from 'nativescript-vue';
import NSLabel from '../../ui/NSLabel.vue';
import NSButton from '../../ui/NSButton.vue';
import NSBadge from '../../ui/NSBadge.vue';

/**
 * 详情页面模板
 *
 * 📚 NativeScript 详情页关键概念：
 * 1. 使用 inject 获取导航方法
 * 2. 使用 Props 接收路由参数
 * 3. 使用 GridLayout 实现复杂布局
 * 4. 使用 ScrollView 支持内容滚动
 *
 * 🎯 使用场景：
 * - 商品详情
 * - 文章详情
 * - 用户资料详情
 * - 任务详情
 *
 * ⚡ 快速开始：
 * 1. 复制此文件到 src/components/pages/
 * 2. 修改 Props 接口定义
 * 3. 修改 item 数据结构
 * 4. 根据实际需求调整布局
 * 5. 实现操作按钮逻辑
 */

interface Props {
  itemId?: number;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  itemId: 1,
  title: '详情页面',
});

// 获取导航方法（如果在 MainContainer 中使用）
const backToParentPage = inject('backToParentPage') as (() => void) | undefined;

// 模拟数据（实际项目中应该从 API 获取）
const item = ref({
  id: props.itemId,
  title: props.title || '项目标题',
  description: '这是一段详细的描述信息，展示如何在 NativeScript 中实现详情页面。可以包含很长的文本，NativeScript 会自动处理换行和滚动。',
  status: 'active',
  statusVariant: 'success' as const,
  createdAt: '2025-10-26',
  updatedAt: '2025-10-26',
  author: 'Clay Zhang',
  category: 'Template',
  tags: ['NativeScript', 'Vue', 'LSF Template'],
  stats: {
    views: 1234,
    likes: 56,
    comments: 12,
  },
});

const isLoading = ref(false);

/**
 * 返回上一页
 */
function handleBack() {
  console.log('Back button tapped');
  if (backToParentPage) {
    backToParentPage();
  } else {
    // 如果不在 MainContainer 中，使用其他导航方式
    console.warn('No navigation method available');
  }
}

/**
 * 主要操作
 */
async function handlePrimaryAction() {
  console.log('Primary action tapped');
  isLoading.value = true;

  try {
    // TODO: 实现主要操作逻辑（如：编辑、购买等）
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Action completed');
  } catch (error) {
    console.error('Action failed:', error);
  } finally {
    isLoading.value = false;
  }
}

/**
 * 次要操作
 */
function handleSecondaryAction() {
  console.log('Secondary action tapped');
  // TODO: 实现次要操作逻辑（如：分享、收藏等）
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-4">
      <!-- 头部信息卡片 -->
      <StackLayout
        class="bg-card p-6 rounded-lg mb-4"
        style="androidElevation: 2;"
      >
        <!-- 标题和状态 -->
        <GridLayout columns="*, auto" class="mb-4">
          <NSLabel
            :text="item.title"
            col="0"
            class="text-2xl font-bold pr-2"
            textWrap="true"
          />
          <NSBadge
            :text="item.status"
            col="1"
            :variant="item.statusVariant"
          />
        </GridLayout>

        <!-- 描述 -->
        <NSLabel
          :text="item.description"
          class="text-base text-foreground mb-4"
          textWrap="true"
        />

        <!-- 统计信息 -->
        <GridLayout columns="*, *, *" class="mb-4">
          <StackLayout col="0" class="items-center">
            <NSLabel
              :text="item.stats.views.toString()"
              class="text-lg font-bold text-primary"
            />
            <NSLabel
              text="浏览"
              class="text-xs text-muted-foreground"
            />
          </StackLayout>
          <StackLayout col="1" class="items-center">
            <NSLabel
              :text="item.stats.likes.toString()"
              class="text-lg font-bold text-destructive"
            />
            <NSLabel
              text="点赞"
              class="text-xs text-muted-foreground"
            />
          </StackLayout>
          <StackLayout col="2" class="items-center">
            <NSLabel
              :text="item.stats.comments.toString()"
              class="text-lg font-bold text-success"
            />
            <NSLabel
              text="评论"
              class="text-xs text-muted-foreground"
            />
          </StackLayout>
        </GridLayout>

        <!-- 元信息 -->
        <StackLayout class="bg-muted p-3 rounded-lg">
          <GridLayout columns="auto, *" class="mb-2">
            <NSLabel text="作者" col="0" class="text-sm text-muted-foreground mr-4" />
            <NSLabel :text="item.author" col="1" class="text-sm font-medium" />
          </GridLayout>
          <GridLayout columns="auto, *" class="mb-2">
            <NSLabel text="分类" col="0" class="text-sm text-muted-foreground mr-4" />
            <NSLabel :text="item.category" col="1" class="text-sm font-medium" />
          </GridLayout>
          <GridLayout columns="auto, *" class="mb-2">
            <NSLabel text="创建时间" col="0" class="text-sm text-muted-foreground mr-4" />
            <NSLabel :text="item.createdAt" col="1" class="text-sm font-medium" />
          </GridLayout>
          <GridLayout columns="auto, *">
            <NSLabel text="更新时间" col="0" class="text-sm text-muted-foreground mr-4" />
            <NSLabel :text="item.updatedAt" col="1" class="text-sm font-medium" />
          </GridLayout>
        </StackLayout>
      </StackLayout>

      <!-- 标签卡片 -->
      <StackLayout
        class="bg-card p-6 rounded-lg mb-4"
        style="androidElevation: 2;"
      >
        <NSLabel text="标签" class="text-lg font-semibold mb-3" />
        <StackLayout orientation="horizontal">
          <NSBadge
            v-for="tag in item.tags"
            :key="tag"
            :text="tag"
            variant="secondary"
            class="mr-2 mb-2"
          />
        </StackLayout>
      </StackLayout>

      <!-- 操作按钮区域 -->
      <StackLayout class="mb-4">
        <NSButton
          variant="primary"
          :text="isLoading ? '处理中...' : '主要操作'"
          @tap="handlePrimaryAction"
          :isEnabled="!isLoading"
          class="mb-2"
        />
        <NSButton
          variant="outline"
          text="次要操作"
          @tap="handleSecondaryAction"
          :isEnabled="!isLoading"
          class="mb-2"
        />
        <NSButton
          variant="ghost"
          text="返回"
          @tap="handleBack"
        />
      </StackLayout>

      <!-- 提示信息 -->
      <StackLayout
        class="bg-card p-4 rounded-lg"
        style="androidElevation: 1;"
      >
        <NSLabel
          text="💡 提示：这是一个详情页面模板，展示了如何组织和展示详细信息。"
          class="text-sm text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/**
 * NativeScript 详情页样式注意事项：
 * - 使用 GridLayout 实现信息对齐
 * - 使用 StackLayout 嵌套组织内容
 * - 合理使用间距（mb-*, p-*）
 * - 注意 textWrap="true" 避免文本溢出
 */
</style>
