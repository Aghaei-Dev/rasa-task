<template>
  <section class="relative w-full max-w-4xl mx-auto">
    <div class="relative w-full">
      <img
        src="~/assets/imgs/laptop.svg"
        class="w-full"
      />

      <div class="absolute left-1/2 top-[25%] w-[68%] h-[48%] -translate-x-1/2 overflow-hidden">
        <div
          class="flex h-full transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(${currentIndex * 100}%)` }"
        >
          <div
            v-for="slide in slides"
            :key="slide.id"
            class="min-w-full flex-shrink-0 flex items-center justify-center"
          >
            <img
              :src="slide.src"
              :alt="slide.alt"
              class="h-[160px] sm:h-[250px] md:h-[300px] max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>

    <CircleButton
      :icon="ChevronLeft"
      size="md"
      @click="handleNext"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 shadow"
    />
    <CircleButton
      :icon="ChevronRight"
      size="md"
      @click="handlePrev"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 shadow"
    />
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        class="w-4 h-4 rounded-full cursor-pointer hover:bg-blue-200 transition"
        :class="i === currentIndex ? 'bg-blue-300 hover:bg-blue-300' : 'bg-blue-50'"
        @click="() => goToSlide(i)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CircleButton from './UI/CircleButton.vue'
import ChevronLeft from '~/assets/icons/ChevronLeft.vue'
import ChevronRight from '~/assets/icons/ChevronRight.vue'

const slides = useSliderImages()
const currentIndex = ref(0)
let interval = null

const startAutoSlide = () => {
  clearInterval(interval)
  interval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const handleNext = () => {
  nextSlide()
  startAutoSlide()
}

const handlePrev = () => {
  prevSlide()
  startAutoSlide()
}

const goToSlide = (i) => {
  currentIndex.value = i
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
<style></style>
