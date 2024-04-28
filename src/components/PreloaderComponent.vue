<template>
  <div class="preloader-wrap">
    <div class="lines">
      <span class="line line-1"></span>
      <span class="line line-2"></span>
      <span class="line line-3"></span>
      <span class="line line-4"></span>
      <span class="line line-5"></span>
      <span class="line line-6"></span>
      <span class="line line-7"></span>
      <span class="line line-8"></span>
      <span class="line line-9"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preloader-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 20vh;
}

.preloader-wrap .lines {
  display: flex;
  align-items: center;
}

.preloader-wrap .line {
  display: inline-block;
  width: 2px;
  height: 24px;
  margin: 0 3px;
  background: var(--bi-color-brand);
  animation: opacity-2 1000ms infinite ease-in-out;
}

.preloader-wrap .line-1 {
  animation-delay: 800ms;
}

.preloader-wrap .line-2 {
  animation-delay: 600ms;
}

.preloader-wrap .line-3 {
  animation-delay: 400ms;
}

.preloader-wrap .line-4 {
  animation-delay: 200ms;
}

.preloader-wrap .line-6 {
  animation-delay: 200ms;
}

.preloader-wrap .line-7 {
  animation-delay: 400ms;
}

.preloader-wrap .line-8 {
  animation-delay: 600ms;
}

.preloader-wrap .line-9 {
  animation-delay: 800ms;
}

@keyframes opacity-2 {
  0% {
    opacity: 1;
    transform: scaleY(1.1);
  }

  50% {
    opacity: 0;
    transform: scaleY(1);
  }

  100% {
    opacity: 1;
    transform: scaleY(1.1);
  }
}
</style>
