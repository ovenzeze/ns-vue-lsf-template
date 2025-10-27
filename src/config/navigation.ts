import { Component } from 'vue';

/**
 * Bottom navigation tab configuration interface
 */
export interface NavigationTabConfig {
    /** Unique ID for the tab */
    id: string;
    /** Tab display title */
    title: string;
    /** Icon (FontAwesome Unicode) */
    icon: string;
    /** Icon style ('solid' or 'regular') */
    iconType?: 'solid' | 'regular';
    /** Corresponding page component */
    component: Component;
    /** Active color (optional, defaults to theme primary) */
    activeColor?: string;
    /** Inactive color (optional, defaults to muted-foreground) */
    inactiveColor?: string;
    /** Badge number (optional) */
    badge?: number;
    /** Show dot badge (optional) */
    showDot?: boolean;
    /** Custom class name (optional) */
    customClass?: string;
}

/**
 * Navigation Configuration
 * 
 * Instructions:
 * 1. Add a new tab: Add a new config object to the navigationTabs array.
 * 2. Change icon: Update the `icon` property (supports FontAwesome).
 * 3. Change icon style: Set `iconType` to 'solid' or 'regular'.
 * 4. Change colors: Set `activeColor` and `inactiveColor`.
 * 5. Add badge: Set `badge` number or `showDot` to true.
 * 
 * FontAwesome Icons:
 * - Solid (fas): "\uf015" (home)
 * - Regular (far): "\uf007" (user)
 * 
 * Find more icons: https://fontawesome.com/icons
 */

// Import page components
import DiscoverPage from '../components/pages/DiscoverPage.vue';
import HomePage from '../components/pages/HomePage.vue';
import ProfilePage from '../components/pages/ProfilePage.vue';

/**
 * Bottom navigation tab configuration array
 * Recommended: 3-5 tabs, each with a distinct function.
 */
export const navigationTabs: NavigationTabConfig[] = [
    {
        id: 'home',
        title: 'Home',
        icon: '\uf015', // fa-home (solid)
        iconType: 'solid',
        component: HomePage,
        activeColor: '#3b82f6',     // primary blue
        inactiveColor: '#9ca3af',   // gray-400
    },
    {
        id: 'discover',
        title: 'Discover',
        icon: '\uf14e', // fa-compass
        iconType: 'solid',
        component: DiscoverPage,
        activeColor: '#10b981',     // success green
        inactiveColor: '#9ca3af',   // gray-400
    },
    {
        id: 'profile',
        title: 'Profile',
        icon: '\uf007', // fa-user
        iconType: 'solid',
        component: ProfilePage,
        activeColor: '#8b5cf6',     // secondary purple
        inactiveColor: '#9ca3af',   // gray-400
        showDot: false,
    },
];

/**
 * Default selected tab index
 */
export const defaultTabIndex = 0;

/**
 * Bottom navigation bar height (in dp)
 */
export const navigationBarHeight = 60;

/**
 * Enable platform-specific styles
 * - iOS: Safe area adaptation
 * - Android: Material Design ripple effect
 */
export const enablePlatformStyles = true;

/**
 * Helper function: Get tab config by ID
 */
export function getTabById(id: string): NavigationTabConfig | undefined {
    return navigationTabs.find((tab) => tab.id === id);
}

/**
 * Helper function: Get tab config by index
 */
export function getTabByIndex(index: number): NavigationTabConfig | undefined {
    return navigationTabs[index];
}
