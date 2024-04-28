<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['checkboxChange'])
const id = ref(null)

const props = defineProps({
  checkboxState: {
    type: Boolean,
    default: false
  },

  idFilter: {
    type: Number,
    default: 1
  }
})

onMounted(() => {
  id.value = `checkbox-${Date.now() + Math.random()}`
})

const checkboxValue = computed({
  get() {
    return props.checkboxState
  },
  set(newValue) {
    emit('checkboxChange', newValue, id)
  }
})
</script>

<template>
  <div class="checkbox-wrap">
    <input
      :id="id"
      type="checkbox"
      v-model="checkboxValue"
      class="checkbox-input"
      :data-id="$attrs['data-id']"
    />
    <label class="checkbox-container" :for="id">
      <img
        src="@/assets/img/check-icon.svg"
        alt="check icon"
        width="12"
        height="8"
        class="checkbox-img"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
.checkbox-input {
  display: none;

  &:checked {
    & ~ .checkbox-container {
      border: 1px solid var(--bi-color-brand);

      &::before,
      .checkbox-img {
        opacity: 1;
      }
    }
  }
}

.checkbox-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 3px;
  cursor: pointer;
  border: 1px solid var(--bi-color-border);
  border-radius: 2px;
  user-select: none;

  &,
  &::before,
  .checkbox-img {
    transition: var(--transition-style);
  }

  &::before {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: 1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    content: '';
    background-color: transparent;
    border-radius: 2px;
    opacity: 0;
  }
}

.checkbox-img {
  position: relative;
  opacity: 0;
}
</style>
