<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
</script>

<template>
  <div>
    <HeaderComponent />
    <main><RouterView /></main>
  </div>
</template>

<style scoped lang="scss"></style>
