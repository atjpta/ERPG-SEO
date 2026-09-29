<template>
  <div class="flex min-h-screen flex-col">
    <LandingAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LandingAppFooter />
  </div>
</template>
