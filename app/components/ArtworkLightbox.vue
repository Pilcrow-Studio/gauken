<script setup lang="ts">
import type { Content } from "@prismicio/client";

interface Props {
  artPieces: Content.ArtPieceDocument[] | null;
  currentIndex: number;
  isOpen: boolean;
  updateUrl?: boolean; // Optional prop to control URL updates
}

interface Emits {
  (e: "close"): void;
  (e: "navigate", index: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  updateUrl: true,
});

const emit = defineEmits<Emits>();

const route = useRoute();
const router = useRouter();
const { formatCurrency } = useCurrency();

// Current artwork computed property
const currentArtwork = computed(() => {
  return props.artPieces?.[props.currentIndex];
});

// Navigation functions
const nextArtwork = () => {
  if (props.artPieces && props.currentIndex < props.artPieces.length - 1) {
    const newIndex = props.currentIndex + 1;
    emit("navigate", newIndex);

    if (props.updateUrl) {
      const artwork = props.artPieces[newIndex];
      if (artwork) {
        router.push({ query: { ...route.query, artwork: artwork.uid } });
      }
    }
  }
};

const prevArtwork = () => {
  if (props.currentIndex > 0) {
    const newIndex = props.currentIndex - 1;
    emit("navigate", newIndex);

    if (props.updateUrl) {
      const artwork = props.artPieces?.[newIndex];
      if (artwork) {
        router.push({ query: { ...route.query, artwork: artwork.uid } });
      }
    }
  }
};

const closeLightbox = () => {
  emit("close");

  if (props.updateUrl) {
    // Remove artwork parameter from URL
    const query = { ...route.query };
    delete query.artwork;
    router.push({ query });
  }
};

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;

  switch (e.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      prevArtwork();
      break;
    case "ArrowRight":
      nextArtwork();
      break;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <!-- Lightbox Modal -->
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen && currentArtwork"
        class="fixed inset-0 z-[999999] bg-black flex items-center justify-center"
        @click="closeLightbox"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-60 bg-white bg-opacity-35 filter backdrop-blur-sm rounded-sm p-2 text-white hover:text-gray-300 transition-colors"
          @click="closeLightbox"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Navigation arrows -->
        <button
          v-if="currentIndex > 0"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-60 bg-white bg-opacity-35 filter backdrop-blur-sm rounded-sm p-2 text-white hover:text-gray-300 transition-colors"
          @click.stop="prevArtwork"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          v-if="artPieces && currentIndex < artPieces.length - 1"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-60 bg-white bg-opacity-35 filter backdrop-blur-sm rounded-sm p-2 text-white hover:text-gray-300 transition-colors"
          @click.stop="nextArtwork"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Main content -->
        <div
          class="flex flex-col lg:flex-row max-w-7xl w-full h-full max-h-screen p-4 gap-2"
          @click.stop
        >
          <!-- Image container -->
          <div
            class="flex-1 flex items-center justify-center p-4 max-h-[65vh] lg:max-h-full"
          >
            <NuxtImg
              :src="currentArtwork.data.artwork.url || ''"
              :alt="currentArtwork.data.title || ''"
              loading="eager"
              format="avif"
              quality="80"
              fit="contain"
              class="max-h-full max-w-full object-contain"
            />
          </div>

          <!-- Artwork info -->
          <div
            class="lg:w-80 flex flex-col justify-center text-white p-6 pt-0 pb-16"
          >
            <!-- Counter -->
            <div class="mb-6 text-xs text-gray-500">
              {{ currentIndex + 1 }} / {{ artPieces?.length || 0 }}
            </div>
            <h1 class="text-2xl lg:text-3xl font-light mb-0">
              {{ currentArtwork.data.title }}
            </h1>

            <div v-if="currentArtwork.data.description" class="mb-4">
              <PrismicRichText
                :field="currentArtwork.data.description"
                wrapper="div"
                class="text-gray-300"
              />
            </div>

            <div class="space-y-2 text-sm text-gray-400">
              <p v-if="currentArtwork.data.medium_custom">
                {{ currentArtwork.data.medium_custom }}
              </p>
              <p v-if="currentArtwork.data.size">
                {{ currentArtwork.data.size }}
              </p>
              <p
                v-if="currentArtwork.data.price"
                class="text-white font-medium"
              >
                {{ formatCurrency(currentArtwork.data.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: all 0.3s;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
