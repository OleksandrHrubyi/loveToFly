<script setup>
import { useTickerStore } from '@/stores/tickets'
const userStore = useTickerStore()
</script>

<template>
  <RouterLink to="/" class="logo-link"
    ><img
      src="@/assets/img/logo.svg"
      alt="logo-icon"
      width="60"
      height="60"
      class="logo-icon"
      :class="{ 'logo-preload': userStore.dispatchStatus }"
  /></RouterLink>
</template>

<style scoped lang="scss">
.logo-link {
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0px 5px 8px #c5c6cc;
}

.logo-icon {
  display: block;
  margin: 0 auto;
}

.logo-preload {
  animation-name: listMainAnimMain;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes listMainAnimMain {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
