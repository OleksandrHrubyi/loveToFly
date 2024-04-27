<template>
  <RouterLink to="/" class="logo-link"
    ><img src="@/assets/img/logo.svg" alt="logo-icon" width="60" height="60" class="logo-icon"
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
</style>
