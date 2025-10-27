<script lang="ts" setup>
import { ref, onMounted } from 'nativescript-vue';
import ButtonsShowcase from '../showcase/ButtonsShowcase.vue';
import DisplayShowcase from '../showcase/DisplayShowcase.vue';
import FeedbackShowcase from '../showcase/FeedbackShowcase.vue';
import InputsShowcase from '../showcase/InputsShowcase.vue';
import LayoutShowcase from '../showcase/LayoutShowcase.vue';
import NativeUIShowcase from '../showcase/NativeUIShowcase.vue';
import CardShowcase from '../showcase/CardShowcase.vue';
import NSLabel from '../ui/NSLabel.vue';

// Component categories
// Using Unicode characters for FontAwesome icons
const categories = [
  { id: 'buttons', title: 'Buttons', icon: '\uf0a4', color: 'icon-blue' },      // fa-bullhorn
  { id: 'inputs', title: 'Form Inputs', icon: '\uf044', color: 'icon-green' },  // fa-edit
  { id: 'display', title: 'Data Display', icon: '\uf06e', color: 'icon-purple' }, // fa-eye
  { id: 'feedback', title: 'Feedback', icon: '\uf0e7', color: 'icon-orange' },  // fa-bolt
  { id: 'layout', title: 'Layout', icon: '\uf009', color: 'icon-pink' },        // fa-th-large
  { id: 'cards', title: 'Cards', icon: '\uf2c2', color: 'icon-yellow' },      // fa-id-card
  { id: 'native', title: 'Native UI', icon: '\uf10b', color: 'icon-teal' },     // fa-mobile
];

// State - 从全局状态获取初始分类
const selectedCategory = ref('buttons');

// 在组件挂载时检查是否有传入的初始分类
onMounted(() => {
  const initialCategory = (globalThis as any).__discoverInitialCategory;
  if (initialCategory && categories.find(cat => cat.id === initialCategory)) {
    selectedCategory.value = initialCategory;
    console.log(`[DiscoverPage] Initialized with category: ${initialCategory}`);
    // 清除全局状态，避免重复使用
    delete (globalThis as any).__discoverInitialCategory;
  }
});

// Handlers
function selectCategory(categoryId: string) {
  selectedCategory.value = categoryId;
  console.log(`[DiscoverPage] Selected category: ${categoryId}`);
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-4">
      <!-- Header -->
      <StackLayout class="mb-5">
        <NSLabel
          variant="heading"
          text="Component Library"
          class="text-3xl mb-2"
        />
        <Label
          text="shadcn/ui inspired NativeScript components"
          class="text-base text-muted-foreground"
        />
      </StackLayout>

      <!-- Category Tabs -->
      <ScrollView orientation="horizontal" class="mb-5" scrollBarIndicatorVisible="false">
        <StackLayout orientation="horizontal">
          <StackLayout
            v-for="category in categories"
            :key="category.id"
            :class="[
              'px-4 py-3 rounded-lg mr-2',
              selectedCategory === category.id ? 'bg-primary' : 'bg-card'
            ]"
            :style="selectedCategory === category.id ? '' : 'androidElevation: 2;'"
            @tap="selectCategory(category.id)"
          >
            <StackLayout orientation="horizontal" verticalAlignment="center">
              <Label
                :text="category.icon"
                :class="[
                  'fas text-base mr-2',
                  selectedCategory === category.id ? 'text-white' : category.color
                ]"
              />
              <Label
                :text="category.title"
                :class="[
                  'font-semibold text-sm',
                  selectedCategory === category.id ? 'text-white' : 'text-foreground'
                ]"
              />
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <!-- Component Showcases -->
      <ButtonsShowcase v-if="selectedCategory === 'buttons'" />
      <InputsShowcase v-if="selectedCategory === 'inputs'" />
      <DisplayShowcase v-if="selectedCategory === 'display'" />
      <FeedbackShowcase v-if="selectedCategory === 'feedback'" />
      <LayoutShowcase v-if="selectedCategory === 'layout'" />
      <NativeUIShowcase v-if="selectedCategory === 'native'" />
      <CardShowcase v-if="selectedCategory === 'cards'" />

      <!-- Footer Info -->
      <StackLayout class="bg-card p-5 rounded-lg mt-2 mb-4" style="androidElevation: 2;">
        <Label 
          text="💡 Component Library"
          class="text-base font-semibold mb-2"
        />
        <Label 
          text="All components follow shadcn/ui design principles with full NativeScript support. They're built on native iOS/Android components for optimal performance, fully typed, platform-aware, and easily customizable."
          class="text-sm text-muted-foreground"
          textWrap="true"
        />
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
