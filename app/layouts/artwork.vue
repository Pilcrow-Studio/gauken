<template>
  <div class="bg-black text-white">
    <div class="max-w-[1920px] mx-auto relative">
      <NuxtLink
        to="/work"
        class="text-white z-[9999] absolute top-0 right-0 p-4"
        >Close</NuxtLink
      >
      <Main class="min-h-screen flex flex-col">
        <NuxtPage />
      </Main>
    </div>
  </div>
</template>
