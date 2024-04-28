<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTicketsStore } from '@/stores/tickets'
import { filters } from '@/constants/filtersData'
import FilterTickets from '@/components/FilterTickets.vue'
import CardComponent from '@/components/CardComponent.vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'

const userStore = useTicketsStore()
const countList = 5
const shortFilteredList = 15
const checkboxIdAll = ref(5)
let stateFilter = ref(0)
let limitCard = ref(5)
let fetchStatus = ref(true)

onMounted(async () => {
  await userStore.getIdSearch()
  await userStore.getListTickets()
  fetchStatus.value = false
})

const filteredTicker = computed(() => {
  return filterByTopNav.value.slice(0, limitCard.value)
})

const filteredSameStops = computed(() => {
  if (isAciveAllFilter.value) {
    return userStore.ticketsList
  } else {
    return userStore.ticketsList.filter((el) => el.originStops === el.departureStops)
  }
})

const filteredByStops = computed(() => {
  if (isAciveAllFilter.value) {
    return userStore.ticketsList
  }
  return filteredSameStops.value.filter((el) => userStore.userFilter.includes(el.originStops))
})

const isAciveAllFilter = computed(() => {
  return (
    userStore.userFilter &&
    userStore.userFilter.length &&
    userStore.userFilter.length === 1 &&
    userStore.userFilter[0] === checkboxIdAll.value
  )
})

const filterByPrice = computed(() => {
  return [...filteredByStops.value].sort((a, b) => a.price - b.price)
})

const filterByDuration = computed(() => {
  return [...filteredByStops.value].sort((a, b) => a.durationFly - b.durationFly)
})

const filterByOptim = computed(() => {
  return [...filteredByStops.value].sort((a, b) => a.ratio - b.ratio)
})

const filterByTopNav = computed(() => {
  if (stateFilter.value === 1) {
    return filterByPrice.value.slice(0, shortFilteredList)
  } else if (stateFilter.value === 2) {
    return filterByDuration.value.slice(0, shortFilteredList)
  } else if (stateFilter.value === 3) {
    return filterByOptim.value.slice(0, shortFilteredList)
  } else {
    return filteredByStops.value
  }
})

const hiddenBtn = computed(() => {
  return (
    filteredTicker.value && filteredTicker.value.length && filterByTopNav.value.length > countList
  )
})

const disabledBtn = computed(() => {
  return (
    limitCard.value >=
    (stateFilter.value ? filterByTopNav.value.length - 1 : userStore.ticketsList.length)
  )
})

function handlebtnFilter(id) {
  limitCard.value = countList
  if (stateFilter.value === id) {
    stateFilter.value = 0
    return
  }
  stateFilter.value = id
}

function showMoreCard() {
  limitCard.value += countList
}
</script>

<template>
  <section class="main-section" aria-label="Основний контент">
    <h1 class="visually-hidden">Авіа білети</h1>
    <div class="container flex-container">
      <FilterTickets />
      <div class="main-list-container">
        <ul class="list-btn-filter">
          <li v-for="item in filters" :key="item.id" class="list-btn-item">
            <button
              @click="handlebtnFilter(item.id)"
              class="btn-filter"
              :class="[
                { 'active-btn-filter': stateFilter === item.id },
                { 'left-border': !stateFilter || (stateFilter === 1 && item.id === 3) },
                { 'right-border': stateFilter === 3 && item.id === 1 }
              ]"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
        <ul class="main-list-card" v-if="filteredTicker && filteredTicker.length">
          <li class="main-card-item" v-for="card in filteredTicker" :key="card.keyId">
            <CardComponent
              :ticketPrice="card.price"
              :companyName="card.carrier"
              :timeDeparture="card.segments?.[0]?.date || ''"
              :departureDuration="card.segments?.[0]?.duration || 0"
              :timeArrives="card.segments?.[1]?.date || ''"
              :arrivasDuration="card.segments?.[1]?.duration || 0"
              :originTitleDepart="card.segments?.[0]?.origin || ''"
              :destinTitleDepart="card.segments?.[0]?.destination || ''"
              :originTitleArrivas="card.segments?.[1]?.origin || ''"
              :destinTitleArrivas="card.segments?.[1]?.destination || ''"
              :originStops="card.segments?.[0]?.stops || []"
              :departureStops="card.segments?.[1]?.stops || []"
            />
          </li>
        </ul>
        <div class="preload-wrapper" v-else>
          <ul class="main-list-card" v-if="userStore.finishDispatch">
            <li class="main-card-item relative-main-card" v-for="item in countList" :key="item">
              <div class="disabled-main-card">
                <CardComponent :ticketPrice="10000" />
              </div>
              <div class="preload-component"><PreloaderComponent /></div>
            </li>
          </ul>
          <div v-else class="no-ticket-data">Квитків не знайдено :(</div>
        </div>
        <div v-if="hiddenBtn">
          <button @click="showMoreCard" class="show-more-btn" :disabled="disabledBtn">
            <template v-if="!disabledBtn">Завантажити ще 5 квитків</template>
            <template v-else>Всі квитки завантажено</template>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mediaWidth.scss';

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.main-section {
  padding-bottom: 50px;
}

.container {
  max-width: 786px;
  padding: 0 16px;
  margin: 0 auto;
}

.flex-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;

  @media screen and (max-width: $max-mobile-width) {
    flex-direction: column;
  }
}

.main-list-container {
  width: 100%;
}

.btn-filter {
  padding: 14px;
  color: var(--bi-color-text);
  text-align: center;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all var(--transition-style);
  border-top: 1px solid var(--bi-color-border-2);
  border-bottom: 1px solid var(--bi-color-border-2);
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  width: 100%;
  user-select: none;
  background-color: var(--bi-color-background);
  transition: all var(--transition-style);

  &:hover:not(.active-btn-filter),
  &:focus:not(.active-btn-filter),
  &:active:not(.active-btn-filter) {
    background-color: var(--bi-color-neutral-2);
  }

  @media screen and (max-width: $max-mobile-width) {
    padding: 8px 4px;
    font-size: 10px;
  }
}

.list-btn-filter {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  position: sticky;
  top: 0px;

  @media screen and (max-width: $max-mobile-width) {
    top: 103px;
  }
}

.list-btn-item {
  width: calc(100% / 3);

  &:first-child {
    .btn-filter {
      border-left: 1px solid var(--bi-color-border-2);
      border-radius: 6px 0 0px 6px;
    }

    .active-btn-filter {
      border-left: 1px solid var(--bi-color-brand);
    }
  }

  &:last-child {
    .btn-filter {
      border-right: 1px solid var(--bi-color-border-2);
      border-radius: 0 6px 6px 0;
    }

    .active-btn-filter {
      border-right: 1px solid var(--bi-color-brand);
    }
  }
}

.active-btn-filter {
  color: var(--bi-color-active-text);
  background-color: var(--bi-color-brand);
  border-top: 1px solid var(--bi-color-brand);
  border-bottom: 1px solid var(--bi-color-brand);
}

.left-border {
  border-left: 1px solid var(--bi-color-border-2);
}

.right-border {
  border-right: 1px solid var(--bi-color-border-2);
}

.main-list-card {
  margin-bottom: 20px;
}

.show-more-btn {
  background-color: var(--bi-color-brand);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bi-color-active-text);
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 15px 20px;
  border-radius: 6px;
  user-select: none;
  transition: all var(--transition-style);

  @media screen and (min-width: $min-desktop-width) {
    &:hover,
    &:focus,
    &:active {
      background-color: var(--bi-color-dark-brand);
    }
  }

  &:disabled {
    background-color: var(--bi-color-neutral-1);
    pointer-events: none;
  }
}
.main-card-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.disabled-main-card {
  filter: blur(7px);
}

.relative-main-card {
  position: relative;
}

.preload-component {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.no-ticket-data {
  padding: 20px;
  background-color: var(--bi-color-background);
  filter: drop-shadow(var(--box-shadow-style));
  box-shadow: var(--box-shadow-style);
  border-radius: 4px;
}
</style>
