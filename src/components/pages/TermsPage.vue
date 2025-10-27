<script lang="ts" setup>
import { onMounted, ref } from 'nativescript-vue';
import privacyData from '../../data/privacy-policy.json';
import termsData from '../../data/terms-of-service.json';

const props = withDefaults(defineProps<{
  initialTab?: 'terms' | 'privacy';
}>(), {
  initialTab: 'terms',
});

// Import sections from JSON files
const termsSections = termsData.sections;
const privacySections = privacyData.sections;

// Current view mode - this is a separate page for each type
const currentTab = ref(props.initialTab);

// Track which sections are expanded
const expandedSections = ref<Record<string, boolean>>({});

// Initialize with first section expanded
onMounted(() => {
  if (currentTab.value === 'terms') {
    expandedSections.value['terms-0'] = true;
  } else {
    expandedSections.value['privacy-0'] = true;
  }
});

function toggleSection(sectionId: string) {
  expandedSections.value[sectionId] = !expandedSections.value[sectionId];
}

function isExpanded(sectionId: string): boolean {
  return !!expandedSections.value[sectionId];
}

// Helper function to remove markdown bold syntax (**text**)
// In NativeScript, we can't easily render HTML, so we just remove the markers
function parseMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
}
</script>

<template>
  <ScrollView class="bg-background" scrollBarIndicatorVisible="false">
    <StackLayout class="p-5">
      <!-- Terms of Service Content -->
      <StackLayout v-if="currentTab === 'terms'" class="mb-4">
        <StackLayout
          v-for="(section, sectionIndex) in termsSections"
          :key="`terms-${sectionIndex}`"
          class="card mb-3 rounded-lg overflow-hidden"
        >
          <!-- Section Header (Clickable) -->
          <GridLayout
            columns="*, auto"
            class="p-4 bg-card"
            @tap="toggleSection(`terms-${sectionIndex}`)"
          >
            <Label
              col="0"
              :text="section.title"
              class="text-lg font-semibold text-foreground"
              textWrap="true"
            />
            <Label
              col="1"
              :text="isExpanded(`terms-${sectionIndex}`) ? '\uf078' : '\uf054'"
              class="fas text-primary text-lg ml-3"
            />
          </GridLayout>
          
          <!-- Section Content (Expandable) -->
          <StackLayout
            v-if="isExpanded(`terms-${sectionIndex}`)"
            class="px-4 pt-3 pb-4 bg-muted"
          >
            <StackLayout
              v-for="(item, itemIndex) in section.items"
              :key="`terms-${sectionIndex}-${itemIndex}`"
              class="mb-4"
            >
              <Label
                :text="parseMarkdown(`${item.number} ${item.heading}`)"
                class="text-base font-bold text-foreground mb-2"
                textWrap="true"
              />
              <Label
                :text="parseMarkdown(item.content)"
                class="text-base text-muted-foreground leading-relaxed pl-1"
                textWrap="true"
              />
              
              <!-- Render lists if they exist -->
              <StackLayout v-if="item.list" class="ml-3 mt-2">
                <GridLayout
                  v-for="(listItem, listIndex) in item.list"
                  :key="`terms-${sectionIndex}-${itemIndex}-list-${listIndex}`"
                  columns="auto, *"
                  class="mb-2"
                >
                  <Label
                    col="0"
                    text="•"
                    class="text-primary text-lg font-bold mr-2"
                  />
                  <Label
                    col="1"
                    :text="parseMarkdown(listItem)"
                    class="text-base text-muted-foreground leading-relaxed"
                    textWrap="true"
                  />
                </GridLayout>
              </StackLayout>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </StackLayout>

      <!-- Privacy Policy Content -->
      <StackLayout v-if="currentTab === 'privacy'" class="mb-4">
        <!-- Intro Text -->
        <StackLayout class="card p-4 mb-4 rounded-lg">
          <Label
            :text="parseMarkdown(privacyData.intro)"
            class="text-base text-muted-foreground leading-relaxed"
            textWrap="true"
          />
        </StackLayout>
        
        <StackLayout
          v-for="(section, sectionIndex) in privacySections"
          :key="`privacy-${sectionIndex}`"
          class="card mb-3 rounded-lg overflow-hidden"
        >
          <!-- Section Header (Clickable) -->
          <GridLayout
            columns="*, auto"
            class="p-4 bg-card"
            @tap="toggleSection(`privacy-${sectionIndex}`)"
          >
            <Label
              col="0"
              :text="section.title"
              class="text-lg font-semibold text-foreground"
              textWrap="true"
            />
            <Label
              col="1"
              :text="isExpanded(`privacy-${sectionIndex}`) ? '\uf078' : '\uf054'"
              class="fas text-primary text-lg ml-3"
            />
          </GridLayout>
          
          <!-- Section Content (Expandable) -->
          <StackLayout
            v-if="isExpanded(`privacy-${sectionIndex}`)"
            class="px-4 pt-3 pb-4 bg-muted"
          >
            <!-- Section intro if exists -->
            <Label
              v-if="section.intro"
              :text="parseMarkdown(section.intro)"
              class="text-base font-medium text-foreground leading-relaxed mb-4"
              textWrap="true"
            />
            
            <!-- Items -->
            <StackLayout
              v-if="section.items"
              v-for="(item, itemIndex) in section.items"
              :key="`privacy-${sectionIndex}-${itemIndex}`"
              class="mb-4"
            >
              <Label
                :text="parseMarkdown(`${item.number} ${item.heading}`)"
                class="text-base font-bold text-foreground mb-2"
                textWrap="true"
              />
              <Label
                v-if="item.content"
                :text="parseMarkdown(item.content)"
                class="text-base text-muted-foreground leading-relaxed pl-1"
                textWrap="true"
              />
              
              <!-- Render lists if they exist -->
              <StackLayout v-if="item.list" class="ml-3 mt-2">
                <GridLayout
                  v-for="(listItem, listIndex) in item.list"
                  :key="`privacy-${sectionIndex}-${itemIndex}-list-${listIndex}`"
                  columns="auto, *"
                  class="mb-2"
                >
                  <Label
                    col="0"
                    text="•"
                    class="text-primary text-lg font-bold mr-2"
                  />
                  <Label
                    col="1"
                    :text="parseMarkdown(listItem)"
                    class="text-base text-muted-foreground leading-relaxed"
                    textWrap="true"
                  />
                </GridLayout>
              </StackLayout>
            </StackLayout>
            
            <!-- Section-level list if exists (e.g., section 7) -->
            <StackLayout v-if="section.list && !section.items" class="ml-3">
              <GridLayout
                v-for="(listItem, listIndex) in section.list"
                :key="`privacy-${sectionIndex}-list-${listIndex}`"
                columns="auto, *"
                class="mb-2"
              >
                <Label
                  col="0"
                  text="•"
                  class="text-primary text-lg font-bold mr-2"
                />
                <Label
                  col="1"
                  :text="parseMarkdown(listItem)"
                  class="text-base text-muted-foreground leading-relaxed"
                  textWrap="true"
                />
              </GridLayout>
            </StackLayout>
            
            <!-- Section note if exists -->
            <Label
              v-if="section.note"
              :text="parseMarkdown(section.note)"
              class="text-base text-muted-foreground leading-relaxed mt-2 italic"
              textWrap="true"
            />
          </StackLayout>
        </StackLayout>
      </StackLayout>

      <!-- Last Updated -->
      <StackLayout class="card mt-4 mb-6 rounded-lg">
        <StackLayout class="p-4 text-center">
          <Label
            text="Last Updated: October 20, 2025"
            class="text-muted-foreground text-base"
          />
          <Label
            text="These terms and policies may be updated from time to time."
            class="text-muted-foreground text-sm mt-2"
          />
        </StackLayout>
      </StackLayout>

    </StackLayout>
  </ScrollView>
</template>

<style scoped>
/* Custom styles if needed */
</style>
