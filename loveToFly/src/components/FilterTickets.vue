<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTicketsStore } from '@/stores/tickets'
import CheckBoxCustom from '@/components/CheckBoxCustom.vue'
import { filtersData } from '@/constants/filtersData'

const store = useTicketsStore()
const { userFilter } = storeToRefs(store)

const idAllcheckbox = 5
let checkBoxValue = ref(false)

function handleValueCheckBox(id) {
  checkBoxValue.value = !checkBoxValue.value
  const isInFilter = userFilter.value.includes(id)
  if (id !== idAllcheckbox) {
    if (isInFilter) {
      userFilter.value = userFilter.value.filter((el) => el !== id)
    } else {
      userFilter.value.push(id)
      userFilter.value = userFilter.value.filter((el) => el !== idAllcheckbox)
    }
  } else {
    userFilter.value = [idAllcheckbox]
  }

  if (!userFilter.value.length) {
    userFilter.value.push(idAllcheckbox)
  }
}
</script>

<template>
  <div class="filter-container">
    <h2 class="filter-title">Kількість пересадок</h2>
    <ul class="filter-list">
      <li
        class="filter-item"
        v-for="item in filtersData"
        @click="handleValueCheckBox(item.id)"
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
  cursor: pointer;

  @media screen and (max-width: $max-mobile-width) {
    padding: 8px;
  }

  @media screen and (min-width: $min-desktop-width) {
    &:hover {
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
