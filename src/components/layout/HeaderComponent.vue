<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
</script>

<template>
  <header class="header"><LogoComponent /></header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mediaWidth.scss';

.header {
  padding: 50px 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: $max-mobile-width) {
    padding: 20px 16px;
  }
}
</style>
