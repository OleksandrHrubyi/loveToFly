<script setup>
import { ref } from 'vue'
import CheckBoxCustom from '@/components/CheckBoxCustom.vue'
import { filtersData } from '@/constants/filtersData'

let checkBoxValue = ref(false)
let userFilter = ref([])

function handleValueCheckBox(id) {
  checkBoxValue.value = !checkBoxValue.value

  if (userFilter.value.includes(id)) {
    userFilter.value = userFilter.value.filter((el) => el !== id)
    return
  }

  userFilter.value.push(id)
}
</script>

<template>
  <div class="filter-container">
    <h2 class="filter-title">Kількість пересадок</h2>
    <ul class="filter-list">
      <li
        class="filter-item"
        @click="handleValueCheckBox(item.id)"
        v-for="item in filtersData"
        :key="item.id"
      >
        <div class="filter-wrap">
          <div class="check-wrap">
            <CheckBoxCustom
              :data-id="`filter-check-box-${item.id}`"
              :checkboxState="userFilter.includes(item.id)"
              :idFilter="item.id"
            />
          </div>
          <div class="filter-name">{{ item.name }}</div>
          <div class="filter-short-name">{{ item.short_name }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mediaWidth.scss';

.filter-container {
  padding: 20px 0 10px;
  border-radius: 5px;
  background: var(--bi-color-background);
  box-shadow: var(--box-shadow-style);
  min-width: 232px;

  @media screen and (max-width: $max-mobile-width) {
    width: 100%;
  }
}

.filter-list {
  @media screen and (max-width: $max-mobile-width) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px;
  }
}

.filter-title {
  padding: 0 20px;
  color: var(--bi-color-text);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.filter-wrap {
  display: flex;
  align-items: center;
}

.check-wrap {
  margin-right: 10px;
  pointer-events: none;
}

.filter-item {
  transition: all var(--transition-style);
  padding: 10px 20px;

  @media screen and (max-width: $max-mobile-width) {
    padding: 8px;
  }

  @media screen and (min-width: $min-desktop-width) {
    &:hover {
      cursor: pointer;
      background-color: var(--bi-color-neutral-2);
    }
  }
}

.filter-name {
  color: var(--bi-color-text);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.53;
  user-select: none;

  @media screen and (max-width: $max-mobile-width) {
    display: none;
  }
}

.filter-short-name {
  color: var(--bi-color-text);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.53;
  user-select: none;

  @media screen and (min-width: $min-tablet-width) {
    display: none;
  }
}
</style>
