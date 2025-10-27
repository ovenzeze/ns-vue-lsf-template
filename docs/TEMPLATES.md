# Page Templates Guide

Complete guide to using and customizing the page templates included in this project.

## 📚 Available Templates

Located in `src/components/pages/templates/`:

| Template | Use Case | Key Features |
|----------|----------|--------------|
| **ListPage.vue** | Lists, feeds, indexes | Items, badges, navigation |
| **FormPage.vue** | Forms, data entry | Validation, input types |
| **DetailPage.vue** | Details, profiles | Stats, metadata, actions |
| **EmptyPage.vue** | Starting point | Minimal structure |

---

## 🎯 Template 1: ListPage

### Use Cases
- Task lists
- Article feeds
- Notification lists
- User directories
- Product catalogs

### Key Features
- Scrollable list with items
- Icons and badges
- Chevron navigation indicators
- Empty state handling
- Item tap events

### Quick Start

```bash
# Copy template
cp src/components/pages/templates/ListPage.vue \
   src/components/pages/MyListPage.vue
```

### Customization

#### 1. Modify Data Interface

```typescript
// Change this
interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  icon?: string;
  badge?: string;
  showChevron?: boolean;
}

// To this
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}
```

#### 2. Update Data Source

```typescript
const items = ref<Product[]>([
  {
    id: 1,
    name: 'Product A',
    price: 99.99,
    inStock: true,
  },
  // ... more items
]);
```

#### 3. Customize Item Layout

```vue
<GridLayout columns="auto, *, auto" class="p-4">
  <!-- Left: Icon/Image -->
  <Image
    v-if="item.image"
    :src="item.image"
    col="0"
    class="w-12 h-12 rounded-lg mr-4"
  />

  <!-- Center: Info -->
  <StackLayout col="1">
    <NSLabel :text="item.name" class="font-semibold" />
    <NSLabel :text="`$${item.price}`" class="text-primary" />
  </StackLayout>

  <!-- Right: Badge -->
  <NSBadge
    v-if="item.inStock"
    text="In Stock"
    variant="success"
    col="2"
  />
</GridLayout>
```

### Full Example

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue';
import NSLabel from '../../ui/NSLabel.vue';
import NSBadge from '../../ui/NSBadge.vue';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const products = ref<Product[]>([
  { id: 1, name: 'MacBook Pro', price: 1999, category: 'Laptops', inStock: true },
  { id: 2, name: 'iPhone 15', price: 999, category: 'Phones', inStock: false },
  { id: 3, name: 'AirPods Pro', price: 249, category: 'Audio', inStock: true },
]);

function handleProductTap(product: Product) {
  console.log('Product tapped:', product);
  // Navigate to detail page
}
</script>

<template>
  <ScrollView class="bg-background">
    <StackLayout class="p-4">
      <NSLabel text="Products" class="text-2xl font-bold mb-4" />

      <StackLayout class="bg-card rounded-lg" style="androidElevation: 2;">
        <StackLayout
          v-for="(product, index) in products"
          :key="product.id"
        >
          <GridLayout
            columns="*, auto, auto"
            class="p-4"
            @tap="handleProductTap(product)"
          >
            <StackLayout col="0">
              <NSLabel :text="product.name" class="font-semibold text-base mb-1" />
              <NSLabel :text="product.category" class="text-sm text-muted-foreground" />
            </StackLayout>

            <NSLabel
              :text="`$${product.price}`"
              col="1"
              class="text-lg font-bold text-primary mr-4"
            />

            <NSBadge
              :text="product.inStock ? 'In Stock' : 'Out of Stock'"
              :variant="product.inStock ? 'success' : 'destructive'"
              col="2"
            />
          </GridLayout>

          <StackLayout v-if="index < products.length - 1" class="bg-border h-px mx-4" />
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </ScrollView>
</template>
```

---

## 📝 Template 2: FormPage

### Use Cases
- Login/register forms
- Profile editing
- Data submission
- Survey/questionnaire
- Contact forms

### Key Features
- Various input types
- Form validation
- Submit/reset buttons
- Loading states
- Error handling

### Quick Start

```bash
cp src/components/pages/templates/FormPage.vue \
   src/components/pages/ContactForm.vue
```

### Customization

#### 1. Define Form Fields

```typescript
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  agreeToTerms: false,
});

const errors = ref({
  name: '',
  email: '',
  phone: '',
});
```

#### 2. Add Validation

```typescript
function validateForm(): boolean {
  errors.value = { name: '', email: '', phone: '' };

  if (!formData.value.name) {
    errors.value.name = 'Name is required';
    return false;
  }

  if (!formData.value.email) {
    errors.value.email = 'Email is required';
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Invalid email format';
    return false;
  }

  return true;
}
```

#### 3. Handle Submit

```typescript
async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Call API
    await submitContactForm(formData.value);

    await showAlert({
      title: 'Success',
      message: 'Your message has been sent!',
    });

    resetForm();
  } catch (error) {
    await showAlert({
      title: 'Error',
      message: 'Failed to send message. Please try again.',
    });
  } finally {
    isSubmitting.value = false;
  }
}
```

### Input Types

```vue
<!-- Text input -->
<NSInput
  v-model="name"
  placeholder="Name"
  keyboardType="text"
  returnKeyType="next"
/>

<!-- Email input -->
<NSInput
  v-model="email"
  placeholder="Email"
  keyboardType="email"
  autocapitalizationType="none"
  returnKeyType="next"
/>

<!-- Phone input -->
<NSInput
  v-model="phone"
  placeholder="Phone"
  keyboardType="phone"
  returnKeyType="done"
/>

<!-- Multiline text -->
<TextView
  v-model="message"
  hint="Message"
  class="bg-input p-3 rounded-lg min-h-24"
/>

<!-- Switch -->
<GridLayout columns="auto, *">
  <Switch col="0" v-model="agreeToTerms" class="mr-3" />
  <NSLabel col="1" text="I agree to terms" />
</GridLayout>
```

---

## 📄 Template 3: DetailPage

### Use Cases
- Product details
- Article view
- User profile
- Order details
- Event information

### Key Features
- Header with title and badge
- Statistics display
- Metadata grid
- Tags/categories
- Action buttons
- Back navigation

### Quick Start

```bash
cp src/components/pages/templates/DetailPage.vue \
   src/components/pages/ProductDetail.vue
```

### Customization

#### 1. Receive Props

```typescript
interface Props {
  productId: number;
}

const props = defineProps<Props>();
```

#### 2. Fetch Data

```typescript
import { ref, onMounted } from 'nativescript-vue';

const product = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    product.value = await fetchProduct(props.productId);
  } catch (error) {
    console.error('Failed to load product:', error);
  } finally {
    isLoading.value = false;
  }
});
```

#### 3. Display Data

```vue
<template>
  <ScrollView class="bg-background">
    <StackLayout v-if="!isLoading && product" class="p-4">
      <!-- Header -->
      <StackLayout class="bg-card p-6 rounded-lg mb-4">
        <GridLayout columns="*, auto" class="mb-4">
          <NSLabel :text="product.name" col="0" class="text-2xl font-bold" />
          <NSBadge :text="product.status" col="1" variant="success" />
        </GridLayout>

        <!-- Price & Stats -->
        <GridLayout columns="*, *, *" class="mb-4">
          <StackLayout col="0" class="items-center">
            <NSLabel :text="`$${product.price}`" class="text-2xl font-bold text-primary" />
            <NSLabel text="Price" class="text-xs text-muted-foreground" />
          </StackLayout>
          <StackLayout col="1" class="items-center">
            <NSLabel :text="product.rating.toString()" class="text-2xl font-bold" />
            <NSLabel text="Rating" class="text-xs text-muted-foreground" />
          </StackLayout>
          <StackLayout col="2" class="items-center">
            <NSLabel :text="product.reviews.toString()" class="text-2xl font-bold" />
            <NSLabel text="Reviews" class="text-xs text-muted-foreground" />
          </StackLayout>
        </GridLayout>

        <!-- Description -->
        <NSLabel :text="product.description" textWrap="true" class="mb-4" />

        <!-- Action Buttons -->
        <NSButton
          variant="primary"
          text="Add to Cart"
          @tap="handleAddToCart"
        />
      </StackLayout>
    </StackLayout>

    <!-- Loading State -->
    <StackLayout v-else-if="isLoading" class="items-center justify-center p-12">
      <ActivityIndicator busy="true" class="mb-4" />
      <NSLabel text="Loading..." class="text-muted-foreground" />
    </StackLayout>
  </ScrollView>
</template>
```

---

## 🎨 Template 4: EmptyPage

### Use Cases
- Quick prototyping
- New feature page
- Simple information page
- Landing page

### Key Features
- Minimal structure
- Basic interaction example
- Comments and tips
- Easy to understand

### Quick Start

```bash
cp src/components/pages/templates/EmptyPage.vue \
   src/components/pages/WelcomePage.vue
```

### Customization

Just modify the content:

```vue
<script setup>
import { ref } from 'nativescript-vue';
import NSLabel from '../../ui/NSLabel.vue';
import NSButton from '../../ui/NSButton.vue';

const userName = ref('Guest');

function handleGetStarted() {
  console.log('Get started clicked');
  // Navigate or perform action
}
</script>

<template>
  <ScrollView class="bg-background">
    <StackLayout class="p-6 items-center justify-center min-h-screen">
      <Label text="👋" class="text-6xl mb-6" />

      <NSLabel
        :text="`Welcome, ${userName}!`"
        class="text-2xl font-bold mb-4"
      />

      <NSLabel
        text="Let's get you started with our app."
        class="text-base text-muted-foreground text-center mb-8"
        textWrap="true"
      />

      <NSButton
        variant="primary"
        text="Get Started"
        @tap="handleGetStarted"
        class="w-48"
      />
    </StackLayout>
  </ScrollView>
</template>
```

---

## 🎓 Common Patterns

### Pattern 1: Loading State

```vue
<script setup>
const isLoading = ref(false);
const data = ref(null);

onMounted(async () => {
  isLoading.value = true;
  try {
    data.value = await fetchData();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <ScrollView>
    <!-- Loading -->
    <StackLayout v-if="isLoading" class="items-center p-12">
      <ActivityIndicator busy="true" class="mb-4" />
      <NSLabel text="Loading..." />
    </StackLayout>

    <!-- Content -->
    <StackLayout v-else-if="data" class="p-4">
      <!-- Your content -->
    </StackLayout>

    <!-- Error/Empty -->
    <StackLayout v-else class="items-center p-12">
      <Label text="📭" class="text-6xl mb-4" />
      <NSLabel text="No data available" />
    </StackLayout>
  </ScrollView>
</template>
```

### Pattern 2: Pull-to-Refresh

```vue
<script setup>
const isRefreshing = ref(false);

async function onRefresh() {
  isRefreshing.value = true;
  try {
    await reloadData();
  } finally {
    isRefreshing.value = false;
  }
}
</script>

<template>
  <ScrollView @pullRefresh="onRefresh">
    <!-- Content -->
  </ScrollView>
</template>
```

### Pattern 3: Search/Filter

```vue
<script setup>
const searchQuery = ref('');
const allItems = ref([...]);

const filteredItems = computed(() => {
  if (!searchQuery.value) return allItems.value;

  return allItems.value.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <StackLayout>
    <NSInput
      v-model="searchQuery"
      placeholder="Search..."
      class="m-4"
    />

    <StackLayout
      v-for="item in filteredItems"
      :key="item.id"
    >
      <!-- Item content -->
    </StackLayout>
  </StackLayout>
</template>
```

---

## 💡 Tips & Best Practices

### 1. Start with a Template
Always copy a template instead of starting from scratch:
```bash
cp src/components/pages/templates/ListPage.vue src/components/pages/MyPage.vue
```

### 2. Keep Templates Generic
Don't modify the original templates. Copy and customize.

### 3. Use TypeScript
Define interfaces for your data:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}
```

### 4. Handle Loading States
Always show feedback during async operations:
```vue
<NSButton
  :text="isLoading ? 'Loading...' : 'Submit'"
  :isEnabled="!isLoading"
/>
```

### 5. Validate Forms
Don't trust user input:
```typescript
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 6. Use Composables
Extract reusable logic:
```typescript
// composables/useProducts.ts
export function useProducts() {
  async function fetchProducts() { /* ... */ }
  async function searchProducts(query: string) { /* ... */ }
  return { fetchProducts, searchProducts };
}
```

---

## 🚀 Next Steps

1. **Copy a template** that matches your use case
2. **Customize the data interface** for your needs
3. **Update the UI** to match your design
4. **Add validation** and error handling
5. **Connect to your API** or data source
6. **Test on both iOS and Android**

---

For more information:
- [USAGE.md](./USAGE.md) - Complete usage guide
- [README.md](../README.md) - Project overview
- [NativeScript Docs](https://docs.nativescript.org/)
