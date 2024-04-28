<script setup>
import { ref } from 'vue'
import { onMounted, computed } from 'vue'
import { useTickerStore } from '@/stores/tickets'
import { filters } from '@/constants/filtersData'
import FilterTickets from '@/components/FilterTickets.vue'
import CardComponent from '@/components/CardComponent.vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'

const countList = 5
let stateFilter = ref(0)
let limitCard = ref(5)

const userStore = useTickerStore()

onMounted(async () => {
  await userStore.getIdSearch()
  await userStore.getListTickets()
})

const filteredTicker = computed(() => {
  if (stateFilter.value === 1) {
    const lowestPrice = userStore.ticketsList.reduce(
      (acc, currentValue) => (currentValue.price < acc ? currentValue.price : currentValue),
      userStore.ticketsList[0].price
    )
    console.log(lowestPrice, 'lowestPrice')
  }
  console.log(userStore.ticketsList.length, 'leng')
  return userStore.ticketsList.slice(0, limitCard.value)
})

const disabledBtn = computed(() => {
  return limitCard.value >= userStore.ticketsList.length
})

function handlebtnFilter(id) {
  console.log(id, 'id')
  if (stateFilter.value === id) {
    stateFilter.value = 0
    return
  }
  stateFilter.value = id
}

function showMoreCard() {
  limitCard.value += countList
  console.log(limitCard.value)
  console.log(disabledBtn.value, 'disabledBtn')
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
        <div v-else><PreloaderComponent /></div>
        <div v-if="filteredTicker && filteredTicker.length">
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
  padding: 15px;
  color: var(--bi-color-text);
  text-align: center;
  font-size: 12px;
  font-family: 'Open Sans';
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

  @media screen and (max-width: $max-mobile-width) {
    padding: 8px 4px;
    font-size: 10px;
  }
}

.list-btn-filter {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
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
</style>
