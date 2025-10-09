<script setup lang="ts">
const { data: global_navigation } = await useGlobalNavigation();

// Mobile menu state
const isMenuOpen = ref(false);

// Toggle menu with event handling
const toggleMenu = (event: MouseEvent) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;

  if (isMenuOpen.value) {
    // Wait for this click to finish, then add the global listener
    setTimeout(() => {
      window.addEventListener("click", closeMenu);
    }, 0);
  } else {
    window.removeEventListener("click", closeMenu);
  }
};

// Close menu function
const closeMenu = () => {
  isMenuOpen.value = false;
  window.removeEventListener("click", closeMenu);
};

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener("click", closeMenu);
});

// Close menu on route change
const router = useRouter();
router.afterEach(() => {
  closeMenu();
});
</script>

<template>
  <nav v-if="global_navigation?.data?.links" class="relative">
    <!-- Mobile Menu Button (visible on small screens) -->
    <button
      class="lg:hidden flex justify-end items-center px-4 pt-4 pb-4 bg-white dark:bg-black leading-none uppercase text-xs"
      :class="{ 'pb-2': isMenuOpen }"
      @click="toggleMenu"
    >
      Menu
      <svg
        class="ml-2 w-3 h-3 transition-transform duration-200"
        :class="{ 'rotate-180': isMenuOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Mobile Dropdown Menu -->
    <div
      v-if="isMenuOpen"
      class="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-gray-200 dark:border-gray-700 pb-2 z-50"
    >
      <template
        v-for="(item, index) in global_navigation.data.links"
        :key="index"
      >
        <PrismicLink
          :field="item.link"
          class="block leading-none text-sm py-2 px-4 hover:opacity-70 transition-opacity text-right"
          @click="closeMenu"
        />
      </template>
    </div>

    <!-- Desktop Menu (visible on large screens) -->
    <div
      class="hidden lg:flex flex-wrap justify-start gap-4 px-4 md:pt-[0.6rem] md:pb-2 pt-4 pb-4 bg-white dark:bg-black h-fit w-fit"
    >
      <template
        v-for="(item, index) in global_navigation.data.links"
        :key="index"
      >
        <PrismicLink :field="item.link" class="leading-none text-sm" />
      </template>
    </div>
  </nav>
</template>
